import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Globe, HandHeart } from "lucide-react";
import VolunteerForm from "@/components/forms/VolunteerForm";
import NewsletterForm from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
    title: "Get Involved",
    description:
        "Support CMRF through prayer, donations, or volunteering. Join us in bringing free medical care and God's love to underserved communities.",
};

export default function GetInvolvedPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80&auto=format')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/60 to-transparent" />
                <div className="relative z-10 container-main px-6 md:px-12 pb-12 md:pb-16">
                    <p
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-3"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Get Involved
                    </p>
                    <h1
                        className="text-4xl md:text-6xl font-bold text-[var(--color-cream)]"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Make a{" "}
                        <span className="font-drama text-[var(--color-clay)]">
                            Difference.
                        </span>
                    </h1>
                </div>
            </section>

            {/* Donate Section */}
            <section className="section bg-[var(--color-cream)]">
                <div className="container-main px-6 md:px-12 max-w-4xl">
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 rounded-2xl bg-[var(--color-clay)]/10 flex items-center justify-center mx-auto mb-6">
                            <Globe size={28} className="text-[var(--color-clay)]" />
                        </div>
                        <h2
                            className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)] mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Support our{" "}
                            <span className="font-drama text-[var(--color-clay)]">
                                mission.
                            </span>
                        </h2>
                        <p className="text-[var(--color-muted)] max-w-lg mx-auto">
                            Your donation directly funds medical outreaches, community
                            boreholes, medical equipment, and scholarships for communities in
                            need. CMMRF-USA is a federally authorized tax-exempt 501(c)3
                            charitable organization.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/donate"
                            className="btn btn-primary text-lg px-8"
                        >
                            <span className="btn-text">Donate Now</span>
                        </Link>
                        <a
                            href="mailto:cmmrf@usa.com"
                            className="btn btn-secondary"
                        >
                            <span className="btn-text">Contact About Giving</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Volunteer Section */}
            <section id="volunteer" className="section bg-[var(--color-ivory)]">
                <div className="container-main px-6 md:px-12 max-w-3xl">
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 rounded-2xl bg-[var(--color-moss)]/10 flex items-center justify-center mx-auto mb-6">
                            <HandHeart size={28} className="text-[var(--color-moss)]" />
                        </div>
                        <h2
                            className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)] mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Volunteer your{" "}
                            <span className="font-drama text-[var(--color-clay)]">
                                skills.
                            </span>
                        </h2>
                        <p className="text-[var(--color-muted)] max-w-lg mx-auto">
                            Whether you&apos;re a medical professional or have other skills to
                            offer, we welcome volunteers to join our next mission deployment.
                        </p>
                    </div>
                    <VolunteerForm />
                </div>
            </section>

            {/* Prayer Section */}
            <section id="pray" className="section section-dark">
                <div className="container-main px-6 md:px-12 text-center max-w-3xl">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--color-clay)]/20 flex items-center justify-center mx-auto mb-6">
                        <Heart size={28} className="text-[var(--color-clay)]" />
                    </div>
                    <h2
                        className="text-3xl md:text-4xl font-bold text-[var(--color-cream)] mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Join our{" "}
                        <span className="font-drama text-[var(--color-clay)]">
                            prayer network.
                        </span>
                    </h2>
                    <p className="text-[var(--color-cream)]/50 mb-8 max-w-lg mx-auto">
                        Prayer is the foundation of our mission. Subscribe to receive
                        monthly prayer guides, mission field updates, and be part of our
                        global intercession community.
                    </p>
                    <NewsletterForm source="prayer" variant="dark" />
                </div>
            </section>
        </>
    );
}
