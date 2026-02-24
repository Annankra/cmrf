import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Globe, HandHeart, ExternalLink } from "lucide-react";

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
                        <a
                            href="#"
                            className="btn btn-primary text-lg px-8"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="btn-text flex items-center gap-2">
                                Donate Now <ExternalLink size={16} />
                            </span>
                        </a>
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

                    <form className="card p-8 space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label
                                    className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-moss)]/10 bg-[var(--color-cream)] text-[var(--color-charcoal)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay)]/30 transition-all"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-moss)]/10 bg-[var(--color-cream)] text-[var(--color-charcoal)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay)]/30 transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Area of Interest
                            </label>
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-[var(--color-moss)]/10 bg-[var(--color-cream)] text-[var(--color-charcoal)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay)]/30 transition-all"
                            >
                                <option>Medical (Doctor / Nurse)</option>
                                <option>Dental</option>
                                <option>Optical / Eye Care</option>
                                <option>Counselling</option>
                                <option>Logistics & Administration</option>
                                <option>Photography / Media</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label
                                className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Message
                            </label>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-[var(--color-moss)]/10 bg-[var(--color-cream)] text-[var(--color-charcoal)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay)]/30 transition-all resize-none"
                                placeholder="Tell us about yourself and how you'd like to contribute..."
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            <span className="btn-text">Submit Interest</span>
                        </button>
                    </form>
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
                    <form className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your email address"
                            required
                            className="w-full px-5 py-3.5 rounded-full bg-[var(--color-cream)]/10 border border-[var(--color-cream)]/10 text-[var(--color-cream)] placeholder:text-[var(--color-cream)]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay)]/50 transition-all"
                        />
                        <button type="submit" className="btn btn-primary whitespace-nowrap">
                            <span className="btn-text">Join</span>
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}
