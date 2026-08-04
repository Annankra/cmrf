import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { OutreachReports } from "@/components/sections/OutreachReports";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { ServicesCarousel } from "@/components/features/ServicesCarousel";
import { DiagnosticShuffler } from "@/components/features/DiagnosticShuffler";
import { TelemetryTypewriter } from "@/components/features/TelemetryTypewriter";
import { CursorScheduler } from "@/components/features/CursorScheduler";
import { Philosophy } from "@/components/philosophy/Philosophy";
import { StickyStacker } from "@/components/protocol/StickyStacker";
import { ImpactMetrics } from "@/components/ui/ImpactMetrics";
import { GetInvolvedTiers } from "@/components/sections/GetInvolvedTiers";
import { ImpactCalculator } from "@/components/donate/ImpactCalculator";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import NewsletterForm from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
    title: "CMRF — Free Medical Missions Across Ghana & Africa",
    description: "CMRF mobilizes Christian medical professionals to deliver free healthcare, dental, and eye care to 12,000+ people annually across 700+ underserved communities in Ghana. 501(c)(3) tax-exempt.",
    openGraph: {
        title: "CMRF — Compassion is the Medicine",
        description: "30+ years of free medical care across 700+ communities in Ghana. Join us — donate, volunteer, or pray.",
        url: "https://www.cmrfgh.com",
        type: "website",
    },
    twitter: {
        title: "CMRF — Free Medical Missions Across Ghana & Africa",
        description: "30+ years delivering free healthcare to underserved communities. 700+ communities served, 12,000+ patients annually.",
    },
    alternates: { canonical: "https://www.cmrfgh.com" },
};

export default function Home() {
    return (
        <div className="bg-[var(--color-charcoal-light)] min-h-screen text-[var(--color-cream)]">
            {/* A. Hero — "The Opening Shot" */}
            <Hero />

            {/* Outreach Reports & Calendar Grid */}
            <OutreachReports />

            {/* B. Who We Are */}
            <WhoWeAre />

            {/* C. Services Carousel */}
            <section className="section border-t border-white/5">
                <div className="container-main px-6 md:px-12">
                    <ScrollReveal animation="fade-up">
                        <div className="text-center mb-16">
                            <div className="section-divider" />
                            <p
                                className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4 font-semibold"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                What We Do
                            </p>
                            <h2
                                className="text-3xl md:text-5xl font-bold text-white"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Service in{" "}
                                <span className="font-drama text-[var(--color-clay)] italic pr-2">
                                    action.
                                </span>
                            </h2>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" duration={1.2}>
                        <ServicesCarousel />
                    </ScrollReveal>
                </div>
            </section>

            {/* C2. Interactive Functional Micro-UI Artifacts — "Live Operations & Telemetry" */}
            <section className="section bg-[var(--color-charcoal)] border-t border-b border-white/5">
                <div className="container-main px-6 md:px-12">
                    <ScrollReveal animation="fade-up">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <div className="section-divider" />
                            <p
                                className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4 font-semibold"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Mission Operations
                            </p>
                            <h2
                                className="text-3xl md:text-5xl font-bold text-white mb-4"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Interactive telemetry &{" "}
                                <span className="font-drama text-[var(--color-clay)] italic pr-2">
                                    protocols.
                                </span>
                            </h2>
                            <p className="text-white/60 text-base">
                                Micro-systems orchestrating free healthcare, real-time logging, and deployment schedules across 600+ communities.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                        <ScrollReveal animation="fade-up" delay={0.1}>
                            <DiagnosticShuffler />
                        </ScrollReveal>
                        <ScrollReveal animation="fade-up" delay={0.25}>
                            <TelemetryTypewriter />
                        </ScrollReveal>
                        <ScrollReveal animation="fade-up" delay={0.4}>
                            <CursorScheduler />
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Impact Metrics — Animated Counters */}
            <ImpactMetrics />

            {/* D. Philosophy — "The Manifesto" */}
            <Philosophy />

            {/* E. Protocol — "Sticky Stacking Archive" */}
            <section>
                <ScrollReveal animation="fade-up">
                    <div className="text-center py-16">
                        <div className="section-divider" />
                        <p
                            className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4 font-semibold"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            Our Process
                        </p>
                        <h2
                            className="text-3xl md:text-5xl font-bold text-white"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            How we{" "}
                            <span className="font-drama text-[var(--color-clay)] italic pr-2">
                                deliver hope.
                            </span>
                        </h2>
                    </div>
                </ScrollReveal>
                <StickyStacker />
            </section>

            {/* Impact Calculator Section */}
            <section className="section border-t border-white/5 bg-black/20">
                <div className="container-main px-6 md:px-12">
                    <ImpactCalculator />
                </div>
            </section>

            {/* F. Get Involved Tiers */}
            <GetInvolvedTiers />

            {/* Newsletter Section */}
            <section id="newsletter" className="section-dark section border-t border-white/5">
                <div className="container-main px-6 md:px-12 text-center">
                    <ScrollReveal animation="fade-up">
                        <div>
                            <div className="section-divider" />
                            <p
                                className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4 font-semibold"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Stay Connected
                            </p>
                            <h2
                                className="text-3xl md:text-5xl font-bold text-[var(--color-cream)] mb-4"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Join our{" "}
                                <span className="font-drama text-[var(--color-clay)] italic pr-2">
                                    newsletter.
                                </span>
                            </h2>
                            <p className="text-[var(--color-cream)]/60 text-base mb-8 max-w-md mx-auto">
                                Be the first to hear about upcoming missions, impact stories, and
                                ways to get involved.
                            </p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal animation="fade-up" delay={0.2}>
                        <NewsletterForm source="newsletter" variant="dark" />
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
