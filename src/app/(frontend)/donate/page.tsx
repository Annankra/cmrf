"use client";

import { useState, useRef, useEffect } from "react";
import { Heart, Stethoscope, Droplets, Globe, Smartphone, Landmark } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DonorboxEmbed } from "@/components/donate/DonorboxEmbed";
import { DirectTransferInfo } from "@/components/donate/DirectTransferInfo";
import dynamic from 'next/dynamic';

const PaystackForm = dynamic(() => import('@/components/donate/PaystackForm').then(mod => mod.PaystackForm), { ssr: false });

// ---------------------------------------------------------------------------
// Constants & Initialization
// ---------------------------------------------------------------------------
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Replaced old utility components.


// ---------------------------------------------------------------------------
// Page Main
// ---------------------------------------------------------------------------
export default function DonatePage() {
    const [activeTab, setActiveTab] = useState<'international' | 'local' | 'direct'>('international');
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

    return (
        <div ref={pageRef} className="bg-transparent min-h-screen">
            {/* ─── Hero Section ─── */}
            <section className="relative h-[80dvh] min-h-[500px] md:h-dvh md:min-h-[600px] flex flex-col justify-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center lg:bg-fixed scale-110"
                    style={{
                        backgroundImage: `url('/childerndoctor.jpg')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal)]/80 via-[var(--color-charcoal)]/20 to-transparent" />
                <div className="absolute inset-0 z-12 bg-[radial-gradient(circle,transparent_10%,var(--color-charcoal)_150%)] md:bg-[radial-gradient(circle,transparent_20%,var(--color-charcoal)_150%)] pointer-events-none" />

                <div className="relative z-20 container-main px-4 sm:px-6 md:px-12 pt-32 pb-12 md:pb-24">
                    <div className="max-w-4xl">
                        <p
                            data-animate-up
                            className="text-[var(--color-clay)] text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 md:mb-6 font-bold font-mono"
                        >
                            Impact Protocol — 002
                        </p>
                        <h1
                            data-animate-up
                            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-white leading-[0.9] md:leading-[0.85] tracking-tight mb-6 md:mb-8"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Heal the <br />
                            <span className="font-drama text-[var(--color-clay)]">Future.</span>
                        </h1>
                        <p
                            data-animate-up
                            className="text-[var(--color-cream)]/70 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed font-medium"
                        >
                            Mobilizing medical professionals and resources to deliver high-fidelity care to 600+ communities across Africa for 30 years.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── Donation Interaction ─── */}
            <section className="section py-16 md:py-32">
                <div className="container-main px-4 sm:px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                        {/* Left — Visual Manifesto */}
                        <div className="lg:col-span-5 flex flex-col gap-8 md:gap-12">
                            <div data-animate-up>
                                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 md:mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                                    Your donation is <br className="hidden sm:block" />
                                    <span className="font-drama text-[var(--color-clay)] text-4xl sm:text-5xl">transformational.</span>
                                </h2>
                                <p className="text-white/60 text-base sm:text-lg leading-relaxed font-light">
                                    CMRF is a 501(c)(3) boutique medical NGO. We focus on clinical precision and sustainable community health infrastructures, not just relief.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                {[
                                    { icon: Stethoscope, label: "Clinical Excellence", val: "30+ Years" },
                                    { icon: Droplets, label: "Clean Water", val: "600+ Communities" },
                                    { icon: Heart, label: "Success Rate", val: "99.8% Recovery" },
                                ].map((stat, i) => (
                                    <div key={i} data-animate-up className="flex items-center gap-4 p-5 md:p-6 bg-black/40 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 backdrop-blur-md hover:-translate-y-1 hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500">
                                        <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl md:rounded-2xl bg-[var(--color-clay)]/10 flex items-center justify-center text-[var(--color-clay)]">
                                            <stat.icon size={20} className="md:w-6 md:h-6" />
                                        </div>
                                        <div>
                                            <p className="text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-widest">{stat.label}</p>
                                            <p className="text-lg md:text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{stat.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — The Instrument (Tabs & Forms) */}
                        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8" data-animate-scale>
                            
                            {/* Tab Selectors */}
                            <div 
                                role="tablist" 
                                aria-label="Donation Methods"
                                className="flex flex-col sm:flex-row bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-full p-2 gap-2 shadow-2xl"
                            >
                                {[
                                    { id: 'international', label: 'International (USD)', icon: Globe },
                                    { id: 'local', label: 'Ghana (GHS)', icon: Smartphone },
                                    { id: 'direct', label: 'Direct Transfer', icon: Landmark }
                                ].map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            role="tab"
                                            aria-selected={isActive}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`flex-1 flex outline-none focus:outline-none items-center justify-start sm:justify-center gap-3 py-4 px-6 sm:px-8 rounded-xl sm:rounded-full font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 font-mono whitespace-nowrap min-h-[48px] ${
                                                isActive
                                                    ? 'bg-[var(--color-clay)] text-white shadow-[0_0_20px_rgba(204,88,51,0.3)]'
                                                    : 'text-white/40 hover:text-white/90 hover:bg-white/[0.05] hover:scale-[1.02]'
                                            }`}
                                        >
                                            <Icon size={18} className="shrink-0" />
                                            <span className="text-left">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Active Content */}
                            <div className="relative">
                                {activeTab === 'international' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                                        <DonorboxEmbed />
                                    </div>
                                )}
                                
                                {activeTab === 'local' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                                        <PaystackForm />
                                    </div>
                                )}
                                
                                {activeTab === 'direct' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                                        <DirectTransferInfo />
                                    </div>
                                )}
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
