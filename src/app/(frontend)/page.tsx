import { Hero } from "@/components/hero/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { ServicesCarousel } from "@/components/features/ServicesCarousel";
import { Philosophy } from "@/components/philosophy/Philosophy";
import { StickyStacker } from "@/components/protocol/StickyStacker";
import { ImpactMetrics } from "@/components/ui/ImpactMetrics";
import { GetInvolvedTiers } from "@/components/sections/GetInvolvedTiers";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export default function Home() {
    return (
        <>
            {/* A. Hero — "The Opening Shot" */}
            <Hero />

            {/* B. Who We Are */}
            <WhoWeAre />

            {/* C. Features — "Interactive Functional Artifacts" / Services Carousel */}
            <section className="section bg-[var(--color-cream)]">
                <div className="container-main px-6 md:px-12">
                    <ScrollReveal animation="fade-up">
                        <div className="text-center mb-16">
                            <div className="section-divider" />
                            <p
                                className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                What We Do
                            </p>
                            <h2
                                className="text-3xl md:text-5xl font-bold text-[var(--color-charcoal)]"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Service in{" "}
                                <span className="font-drama text-[var(--color-clay)]">
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

            {/* Impact Metrics — Animated Counters */}
            <ImpactMetrics />

            {/* D. Philosophy — "The Manifesto" */}
            <Philosophy />

            {/* E. Protocol — "Sticky Stacking Archive" */}
            <section>
                <ScrollReveal animation="fade-up">
                    <div className="text-center py-16 bg-[var(--color-cream)]">
                        <div className="section-divider" />
                        <p
                            className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            Our Process
                        </p>
                        <h2
                            className="text-3xl md:text-5xl font-bold text-[var(--color-charcoal)]"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            How we{" "}
                            <span className="font-drama text-[var(--color-clay)]">
                                deliver hope.
                            </span>
                        </h2>
                    </div>
                </ScrollReveal>
                <StickyStacker />
            </section>

            {/* F. Get Involved Tiers */}
            <GetInvolvedTiers />

            {/* Newsletter Section */}
            <section id="newsletter" className="section-dark section">
                <div className="container-main px-6 md:px-12 text-center">
                    <ScrollReveal animation="fade-up">
                        <div>
                            <div className="section-divider" />
                            <p
                                className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Stay Connected
                            </p>
                            <h2
                                className="text-3xl md:text-4xl font-bold text-[var(--color-cream)] mb-4"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Join our{" "}
                                <span className="font-drama text-[var(--color-clay)]">
                                    newsletter.
                                </span>
                            </h2>
                            <p className="text-[var(--color-cream)]/50 text-sm mb-8 max-w-md mx-auto">
                                Be the first to hear about upcoming missions, impact stories, and
                                ways to get involved.
                            </p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal animation="fade-up" delay={0.2}>
                        <form className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-5 py-3.5 rounded-full bg-[var(--color-cream)]/10 border border-[var(--color-cream)]/10 text-[var(--color-cream)] placeholder:text-[var(--color-cream)]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay)]/50 transition-all"
                                style={{ fontFamily: "var(--font-body)" }}
                            />
                            <button type="submit" className="btn btn-primary whitespace-nowrap">
                                <span className="btn-text">Subscribe</span>
                            </button>
                        </form>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
