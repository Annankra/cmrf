"use client";

import { useState, useRef, useEffect } from "react";
import {
    Heart,
    Stethoscope,
    Droplets,
    GraduationCap,
    ArrowRight,
    Loader2,
} from "lucide-react";
import gsap from "gsap";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const PRESET_AMOUNTS = [
    { cents: 2500, label: "$25" },
    { cents: 5000, label: "$50" },
    { cents: 10000, label: "$100" },
    { cents: 25000, label: "$250" },
    { cents: 50000, label: "$500" },
];

const IMPACT_ITEMS = [
    {
        icon: Stethoscope,
        amount: "$25",
        desc: "Provides a full medical screening for one patient",
    },
    {
        icon: Droplets,
        amount: "$100",
        desc: "Funds clean drinking water for a community for a month",
    },
    {
        icon: GraduationCap,
        amount: "$250",
        desc: "Sponsors a student's medical education for a semester",
    },
];

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default function DonatePage() {
    const [selectedCents, setSelectedCents] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState("");
    const [donorName, setDonorName] = useState("");
    const [donorEmail, setDonorEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const heroRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    // GSAP entrance animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from("[data-hero-text]", {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.08,
                ease: "power3.out",
                delay: 0.2,
            });
            gsap.from("[data-form-card]", {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.5,
            });
            gsap.from("[data-impact-card]", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.7,
            });
        });
        return () => ctx.revert();
    }, []);

    const effectiveCents =
        selectedCents ??
        (customAmount ? Math.round(parseFloat(customAmount) * 100) : 0);

    const handleSubmit = async () => {
        setError("");

        if (!effectiveCents || effectiveCents < 100) {
            setError("Please select or enter a donation amount (minimum $1).");
            return;
        }
        if (effectiveCents > 5_000_000) {
            setError("Maximum donation is $50,000.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/donate/create-checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: effectiveCents,
                    donorName: donorName.trim() || undefined,
                    donorEmail: donorEmail.trim() || undefined,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                setError(data.error || "Something went wrong. Please try again.");
                setLoading(false);
                return;
            }

            // Redirect to Stripe Checkout
            window.location.href = data.url;
        } catch {
            setError("Network error. Please check your connection and try again.");
            setLoading(false);
        }
    };

    return (
        <>
            {/* Hero */}
            <section
                ref={heroRef}
                className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80&auto=format')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/60 to-transparent" />
                <div className="relative z-10 container-main px-6 md:px-12 pb-12 md:pb-16">
                    <p
                        data-hero-text
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-3"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Make a Donation
                    </p>
                    <h1
                        data-hero-text
                        className="text-4xl md:text-6xl font-bold text-[var(--color-cream)]"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Your generosity{" "}
                        <span className="font-drama text-[var(--color-clay)]">
                            heals.
                        </span>
                    </h1>
                    <p
                        data-hero-text
                        className="text-[var(--color-cream)]/60 mt-4 max-w-lg text-base"
                    >
                        Every dollar directly funds free medical outreaches, community
                        boreholes, and scholarships across Ghana and Africa.
                    </p>
                </div>
            </section>

            {/* Donation Form */}
            <section className="section bg-[var(--color-cream)]">
                <div className="container-main px-6 md:px-12 max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
                        {/* Left — Form */}
                        <div className="lg:col-span-3" ref={formRef}>
                            <div data-form-card className="card p-8 md:p-10">
                                {/* Amount selection */}
                                <h2
                                    className="text-xl font-bold text-[var(--color-charcoal)] mb-6"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    Choose an amount
                                </h2>
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
                                    {PRESET_AMOUNTS.map((preset) => (
                                        <button
                                            key={preset.cents}
                                            type="button"
                                            onClick={() => {
                                                setSelectedCents(preset.cents);
                                                setCustomAmount("");
                                            }}
                                            className={`py-3 px-4 rounded-2xl text-sm font-semibold transition-all duration-300 cursor-pointer border ${selectedCents === preset.cents
                                                    ? "bg-[var(--color-clay)] text-white border-[var(--color-clay)] shadow-lg shadow-[var(--color-clay)]/20"
                                                    : "bg-[var(--color-cream)] text-[var(--color-charcoal)] border-[var(--color-moss)]/10 hover:border-[var(--color-clay)]/40"
                                                }`}
                                            style={{
                                                fontFamily: "var(--font-heading)",
                                            }}
                                        >
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Custom amount */}
                                <div className="mb-8">
                                    <label
                                        className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5"
                                        style={{
                                            fontFamily: "var(--font-heading)",
                                        }}
                                    >
                                        Or enter a custom amount
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)] text-sm font-semibold">
                                            $
                                        </span>
                                        <input
                                            type="number"
                                            min="1"
                                            max="50000"
                                            step="1"
                                            value={customAmount}
                                            onChange={(e) => {
                                                setCustomAmount(e.target.value);
                                                setSelectedCents(null);
                                            }}
                                            placeholder="0.00"
                                            className="w-full pl-8 pr-4 py-3 rounded-xl border border-[var(--color-moss)]/10 bg-[var(--color-cream)] text-[var(--color-charcoal)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay)]/30 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Donor info (optional) */}
                                <h3
                                    className="text-sm font-bold text-[var(--color-charcoal)] mb-4 uppercase tracking-wide"
                                    style={{
                                        fontFamily: "var(--font-heading)",
                                    }}
                                >
                                    Your information{" "}
                                    <span className="text-[var(--color-muted)] font-normal normal-case tracking-normal">
                                        (optional — for your receipt)
                                    </span>
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5"
                                            style={{
                                                fontFamily:
                                                    "var(--font-heading)",
                                            }}
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={donorName}
                                            onChange={(e) =>
                                                setDonorName(e.target.value)
                                            }
                                            placeholder="Your name"
                                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-moss)]/10 bg-[var(--color-cream)] text-[var(--color-charcoal)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay)]/30 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5"
                                            style={{
                                                fontFamily:
                                                    "var(--font-heading)",
                                            }}
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={donorEmail}
                                            onChange={(e) =>
                                                setDonorEmail(e.target.value)
                                            }
                                            placeholder="your@email.com"
                                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-moss)]/10 bg-[var(--color-cream)] text-[var(--color-charcoal)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay)]/30 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Error */}
                                {error && (
                                    <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                                        {error}
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="btn btn-primary w-full text-base group disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <span className="btn-text flex items-center justify-center gap-2">
                                        {loading ? (
                                            <>
                                                <Loader2
                                                    size={18}
                                                    className="animate-spin"
                                                />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Donate{" "}
                                                {effectiveCents > 0 &&
                                                    `$${(effectiveCents / 100).toFixed(2)}`}{" "}
                                                Now
                                                <ArrowRight
                                                    size={18}
                                                    className="group-hover:translate-x-1 transition-transform"
                                                />
                                            </>
                                        )}
                                    </span>
                                </button>

                                {/* Tax note */}
                                <p
                                    className="text-center text-xs text-[var(--color-muted)] mt-4"
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                    }}
                                >
                                    CMMRF-USA is a 501(c)(3). Your donation is
                                    tax-deductible.
                                </p>
                            </div>
                        </div>

                        {/* Right — Impact callouts */}
                        <div className="lg:col-span-2 flex flex-col gap-5">
                            <h2
                                data-impact-card
                                className="text-2xl font-bold text-[var(--color-charcoal)] mb-2"
                                style={{
                                    fontFamily: "var(--font-heading)",
                                }}
                            >
                                Your impact{" "}
                                <span className="font-drama text-[var(--color-clay)]">
                                    matters.
                                </span>
                            </h2>
                            {IMPACT_ITEMS.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.amount}
                                        data-impact-card
                                        className="card p-6 flex items-start gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-[var(--color-clay)]/10 flex items-center justify-center shrink-0">
                                            <Icon
                                                size={22}
                                                className="text-[var(--color-clay)]"
                                            />
                                        </div>
                                        <div>
                                            <p
                                                className="font-bold text-[var(--color-charcoal)] text-lg"
                                                style={{
                                                    fontFamily:
                                                        "var(--font-heading)",
                                                }}
                                            >
                                                {item.amount}
                                            </p>
                                            <p className="text-[var(--color-muted)] text-sm mt-0.5">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Trust badges */}
                            <div
                                data-impact-card
                                className="mt-4 p-5 rounded-2xl bg-[var(--color-moss)]/5 border border-[var(--color-moss)]/10"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <Heart
                                        size={18}
                                        className="text-[var(--color-moss)]"
                                    />
                                    <p
                                        className="text-sm font-semibold text-[var(--color-moss)]"
                                        style={{
                                            fontFamily: "var(--font-heading)",
                                        }}
                                    >
                                        Trusted by 600+ communities
                                    </p>
                                </div>
                                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                                    For over 30 years, CMRF has been mobilizing
                                    resources worldwide to deliver free medical
                                    care and humanitarian services across Ghana
                                    and Africa.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
