"use client";

import Link from "next/link";
import { Heart, Globe, HandHeart } from "lucide-react";

const tiers = [
    {
        name: "Pray",
        icon: Heart,
        description: "Join our prayer network and stay connected with our mission.",
        features: [
            "Monthly prayer guide",
            "Mission field updates",
            "Newsletter subscription",
            "Community prayer meetings",
        ],
        cta: "Join the Network",
        href: "/get-involved#pray",
        highlighted: false,
    },
    {
        name: "Give",
        icon: Globe,
        description: "Fund missions and sponsor communities in need of care.",
        features: [
            "Sponsor a medical outreach",
            "Fund community boreholes",
            "Supply medical equipment",
            "Support the CMRF Clinic",
            "Tax-deductible via CMMRF-USA 501(c)3",
        ],
        cta: "Donate Now",
        href: "/get-involved",
        highlighted: true,
    },
    {
        name: "Go",
        icon: HandHeart,
        description: "Volunteer your skills and join the next mission deployment.",
        features: [
            "Medical professionals welcome",
            "Non-medical roles available",
            "Short-term mission trips",
            "Training & development",
        ],
        cta: "Volunteer",
        href: "/get-involved#volunteer",
        highlighted: false,
    },
];

export function GetInvolvedTiers() {
    return (
        <section className="section bg-[var(--color-cream)]">
            <div className="container-main px-6 md:px-12">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Get Involved
                    </p>
                    <h2
                        className="text-3xl md:text-5xl font-bold text-[var(--color-charcoal)] mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Three ways to{" "}
                        <span className="font-drama text-[var(--color-clay)]">
                            make a difference.
                        </span>
                    </h2>
                </div>

                {/* Tiers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {tiers.map((tier) => {
                        const Icon = tier.icon;
                        return (
                            <div
                                key={tier.name}
                                className={`rounded-[2rem] p-8 transition-all duration-300 hover:translate-y-[-4px] ${tier.highlighted
                                        ? "bg-[var(--color-moss)] text-[var(--color-cream)] ring-2 ring-[var(--color-clay)] scale-[1.02]"
                                        : "card"
                                    }`}
                            >
                                <div
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${tier.highlighted
                                            ? "bg-[var(--color-clay)]"
                                            : "bg-[var(--color-moss)]/10"
                                        }`}
                                >
                                    <Icon
                                        size={22}
                                        className={
                                            tier.highlighted
                                                ? "text-white"
                                                : "text-[var(--color-moss)]"
                                        }
                                    />
                                </div>

                                <h3
                                    className="text-2xl font-bold mb-2"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {tier.name}
                                </h3>

                                <p
                                    className={`text-sm mb-6 ${tier.highlighted
                                            ? "text-[var(--color-cream)]/70"
                                            : "text-[var(--color-muted)]"
                                        }`}
                                >
                                    {tier.description}
                                </p>

                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className={`flex items-start gap-2 text-sm ${tier.highlighted
                                                    ? "text-[var(--color-cream)]/80"
                                                    : "text-[var(--color-charcoal)]/70"
                                                }`}
                                        >
                                            <span
                                                className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${tier.highlighted
                                                        ? "bg-[var(--color-clay)]"
                                                        : "bg-[var(--color-moss)]/40"
                                                    }`}
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={tier.href}
                                    className={`btn w-full text-center ${tier.highlighted ? "btn-primary" : "btn-secondary"
                                        }`}
                                >
                                    <span className="btn-text">{tier.cta}</span>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
