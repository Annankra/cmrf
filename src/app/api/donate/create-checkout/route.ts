import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// ---------------------------------------------------------------------------
// Rate limiter (same pattern as /api/contact)
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
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
const MIN_AMOUNT = 100; // $1.00 in cents
const MAX_AMOUNT = 5_000_000; // $50,000.00 in cents

interface DonatePayload {
    amount: number; // in cents
    donorName?: string;
    donorEmail?: string;
}

function validate(
    body: unknown
): { ok: true; data: DonatePayload } | { ok: false; error: string } {
    if (!body || typeof body !== "object") {
        return { ok: false, error: "Invalid request body." };
    }

    const { amount, donorName, donorEmail } = body as Record<string, unknown>;

    if (typeof amount !== "number" || !Number.isInteger(amount)) {
        return { ok: false, error: "Amount must be an integer (in cents)." };
    }
    if (amount < MIN_AMOUNT) {
        return { ok: false, error: "Minimum donation is $1.00." };
    }
    if (amount > MAX_AMOUNT) {
        return { ok: false, error: "Maximum donation is $50,000.00." };
    }

    if (donorEmail && (typeof donorEmail !== "string" || !EMAIL_RE.test(donorEmail))) {
        return { ok: false, error: "Invalid email address." };
    }

    return {
        ok: true,
        data: {
            amount,
            donorName: typeof donorName === "string" ? donorName.trim() : undefined,
            donorEmail: typeof donorEmail === "string" ? donorEmail.trim() : undefined,
        },
    };
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
    // --- Rate limit ---
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
        return NextResponse.json(
            { success: false, error: "Too many requests. Please try again later." },
            { status: 429 }
        );
    }

    // --- Validate ---
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

    const { amount, donorName, donorEmail } = result.data;

    // --- Stripe ---
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
        console.error("[donate] STRIPE_SECRET_KEY is not set.");
        return NextResponse.json(
            { success: false, error: "Payment service is not configured." },
            { status: 500 }
        );
    }

    const stripe = new Stripe(secretKey);

    try {
        const origin = request.headers.get("origin") || "http://localhost:3000";

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        unit_amount: amount,
                        product_data: {
                            name: "Donation to CMRF",
                            description:
                                "Tax-deductible donation to CMMRF-USA, a 501(c)(3) charitable organization.",
                        },
                    },
                    quantity: 1,
                },
            ],
            ...(donorEmail ? { customer_email: donorEmail } : {}),
            metadata: {
                donorName: donorName || "",
                donorEmail: donorEmail || "",
            },
            success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/donate/cancel`,
        });

        return NextResponse.json({ success: true, url: session.url });
    } catch (err) {
        console.error("[donate] Stripe checkout error:", err);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to create checkout session. Please try again.",
            },
            { status: 500 }
        );
    }
}
