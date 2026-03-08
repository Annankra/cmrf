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
                    className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-overlay"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80&auto=format')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal-light)] via-[var(--color-charcoal-light)]/80 to-[var(--color-charcoal-light)]/30" />
                <div className="relative z-10 container-main px-6 md:px-12 pb-12 md:pb-16 w-full">
                    <p
                        className="hero-anim text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-3"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Get Involved
                    </p>
                    <h1
                        className="hero-anim text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Make a{" "}
                        <span className="font-drama text-[var(--color-clay)] block lg:inline-block pr-2">
                            Difference.
                        </span>
                    </h1>
                </div>
            </section>

            {/* Donate Section */}
            <section className="section bg-transparent relative z-10 border-t border-white/5">
                <div className="container-main px-6 md:px-12 max-w-4xl">
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 rounded-2xl bg-[var(--color-clay)]/10 border border-[var(--color-clay)]/20 flex items-center justify-center mx-auto mb-6 transition-transform duration-500 hover:scale-110">
                            <Globe size={28} className="text-[var(--color-clay)]" />
                        </div>
                        <h2
                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Support our{" "}
                            <span className="font-drama text-[var(--color-clay)] italic pr-2">
                                mission.
                            </span>
                        </h2>
                        <p className="text-white/60 max-w-lg mx-auto text-lg font-light leading-relaxed">
                            Your donation directly funds medical outreaches, community
                            boreholes, medical equipment, and scholarships for communities in
                            need. CMMRF-USA is a federally authorized tax-exempt 501(c)3
                            charitable organization.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/donate"
                            className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[var(--color-clay)] text-white hover:bg-[var(--color-clay)]/90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(204,88,51,0.4)] w-full sm:w-auto"
                        >
                            <span className="uppercase tracking-[0.2em] text-xs font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                                Donate Now
                            </span>
                        </Link>
                        <a
                            href="mailto:cmmrf@usa.com"
                            className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
                        >
                            <span className="uppercase tracking-[0.1em] text-xs font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                                Contact About Giving
                            </span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Volunteer Section */}
            <section id="volunteer" className="section bg-black/20 border-t border-white/5">
                <div className="container-main px-6 md:px-12 max-w-3xl">
                    <div className="text-center mb-16">
                        <div className="w-16 h-16 rounded-2xl bg-[var(--color-moss)]/10 border border-[var(--color-moss)]/20 flex items-center justify-center mx-auto mb-6 transition-transform duration-500 hover:scale-110">
                            <HandHeart size={28} className="text-[var(--color-moss)]" />
                        </div>
                        <h2
                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Volunteer your{" "}
                            <span className="font-drama text-[var(--color-clay)] italic pr-2">
                                skills.
                            </span>
                        </h2>
                        <p className="text-white/60 max-w-lg mx-auto text-lg font-light leading-relaxed">
                            Whether you&apos;re a medical professional or have other skills to
                            offer, we welcome volunteers to join our next mission deployment.
                        </p>
                    </div>

                    {/* Dark wrapper for the form */}
                    <div className="p-8 md:p-10 rounded-[2rem] bg-black/40 border border-white/5 backdrop-blur-md">
                        <VolunteerForm />
                    </div>
                </div>
            </section>

            {/* Prayer Section */}
            <section id="pray" className="section bg-black/40 border-t border-white/5 relative overflow-hidden">
                {/* Subtle background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-[var(--color-clay)]/5 rounded-[100%] blur-[100px] pointer-events-none" />

                <div className="container-main relative z-10 px-6 md:px-12 text-center max-w-3xl">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--color-clay)]/10 border border-[var(--color-clay)]/20 flex items-center justify-center mx-auto mb-6 transition-transform duration-500 hover:scale-110">
                        <Heart size={28} className="text-[var(--color-clay)]" />
                    </div>
                    <h2
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Join our{" "}
                        <span className="font-drama text-[var(--color-clay)] italic pr-2">
                            prayer network.
                        </span>
                    </h2>
                    <p className="text-white/60 mb-12 max-w-lg mx-auto text-lg font-light leading-relaxed">
                        Prayer is the foundation of our mission. Subscribe to receive
                        monthly prayer guides, mission field updates, and be part of our
                        global intercession community.
                    </p>

                    <div className="max-w-xl mx-auto">
                        <NewsletterForm source="prayer" variant="dark" />
                    </div>
                </div>
            </section>
        </>
    );
}
