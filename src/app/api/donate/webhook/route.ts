import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPayload } from "payload";
import config from "@payload-config";
import { Resend } from "resend";

// ---------------------------------------------------------------------------
// Stripe webhook handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const sig = request.headers.get("stripe-signature");

    if (!secretKey || !sig || !webhookSecret) {
        return NextResponse.json(
            { error: "Missing Stripe configuration or signature." },
            { status: 400 }
        );
    }

    const stripe = new Stripe(secretKey);

    let event: Stripe.Event;

    try {
        const rawBody = await request.text();
        event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch (err) {
        console.error("[webhook] Signature verification failed:", err);
        return NextResponse.json(
            { error: "Invalid signature." },
            { status: 400 }
        );
    }

    // --- Handle checkout.session.completed ---
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        try {
            const payload = await getPayload({ config });

            // Idempotency: check if donation already exists
            const existing = await payload.find({
                collection: "donations",
                where: {
                    stripeSessionId: { equals: session.id },
                },
                limit: 1,
            });

            if (existing.docs.length > 0) {
                // Already processed — return 200
                return NextResponse.json({ received: true });
            }

            // Create donation record
            const donorName = session.metadata?.donorName || session.customer_details?.name || "";
            const donorEmail = session.metadata?.donorEmail || session.customer_details?.email || "";

            await payload.create({
                collection: "donations",
                data: {
                    donorName,
                    donorEmail: donorEmail || undefined,
                    amount: session.amount_total || 0,
                    currency: session.currency || "usd",
                    status: "completed",
                    stripeSessionId: session.id,
                    stripePaymentIntentId:
                        typeof session.payment_intent === "string"
                            ? session.payment_intent
                            : session.payment_intent?.id || "",
                    receiptSent: false,
                },
            });

            // --- Send receipt email ---
            const resendKey = process.env.RESEND_API_KEY;
            if (resendKey && donorEmail) {
                try {
                    const resend = new Resend(resendKey);
                    const amountFormatted = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: session.currency || "usd",
                    }).format((session.amount_total || 0) / 100);

                    await resend.emails.send({
                        from: "CMRF Donations <onboarding@resend.dev>",
                        to: donorEmail,
                        subject: `Thank you for your ${amountFormatted} donation to CMRF`,
                        html: `
              <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FAF9F6; border-radius: 16px;">
                <h2 style="margin: 0 0 8px; font-size: 24px; color: #1A1A1A;">
                  Thank you${donorName ? `, ${donorName}` : ""}!
                </h2>
                <p style="margin: 0 0 24px; font-size: 14px; color: #8A8A7A;">
                  Your generosity makes a real difference.
                </p>
                <div style="background: #FFFFFF; border: 1px solid #E8E4DD; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 12px; font-size: 13px; color: #8A8A7A;">Amount</td>
                      <td style="padding: 8px 12px; font-size: 18px; font-weight: 700; color: #CC5833;">${amountFormatted}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 12px; font-size: 13px; color: #8A8A7A;">Date</td>
                      <td style="padding: 8px 12px; font-size: 14px; color: #1A1A1A;">${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 12px; font-size: 13px; color: #8A8A7A;">Organization</td>
                      <td style="padding: 8px 12px; font-size: 14px; color: #1A1A1A;">CMMRF-USA</td>
                    </tr>
                  </table>
                </div>
                <p style="margin: 0 0 16px; font-size: 13px; color: #8A8A7A; line-height: 1.6;">
                  CMMRF-USA is a federally authorized tax-exempt 501(c)(3) charitable organization.
                  This donation may be tax-deductible to the extent allowed by law.
                  Please retain this email for your records.
                </p>
                <p style="margin: 0; font-size: 12px; color: #8A8A7A;">
                  Christian Medical Missions Resource Foundation ·
                  <a href="https://www.cmrfgh.com" style="color: #CC5833;">cmrfgh.com</a>
                </p>
              </div>
            `,
                    });

                    // Mark receipt as sent
                    const donations = await payload.find({
                        collection: "donations",
                        where: {
                            stripeSessionId: { equals: session.id },
                        },
                        limit: 1,
                    });

                    if (donations.docs[0]) {
                        await payload.update({
                            collection: "donations",
                            id: donations.docs[0].id,
                            data: { receiptSent: true },
                        });
                    }
                } catch (emailErr) {
                    console.error("[webhook] Failed to send receipt email:", emailErr);
                    // Don't fail the webhook because of email — donation is recorded
                }
            }
        } catch (dbErr) {
            console.error("[webhook] Failed to record donation:", dbErr);
            return NextResponse.json(
                { error: "Failed to process donation." },
                { status: 500 }
            );
        }
    }

    return NextResponse.json({ received: true });
}
