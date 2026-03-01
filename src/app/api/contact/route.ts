import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ---------------------------------------------------------------------------
// In-memory rate limiter (per-IP, resets on cold start — good enough for a
// contact form; swap for Redis/Upstash if you need persistence).
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max submissions per window
const ipLog = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = ipLog.get(ip);

    if (!entry || now > entry.resetAt) {
        ipLog.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (entry.count >= RATE_LIMIT_MAX) return true;

    entry.count++;
    return false;
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 5_000;

interface ContactPayload {
    name: string;
    email: string;
    subject: string;
    message: string;
}

function validate(
    body: unknown
): { ok: true; data: ContactPayload } | { ok: false; error: string } {
    if (!body || typeof body !== "object") {
        return { ok: false, error: "Invalid request body." };
    }

    const { name, email, subject, message } = body as Record<string, unknown>;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
        return { ok: false, error: "Name is required." };
    }
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
        return { ok: false, error: "A valid email address is required." };
    }
    if (!subject || typeof subject !== "string" || subject.trim().length === 0) {
        return { ok: false, error: "Subject is required." };
    }
    if (!message || typeof message !== "string" || message.trim().length === 0) {
        return { ok: false, error: "Message is required." };
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
        return {
            ok: false,
            error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`,
        };
    }

    return {
        ok: true,
        data: {
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim(),
        },
    };
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
    // --- Rate limit ---------------------------------------------------------
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
        return NextResponse.json(
            { success: false, error: "Too many requests. Please try again later." },
            { status: 429 }
        );
    }

    // --- Validate -----------------------------------------------------------
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { success: false, error: "Invalid JSON." },
            { status: 400 }
        );
    }

    const result = validate(body);
    if (!result.ok) {
        return NextResponse.json(
            { success: false, error: result.error },
            { status: 400 }
        );
    }

    const { name, email, subject, message } = result.data;

    // --- Send email ---------------------------------------------------------
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error("[contact] RESEND_API_KEY is not set.");
        return NextResponse.json(
            { success: false, error: "Email service is not configured." },
            { status: 500 }
        );
    }

    const contactEmail =
        process.env.CONTACT_EMAIL ?? "dannankra@gmail.com";

    const resend = new Resend(apiKey);

    try {
        await resend.emails.send({
            from: "CMRF Contact <onboarding@resend.dev>",
            to: contactEmail,
            replyTo: email,
            subject: `[CMRF Contact] ${subject}`,
            html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FAF9F6; border-radius: 16px;">
          <h2 style="margin: 0 0 24px; font-size: 22px; color: #1A1A1A;">
            New message from <span style="color: #CC5833;">${name}</span>
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 12px; font-size: 13px; color: #8A8A7A; vertical-align: top; width: 90px;">From</td>
              <td style="padding: 8px 12px; font-size: 14px; color: #1A1A1A;">${name} &lt;${email}&gt;</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-size: 13px; color: #8A8A7A; vertical-align: top;">Subject</td>
              <td style="padding: 8px 12px; font-size: 14px; color: #1A1A1A;">${subject}</td>
            </tr>
          </table>
          <div style="background: #FFFFFF; border: 1px solid #E8E4DD; border-radius: 12px; padding: 20px;">
            <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #1A1A1A; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin: 24px 0 0; font-size: 12px; color: #8A8A7A;">
            Sent from the CMRF website contact form · <a href="https://www.cmrfgh.com/contact" style="color: #CC5833;">cmrfgh.com</a>
          </p>
        </div>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[contact] Failed to send email:", err);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to send your message. Please try again later.",
            },
            { status: 500 }
        );
    }
}
