import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { Resend } from "resend";

// ---------------------------------------------------------------------------
// Rate limiter
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
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
// Validation
// ---------------------------------------------------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_AREAS = [
    "medical",
    "dental",
    "optical",
    "counselling",
    "logistics",
    "photography",
    "other",
];

interface VolunteerPayload {
    name: string;
    email: string;
    area: string;
    message: string;
}

function validate(
    body: unknown
): { ok: true; data: VolunteerPayload } | { ok: false; error: string } {
    if (!body || typeof body !== "object") {
        return { ok: false, error: "Invalid request body." };
    }
    const { name, email, area, message } = body as Record<string, unknown>;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
        return { ok: false, error: "Name is required." };
    }
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
        return { ok: false, error: "A valid email address is required." };
    }
    if (!area || typeof area !== "string" || !VALID_AREAS.includes(area)) {
        return { ok: false, error: "Please select an area of interest." };
    }

    return {
        ok: true,
        data: {
            name: name.trim(),
            email: email.trim(),
            area,
            message: typeof message === "string" ? message.trim() : "",
        },
    };
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
        return NextResponse.json(
            { success: false, error: "Too many requests. Please try again later." },
            { status: 429 }
        );
    }

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

    const { name, email, area, message } = result.data;

    try {
        // Save to Payload CMS
        const payload = await getPayload({ config });
        await payload.create({
            collection: "volunteers",
            data: { name, email, area: area as "medical" | "dental" | "optical" | "counselling" | "logistics" | "photography" | "other", message },
        });

        // Send notification email
        const resendKey = process.env.RESEND_API_KEY;
        const contactEmail = process.env.CONTACT_EMAIL ?? "dannankra@gmail.com";

        if (resendKey) {
            const resend = new Resend(resendKey);
            const areaLabel =
                {
                    medical: "Medical (Doctor / Nurse)",
                    dental: "Dental",
                    optical: "Optical / Eye Care",
                    counselling: "Counselling",
                    logistics: "Logistics & Administration",
                    photography: "Photography / Media",
                    other: "Other",
                }[area] || area;

            await resend.emails.send({
                from: "CMRF Volunteers <onboarding@resend.dev>",
                to: contactEmail,
                replyTo: email,
                subject: `[CMRF Volunteer] ${name} — ${areaLabel}`,
                html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FAF9F6; border-radius: 16px;">
            <h2 style="margin: 0 0 24px; font-size: 22px; color: #1A1A1A;">
              New volunteer interest from <span style="color: #CC5833;">${name}</span>
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 12px; font-size: 13px; color: #8A8A7A; vertical-align: top; width: 100px;">Name</td>
                <td style="padding: 8px 12px; font-size: 14px; color: #1A1A1A;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; font-size: 13px; color: #8A8A7A; vertical-align: top;">Email</td>
                <td style="padding: 8px 12px; font-size: 14px; color: #1A1A1A;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; font-size: 13px; color: #8A8A7A; vertical-align: top;">Area</td>
                <td style="padding: 8px 12px; font-size: 14px; color: #1A1A1A;">${areaLabel}</td>
              </tr>
            </table>
            ${message
                        ? `<div style="background: #FFFFFF; border: 1px solid #E8E4DD; border-radius: 12px; padding: 20px;">
                <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #1A1A1A; white-space: pre-wrap;">${message}</p>
              </div>`
                        : ""
                    }
            <p style="margin: 24px 0 0; font-size: 12px; color: #8A8A7A;">
              Sent from the CMRF website volunteer form · <a href="https://www.cmrfgh.com/get-involved" style="color: #CC5833;">cmrfgh.com</a>
            </p>
          </div>
        `,
            });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[volunteer] Failed:", err);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to submit. Please try again later.",
            },
            { status: 500 }
        );
    }
}
