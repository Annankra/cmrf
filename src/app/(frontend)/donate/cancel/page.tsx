import type { Metadata } from "next";
import Link from "next/link";
import { XCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Donation Cancelled",
    description: "Your donation was not processed. You can try again anytime.",
};

export default function DonateCancelPage() {
    return (
        <section className="section bg-[var(--color-cream)] min-h-[80vh] flex items-center justify-center">
            <div className="container-main px-6 md:px-12 max-w-lg text-center">
                <div className="card p-10 md:p-14">
                    <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-6">
                        <XCircle size={40} className="text-amber-500" />
                    </div>
                    <h1
                        className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)] mb-3"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        No worries.
                    </h1>
                    <p className="text-[var(--color-muted)] mb-8">
                        Your donation was not processed and you have not been charged.
                        If you&apos;d like to try again, you can return to the donate
                        page anytime.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link href="/donate" className="btn btn-primary">
                            <span className="btn-text flex items-center gap-2">
                                Try Again
                                <ArrowRight size={16} />
                            </span>
                        </Link>
                        <Link href="/" className="btn btn-secondary">
                            <span className="btn-text">Back to Home</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
