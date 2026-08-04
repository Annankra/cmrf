import type { Metadata } from "next";
import Link from "next/link";
import { XCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Donation Cancelled",
    description: "Your donation was not processed. You can try again anytime.",
};

export default function DonateCancelPage() {
    return (
        <section className="section bg-[var(--color-charcoal)] min-h-[85vh] flex items-center justify-center relative overflow-hidden py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,88,51,0.08),transparent_60%)] pointer-events-none" />
            <div className="container-main px-6 md:px-12 max-w-xl text-center relative z-10">
                <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 md:p-14 shadow-2xl space-y-6">
                    <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-400">
                        <XCircle size={40} />
                    </div>

                    <div className="space-y-3">
                        <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-clay)] font-mono font-medium">
                            Transaction Cancelled
                        </span>
                        <h1
                            className="text-4xl md:text-5xl font-extrabold text-[var(--color-cream)] tracking-tight"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            No{" "}
                            <span className="font-drama text-[var(--color-clay)] italic">
                                Worries.
                            </span>
                        </h1>
                    </div>

                    <p className="text-[var(--color-cream)]/80 text-base md:text-lg leading-relaxed">
                        Your transaction was cancelled and no funds were charged. If you had any issues during checkout, our team is happy to assist you.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link href="/donate" className="btn btn-primary w-full sm:w-auto">
                            <span className="btn-text flex items-center justify-center gap-2">
                                Try Again
                                <ArrowRight size={16} />
                            </span>
                        </Link>
                        <Link href="/" className="btn btn-ghost w-full sm:w-auto">
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
