import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

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
const VALID_SOURCES = ["newsletter", "prayer"];

interface SubscribePayload {
    email: string;
    source: "newsletter" | "prayer";
}

function validate(
    body: unknown
): { ok: true; data: SubscribePayload } | { ok: false; error: string } {
    if (!body || typeof body !== "object") {
        return { ok: false, error: "Invalid request body." };
    }
    const { email, source } = body as Record<string, unknown>;

    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
        return { ok: false, error: "A valid email address is required." };
    }
    if (!source || typeof source !== "string" || !VALID_SOURCES.includes(source)) {
        return { ok: false, error: "Invalid subscription source." };
    }

    return {
        ok: true,
        data: {
            email: email.trim().toLowerCase(),
            source: source as "newsletter" | "prayer",
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

    const { email, source } = result.data;

    try {
        const payload = await getPayload({ config });

        // Check if already subscribed
        const existing = await payload.find({
            collection: "subscribers",
            where: { email: { equals: email } },
            limit: 1,
        });

        if (existing.docs.length > 0) {
            // Already subscribed — return success silently
            return NextResponse.json({ success: true });
        }

        await payload.create({
            collection: "subscribers",
            data: { email, source },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[subscribe] Failed:", err);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to subscribe. Please try again later.",
            },
            { status: 500 }
        );
    }
}
