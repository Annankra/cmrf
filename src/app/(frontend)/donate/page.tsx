"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
    Heart,
    Stethoscope,
    Droplets,
    GraduationCap,
    ArrowRight,
    Loader2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ---------------------------------------------------------------------------
// Constants & Initialization
// ---------------------------------------------------------------------------
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const PRESET_AMOUNTS = [
    { cents: 2500, label: "$25", impact: "provides a full medical screening for one community member." },
    { cents: 5000, label: "$50", impact: "funds essential medications for 5 patients in remote areas." },
    { cents: 10000, label: "$100", impact: "secures clean water access for an entire village for one month." },
    { cents: 25000, label: "$250", impact: "sponsors an undergraduate medical student for a full semester." },
    { cents: 50000, label: "$500", impact: "supports a complete surgical outreach for a community of 50+ people." },
];

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function MagneticSelection({
    amount,
    isSelected,
    onClick,
}: {
    amount: { cents: number; label: string };
    isSelected: boolean;
    onClick: () => void;
}) {
    const ref = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(ref.current, {
            x: x * 0.4,
            y: y * 0.4,
            scale: 1.05,
            duration: 0.6,
            ease: "power3.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(ref.current, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
        });
    };

    return (
        <button
            ref={ref}
            type="button"
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative group overflow-hidden py-6 rounded-[1.5rem] border transition-all duration-500 cursor-pointer ${isSelected
                    ? "bg-[var(--color-clay)] border-[var(--color-clay)] shadow-2xl shadow-[var(--color-clay)]/20 text-white"
                    : "bg-[var(--color-cream-dark)]/10 border-[var(--color-moss)]/10 text-[var(--color-charcoal)] hover:border-[var(--color-clay)]/40"
                }`}
        >
            <span
                className={`absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out`}
            />
            <span className="relative z-10 font-bold text-lg md:text-xl" style={{ fontFamily: "var(--font-heading)" }}>
                {amount.label}
            </span>
        </button>
    );
}

function ImpactLiveFeed({ text }: { text: string }) {
    const [displayed, setDisplayed] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setDisplayed("");
        setIndex(0);
    }, [text]);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayed((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, 30);
            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    return (
        <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-[var(--color-clay)] mt-4 min-h-[1.5rem]">
            <span className="shrink-0 w-2 h-2 rounded-full bg-[var(--color-clay)] animate-pulse" />
            <span className="uppercase tracking-widest font-bold shrink-0">Impact Level:</span>
            <span className="italic opacity-80">{displayed}</span>
            <span className="w-[2px] h-3 bg-[var(--color-clay)] animate-cursor" />
        </div>
    );
}

// ---------------------------------------------------------------------------
// Page Main
// ---------------------------------------------------------------------------
export default function DonatePage() {
    const [selectedCents, setSelectedCents] = useState<number>(10000); // Default $100
    const [customAmount, setCustomAmount] = useState("");
    const [donorName, setDonorName] = useState("");
    const [donorEmail, setDonorEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const pageRef = useRef<HTMLDivElement>(null);

    // Entrance Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from("[data-animate-up]", {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2,
            });

            gsap.from("[data-animate-scale]", {
                scale: 0.95,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out",
                delay: 0.5,
            });
        }, pageRef);
        return () => ctx.revert();
    }, []);

    const effectiveCents = customAmount
        ? Math.round(parseFloat(customAmount) * 100)
        : selectedCents;

    const currentImpact = customAmount
        ? `helps fund general medical missions and essential community resources.`
        : PRESET_AMOUNTS.find(a => a.cents === selectedCents)?.impact || "";

    const handleSubmit = async () => {
        setError("");
        if (!effectiveCents || effectiveCents < 100) {
            setError("Min donation is $1.00");
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
                setError(data.error || "Transaction failed. Please try again.");
                setLoading(false);
                return;
            }
            window.location.href = data.url;
        } catch {
            setError("Network error. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div ref={pageRef} className="bg-[var(--color-cream)] min-h-screen">
            {/* ─── Hero Section ─── */}
            <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center lg:bg-fixed scale-110"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1444676632488-26a136c45b9b?w=1920&q=80&auto=format')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/40 to-transparent" />
                <div className="absolute inset-0 z-12 bg-[radial-gradient(circle,transparent_20%,var(--color-charcoal)_150%)] pointer-events-none" />

                <div className="relative z-20 container-main px-6 md:px-12 pb-16 md:pb-24">
                    <div className="max-w-4xl">
                        <p
                            data-animate-up
                            className="text-[var(--color-clay)] text-[10px] md:text-sm uppercase tracking-[0.4em] mb-6 font-bold font-mono"
                        >
                            Impact Protocol — 002
                        </p>
                        <h1
                            data-animate-up
                            className="text-5xl md:text-7xl lg:text-9xl font-bold text-white leading-[0.85] tracking-tight mb-8"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Heal the <br />
                            <span className="font-drama text-[var(--color-clay)]">Future.</span>
                        </h1>
                        <p
                            data-animate-up
                            className="text-[var(--color-cream)]/70 max-w-xl text-lg md:text-xl leading-relaxed font-medium"
                        >
                            Mobilizing medical professionals and resources to deliver high-fidelity care to 600+ communities across Africa for 30 years.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── Donation Interaction ─── */}
            <section className="section py-20 md:py-32">
                <div className="container-main px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                        {/* Left — Visual Manifesto */}
                        <div className="lg:col-span-5 flex flex-col gap-12">
                            <div data-animate-up>
                                <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                                    Your donation is <br />
                                    <span className="font-drama text-[var(--color-clay)] text-4xl md:text-5xl">transformational.</span>
                                </h2>
                                <p className="text-[var(--color-muted)] text-lg leading-relaxed">
                                    CMRF is a 501(c)(3) boutique medical NGO. We focus on clinical precision and sustainable community health infrastructures, not just relief.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { icon: Stethoscope, label: "Clinical Excellence", val: "30+ Years" },
                                    { icon: Droplets, label: "Clean Water", val: "600+ Communities" },
                                    { icon: Heart, label: "Success Rate", val: "99.8% Recovery" },
                                ].map((stat, i) => (
                                    <div key={i} data-animate-up className="flex items-center gap-4 p-6 bg-white rounded-[2rem] border border-[var(--color-moss)]/5 shadow-sm">
                                        <div className="w-12 h-12 rounded-2xl bg-[var(--color-clay)]/10 flex items-center justify-center text-[var(--color-clay)]">
                                            <stat.icon size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[var(--color-muted)] text-xs font-mono uppercase tracking-widest">{stat.label}</p>
                                            <p className="text-xl font-bold text-[var(--color-charcoal)]" style={{ fontFamily: "var(--font-heading)" }}>{stat.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — The Instrument (Form) */}
                        <div className="lg:col-span-7" data-animate-scale>
                            <div className="bg-white rounded-[3rem] p-8 md:p-14 border border-[var(--color-moss)]/10 shadow-2xl shadow-[var(--color-moss)]/5">

                                <div className="mb-10">
                                    <h3 className="text-lg font-bold text-[var(--color-charcoal)] mb-6 uppercase tracking-widest font-mono text-center">
                                        Select Strategy
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                        {PRESET_AMOUNTS.map((amt) => (
                                            <MagneticSelection
                                                key={amt.cents}
                                                amount={amt}
                                                isSelected={selectedCents === amt.cents && !customAmount}
                                                onClick={() => {
                                                    setSelectedCents(amt.cents);
                                                    setCustomAmount("");
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <ImpactLiveFeed text={currentImpact} />
                                </div>

                                {/* Custom Input */}
                                <div className="mb-10 relative group">
                                    <label className="block text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-widest mb-3 font-mono">
                                        Custom Allocation (USD)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-[var(--color-clay)]">$</span>
                                        <input
                                            type="number"
                                            value={customAmount}
                                            onChange={(e) => {
                                                setCustomAmount(e.target.value);
                                                setSelectedCents(0);
                                            }}
                                            placeholder="Enter amount..."
                                            className="w-full bg-[var(--color-cream-dark)]/10 border-2 border-transparent focus:border-[var(--color-clay)]/20 rounded-[2rem] py-6 px-12 text-3xl font-bold text-[var(--color-charcoal)] transition-all outline-none"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        />
                                    </div>
                                </div>

                                {/* Data Input */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                    {[
                                        { id: "name", label: "Donor Identity", val: donorName, set: setDonorName, type: "text", ph: "Full Name" },
                                        { id: "email", label: "Communication Channel", val: donorEmail, set: setDonorEmail, type: "email", ph: "your@email.com" },
                                    ].map((field) => (
                                        <div key={field.id}>
                                            <label className="block text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-widest mb-3 font-mono">
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type}
                                                value={field.val}
                                                onChange={(e) => field.set(e.target.value)}
                                                placeholder={field.ph}
                                                className="w-full bg-[var(--color-cream-dark)]/10 border border-transparent focus:border-[var(--color-moss)]/20 rounded-[1.5rem] py-4 px-6 text-[var(--color-charcoal)] transition-all outline-none font-medium"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 rounded-2xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                                        {error}
                                    </div>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="btn btn-primary w-full py-8 text-xl font-bold shadow-xl shadow-[var(--color-clay)]/20 disabled:opacity-50"
                                >
                                    <span className="btn-text flex items-center justify-center gap-4">
                                        {loading ? (
                                            <Loader2 size={24} className="animate-spin" />
                                        ) : (
                                            <>
                                                Initialize Support Protocol
                                                <ArrowRight size={24} />
                                            </>
                                        )}
                                    </span>
                                </button>

                                <div className="mt-8 flex items-center justify-center gap-8 border-t border-[var(--color-moss)]/5 pt-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-tighter">Encrypted-SSL</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Heart size={12} className="text-[var(--color-clay)]" />
                                        <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-tighter">501(c)(3) Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ─── Footer Spacer ─── */}
            <div className="h-20" />
        </div>
    );
}
