import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Thank You | Donation Received",
    description: "Your donation to CMRF has been received. Thank you for your generosity.",
};

export default function DonateSuccessPage() {
    return (
        <section className="section bg-[var(--color-cream)] min-h-[80vh] flex items-center justify-center">
            <div className="container-main px-6 md:px-12 max-w-lg text-center">
                <div className="card p-10 md:p-14">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                        <CircleCheck size={40} className="text-green-600" />
                    </div>
                    <h1
                        className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)] mb-3"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Thank{" "}
                        <span className="font-drama text-[var(--color-clay)]">
                            you!
                        </span>
                    </h1>
                    <p className="text-[var(--color-muted)] mb-2">
                        Your donation has been received successfully. You are making a
                        real difference in the lives of communities across Ghana and
                        Africa.
                    </p>
                    <p
                        className="text-xs text-[var(--color-muted)] mb-8"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        A tax-deductible receipt has been sent to your email address.
                    </p>
                    <Link href="/" className="btn btn-primary">
                        <span className="btn-text flex items-center gap-2">
                            <ArrowLeft size={16} />
                            Back to Home
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
