import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Thank You | Donation Received",
    description: "Your donation to CMRF has been received. Thank you for your generosity.",
};

export default function DonateSuccessPage() {
    return (
        <section className="section bg-[var(--color-charcoal)] min-h-[85vh] flex items-center justify-center relative overflow-hidden py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,88,51,0.1),transparent_60%)] pointer-events-none" />
            <div className="container-main px-6 md:px-12 max-w-xl text-center relative z-10">
                <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 md:p-14 shadow-2xl space-y-6">
                    {/* Glowing Success Badge */}
                    <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                        <div className="relative w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                            <CircleCheck size={44} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-clay)] font-mono font-medium">
                            Donation Confirmed
                        </span>
                        <h1
                            className="text-4xl md:text-5xl font-extrabold text-[var(--color-cream)] tracking-tight"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Generosity in{" "}
                            <span className="font-drama text-[var(--color-clay)] italic">
                                Action.
                            </span>
                        </h1>
                    </div>

                    <p className="text-[var(--color-cream)]/80 text-base md:text-lg leading-relaxed">
                        Your gift enables our medical teams to deliver free healthcare, surgeries, and clean water to underserved communities across Ghana and Africa.
                    </p>

                    <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-left space-y-1">
                        <p className="text-xs text-[var(--color-clay)] uppercase tracking-wider font-mono font-semibold">
                            Receipt & Confirmation
                        </p>
                        <p className="text-xs text-[var(--color-cream)]/70">
                            A detailed tax-deductible receipt has been sent to your email address by Stripe.
                        </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link href="/" className="btn btn-primary w-full sm:w-auto">
                            <span className="btn-text flex items-center justify-center gap-2">
                                <ArrowLeft size={16} />
                                Return to Homepage
                            </span>
                        </Link>
                        <Link href="/about" className="btn btn-ghost w-full sm:w-auto">
                            <span>See Our Impact</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
