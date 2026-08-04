"use client";

import { useState } from "react";
import { UserCheck, Stethoscope, HeartHandshake, Compass, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface MatchResult {
    roleTitle: string;
    deployment: string;
    location: string;
    date: string;
    matchScore: string;
    recommendation: string;
}

export function VolunteerMatcher() {
    const [step, setStep] = useState(1);
    const [profession, setProfession] = useState<string>("");
    const [commitment, setCommitment] = useState<string>("");
    const [focus, setFocus] = useState<string>("");
    const [result, setResult] = useState<MatchResult | null>(null);

    const handleCalculateMatch = () => {
        let title = "General Outreach Volunteer & Logistics";
        let deployment = "Tamale Regional Outreach 2026";
        let location = "Northern Ghana";
        let date = "July 2026";
        let score = "98%";
        let rec = "You are a perfect fit for field logistics, patient triage, and community engagement teams.";

        if (profession === "doctor" || profession === "nurse") {
            title = "Clinical Consultation & Triage Lead";
            deployment = "Sandema Surgical & Primary Care Outreach";
            location = "Upper East Region";
            date = "March 2026";
            score = "100%";
            rec = "Direct patient clinical examination, prescribing medications, and leading vital sign screenings.";
        } else if (profession === "dentist" || profession === "optometrist") {
            title = "Specialist Dental & Vision Care Provider";
            deployment = "Dansoman Specialised Care Outreach";
            location = "Accra Metro Zone";
            date = "September 2026";
            score = "99%";
            rec = "Perform specialist dental extractions, vision testing, and custom prescription glass fitting.";
        } else if (profession === "chaplain") {
            title = "Spiritual Care & Pastoral Counselor";
            deployment = "Ada Goi Coastal Mission";
            location = "Greater Accra Region";
            date = "April 2026";
            score = "97%";
            rec = "Provide one-on-one pastoral counseling, prayer support, and spiritual discipleship.";
        }

        setResult({
            roleTitle: title,
            deployment: deployment,
            location: location,
            date: date,
            matchScore: score,
            recommendation: rec,
        });
        setStep(4);
    };

    const resetWizard = () => {
        setStep(1);
        setProfession("");
        setCommitment("");
        setFocus("");
        setResult(null);
    };

    return (
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="px-3.5 py-1 rounded-full bg-[var(--color-clay)]/20 text-[var(--color-clay)] text-xs font-mono font-bold uppercase tracking-widest border border-[var(--color-clay)]/30 inline-block mb-3">
                    Smart Deployment Wizard
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                    Find Your Ideal <span className="font-drama text-[var(--color-clay)] italic">Mission Role.</span>
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mt-2">
                    Answer 3 quick questions to get matched with an upcoming medical deployment tailored to your skills.
                </p>
            </div>

            {/* Step Progress Bar */}
            <div className="max-w-xl mx-auto mb-10 flex items-center justify-between text-xs font-mono">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                            step === s
                                ? "bg-[var(--color-clay)] text-white shadow-[0_0_15px_rgba(204,88,51,0.4)]"
                                : step > s
                                ? "bg-emerald-500 text-white"
                                : "bg-white/10 text-white/40"
                        }`}>
                            {step > s ? <CheckCircle2 size={16} /> : s}
                        </div>
                        <span className="hidden sm:inline text-white/60">
                            {s === 1 ? "Background" : s === 2 ? "Availability" : "Focus"}
                        </span>
                    </div>
                ))}
            </div>

            {/* Wizard Steps */}
            <div className="max-w-2xl mx-auto">
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <h4 className="text-xl font-bold text-white text-center" style={{ fontFamily: "var(--font-heading)" }}>
                            1. What is your background or professional field?
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { id: "doctor", label: "Medical Doctor / Surgeon", icon: Stethoscope },
                                { id: "nurse", label: "Nurse / Clinical Officer", icon: UserCheck },
                                { id: "dentist", label: "Dentist / Optometrist", icon: Sparkles },
                                { id: "chaplain", label: "Pastor / Pastoral Counselor", icon: HeartHandshake },
                                { id: "general", label: "Student / General Volunteer", icon: Compass },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                        setProfession(item.id);
                                        setStep(2);
                                    }}
                                    className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                                        profession === item.id
                                            ? "bg-[var(--color-clay)]/20 border-[var(--color-clay)] text-white"
                                            : "bg-black/40 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    <item.icon size={20} className="text-[var(--color-clay)] shrink-0" />
                                    <span className="text-sm font-semibold">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <h4 className="text-xl font-bold text-white text-center" style={{ fontFamily: "var(--font-heading)" }}>
                            2. What is your deployment availability?
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { id: "1week", label: "1-Week Field Deployment" },
                                { id: "recurring", label: "Monthly Weekend Missions" },
                                { id: "permanent", label: "Resident HQ Volunteer" },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                        setCommitment(item.id);
                                        setStep(3);
                                    }}
                                    className="p-5 rounded-2xl border bg-black/40 border-white/10 text-white/70 hover:bg-white/10 hover:text-white text-center text-sm font-semibold transition-all"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <div className="text-center pt-2">
                            <button type="button" onClick={() => setStep(1)} className="text-xs text-white/40 hover:text-white font-mono">
                                ← Back to Step 1
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <h4 className="text-xl font-bold text-white text-center" style={{ fontFamily: "var(--font-heading)" }}>
                            3. What is your primary impact priority?
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { id: "clinical", label: "Direct Patient Clinical Care" },
                                { id: "surgery", label: "Specialty Surgical Procedures" },
                                { id: "evangelism", label: "Spiritual Counseling & Prayer" },
                                { id: "logistics", label: "Mobile Clinic Field Logistics" },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                        setFocus(item.id);
                                        handleCalculateMatch();
                                    }}
                                    className="p-4 rounded-2xl border bg-black/40 border-white/10 text-white/70 hover:bg-white/10 hover:text-white text-left text-sm font-semibold transition-all"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <div className="text-center pt-2">
                            <button type="button" onClick={() => setStep(2)} className="text-xs text-white/40 hover:text-white font-mono">
                                ← Back to Step 2
                            </button>
                        </div>
                    </div>
                )}

                {step === 4 && result && (
                    <div className="bg-black/60 border border-[var(--color-clay)]/40 rounded-[2rem] p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-500 text-left">
                        <div className="flex items-center justify-between">
                            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase border border-emerald-500/30">
                                Match Score: {result.matchScore}
                            </span>
                            <button type="button" onClick={resetWizard} className="text-xs font-mono text-white/40 hover:text-white">
                                Retake Quiz
                            </button>
                        </div>

                        <div>
                            <span className="text-xs font-mono text-[var(--color-clay)] uppercase tracking-wider block mb-1">
                                Recommended Deployment: {result.deployment} ({result.date})
                            </span>
                            <h4 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                                {result.roleTitle}
                            </h4>
                            <p className="text-white/70 text-sm leading-relaxed mt-2 font-light">
                                {result.recommendation}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <span className="text-xs font-mono text-white/50">Location: {result.location}</span>
                            <Link
                                href="/get-involved#volunteer-form"
                                className="btn btn-primary py-3 px-6 text-xs font-mono font-bold uppercase tracking-wider w-full sm:w-auto text-center"
                            >
                                <span>Apply For This Deployment</span>
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
