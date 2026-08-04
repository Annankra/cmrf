"use client";

import { useState, useId } from "react";
import { Heart, Stethoscope, Eye, Glasses, Users, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ImpactMetric {
    amount: number;
    title: string;
    description: string;
    details: Array<{ icon: any; text: string }>;
}

const IMPACT_TIERS: ImpactMetric[] = [
    {
        amount: 25,
        title: "Primary Health Screening",
        description: "Provides full triage, blood pressure/glucose screening, and basic consultation for one patient.",
        details: [
            { icon: Stethoscope, text: "1 Comprehensive Medical Consult" },
            { icon: ShieldCheck, text: "Vital Signs & Blood Sugar Screening" },
        ],
    },
    {
        amount: 50,
        title: "Vision Care & Eyeglasses",
        description: "Restores sight by providing optical exams, diagnostic eye drops, and custom corrective prescription glasses.",
        details: [
            { icon: Eye, text: "2 Specialized Optometry Screenings" },
            { icon: Glasses, text: "1 Pair of Custom Prescription Eyeglasses" },
        ],
    },
    {
        amount: 100,
        title: "Emergency Dental & Pharmacy",
        description: "Covers emergency tooth extractions, oral surgery supplies, and a 30-day supply of essential antibiotics & pain relief.",
        details: [
            { icon: Stethoscope, text: "2 Emergency Dental Extractions" },
            { icon: Sparkles, text: "Complete Prescription Pharmacy Pack" },
        ],
    },
    {
        amount: 250,
        title: "Mobile Clinic Day Deployment",
        description: "Sponsors essential logistics, clean water, diagnostic equipment, and triage setup for a full day in a rural community.",
        details: [
            { icon: Users, text: "Healthcare Access for 50+ Villagers" },
            { icon: ShieldCheck, text: "Field Logistics & Mobile Clinic Power" },
        ],
    },
    {
        amount: 500,
        title: "Surgeon & Specialty Care Sponsor",
        description: "Equips surgical suites with sterile kits, sutures, local anesthetics, and post-operative recovery kits.",
        details: [
            { icon: Stethoscope, text: "Surgical Supplies for 5 Outpatient Operations" },
            { icon: Sparkles, text: "Post-Op Recovery & Antibiotic Packs" },
        ],
    },
    {
        amount: 1000,
        title: "Community Outreach Champion",
        description: "Fully funds medical consultation, eye clinic, pharmacy, and evangelistic outreach for an entire rural village cohort.",
        details: [
            { icon: Users, text: "Comprehensive Care for 200+ Individuals" },
            { icon: Heart, text: "Spiritual Care & Pastoral Counseling Teams" },
        ],
    },
];

export function ImpactCalculator() {
    const [sliderVal, setSliderVal] = useState<number>(100);
    const sliderId = useId();

    // Find active tier based on slider value
    const activeTier = IMPACT_TIERS.reduce((prev, curr) => {
        return sliderVal >= curr.amount ? curr : prev;
    }, IMPACT_TIERS[0]);

    // Calculate dynamic multipliers for non-exact values
    const patientsReached = Math.max(1, Math.floor(sliderVal / 25));
    const glassesProvided = Math.max(0, Math.floor(sliderVal / 50));
    const surgeriesSupported = Math.max(0, Math.floor(sliderVal / 200));

    return (
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[var(--color-clay)]/10 blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                <div>
                    <div className="flex items-center gap-2 text-[var(--color-clay)] text-xs font-mono uppercase tracking-widest font-bold mb-2">
                        <Sparkles size={14} />
                        <span>Dynamic Impact Calculator</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        See Your Real-World Impact
                    </h3>
                </div>

                {/* Amount Badge */}
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[var(--color-clay)]/20 border border-[var(--color-clay)]/40 text-[var(--color-clay)] self-start sm:self-auto">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Gift Amount:</span>
                    <span className="text-2xl font-black font-mono text-white">${sliderVal}</span>
                </div>
            </div>

            {/* Interactive Slider */}
            <div className="space-y-4 mb-10">
                <div className="flex items-center justify-between text-xs font-mono text-white/50">
                    <label htmlFor={sliderId}>Select or drag amount</label>
                    <span>$25 — $1,000</span>
                </div>

                <input
                    id={sliderId}
                    type="range"
                    min="25"
                    max="1000"
                    step="25"
                    value={sliderVal}
                    onChange={(e) => setSliderVal(Number(e.target.value))}
                    className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--color-clay)] transition-all"
                />

                {/* Quick Preset Buttons */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
                    {[25, 50, 100, 250, 500, 1000].map((amt) => (
                        <button
                            key={amt}
                            type="button"
                            onClick={() => setSliderVal(amt)}
                            className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
                                sliderVal === amt
                                    ? "bg-[var(--color-clay)] text-white shadow-[0_0_15px_rgba(204,88,51,0.4)] scale-105"
                                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            ${amt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dynamic Outcome Display Card */}
            <div className="bg-black/40 border border-white/10 rounded-[2.5rem] p-6 sm:p-8 space-y-6 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                        <span className="px-3.5 py-1 rounded-full bg-[var(--color-clay)]/20 text-[var(--color-clay)] text-[10px] font-mono font-bold uppercase tracking-widest border border-[var(--color-clay)]/30 inline-block mb-3">
                            Direct Outcome Tier
                        </span>
                        <h4 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                            {activeTier.title}
                        </h4>
                        <p className="text-white/70 text-sm leading-relaxed mt-2 max-w-xl">
                            {activeTier.description}
                        </p>
                    </div>

                    <Link
                        href={`/donate?amount=${sliderVal}`}
                        className="btn btn-primary py-3.5 px-6 shrink-0 self-start sm:self-auto text-xs font-bold font-mono uppercase tracking-wider"
                    >
                        <span>Donate ${sliderVal} Now</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Metrics Breakdown Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-2xl font-black text-[var(--color-clay)] font-mono block mb-1">
                            {patientsReached}+
                        </span>
                        <span className="text-xs text-white/60 font-medium">Patients Screened & Treated</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-2xl font-black text-amber-400 font-mono block mb-1">
                            {glassesProvided}
                        </span>
                        <span className="text-xs text-white/60 font-medium">Corrective Glasses Provided</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-2xl font-black text-emerald-400 font-mono block mb-1">
                            {surgeriesSupported > 0 ? `${surgeriesSupported}` : "100%"}
                        </span>
                        <span className="text-xs text-white/60 font-medium">
                            {surgeriesSupported > 0 ? "Surgeries Funded" : "Free Care Guarantee"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
