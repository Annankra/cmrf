"use client";

import { useState } from "react";
import { Calendar, Award, Stethoscope, Heart, Droplets, Users, ShieldCheck, ChevronRight } from "lucide-react";

interface Milestone {
    year: string;
    title: string;
    description: string;
    stat: string;
    statLabel: string;
    icon: any;
    location: string;
}

const MILESTONES: Milestone[] = [
    {
        year: "1995",
        title: "Foundation & First Mission",
        description: "CMRF was established by a dedicated group of Christian medical doctors to deliver free clinical care to underserved rural villages.",
        stat: "1,200+",
        statLabel: "Patients Treated",
        icon: Stethoscope,
        location: "Accra & Eastern Region",
    },
    {
        year: "2002",
        title: "Surgical & Mobile Dental Suites",
        description: "Launched mobile dental outreach clinics and expanded team capabilities to perform emergency outpatient surgical procedures.",
        stat: "15",
        statLabel: "Mobile Clinics",
        icon: ShieldCheck,
        location: "Ashanti & Volta Regions",
    },
    {
        year: "2010",
        title: "Northern Ghana Mission Protocol",
        description: "Established long-term rural outreach partnerships in Tamale and Sandema, deploying multi-disciplinary specialist healthcare teams.",
        stat: "12,000+",
        statLabel: "Lives Reached",
        icon: Heart,
        location: "Tamale & Upper East",
    },
    {
        year: "2018",
        title: "Clean Water & Preventative Medicine",
        description: "Integrated clean water borehole drilling alongside medical evangelism to eliminate waterborne diseases in 600+ communities.",
        stat: "600+",
        statLabel: "Communities Served",
        icon: Droplets,
        location: "Nationwide Ghana",
    },
    {
        year: "2025",
        title: "30 Years of Faithful Service",
        description: "Celebrating three decades of clinical excellence, leadership development, and proclaiming Christ's love through positive action.",
        stat: "50,000+",
        statLabel: "Cumulative Care",
        icon: Award,
        location: "Pan-African Network",
    },
];

export function Timeline30Years() {
    const [activeYear, setActiveYear] = useState<string>("2025");
    const activeMilestone = MILESTONES.find((m) => m.year === activeYear) || MILESTONES[4];

    return (
        <div className="bg-gradient-to-br from-white/[0.03] via-black/40 to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 sm:p-12 shadow-2xl space-y-10 relative overflow-hidden">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-clay)]/20 text-[var(--color-clay)] text-xs font-mono font-bold uppercase tracking-widest border border-[var(--color-clay)]/30">
                    <Calendar size={14} />
                    <span>30-Year Legacy Archive (1995 – 2025)</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                    Three Decades of <span className="font-drama text-[var(--color-clay)] italic">Healing & Faith.</span>
                </h2>
                <p className="text-white/60 text-base leading-relaxed font-light">
                    Scrub through 30 years of medical missions, community development, and healthcare evangelism across Ghana.
                </p>
            </div>

            {/* Interactive Year Selector Bar */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4 pt-2 border-b border-white/10 scrollbar-none">
                {MILESTONES.map((m) => {
                    const isActive = activeYear === m.year;
                    return (
                        <button
                            key={m.year}
                            type="button"
                            onClick={() => setActiveYear(m.year)}
                            className={`flex flex-col items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 shrink-0 font-mono ${
                                isActive
                                    ? "bg-[var(--color-clay)] text-white shadow-[0_0_25px_rgba(204,88,51,0.4)] scale-105"
                                    : "bg-white/[0.03] text-white/50 hover:text-white hover:bg-white/10"
                            }`}
                        >
                            <span className="text-xl sm:text-2xl font-black">{m.year}</span>
                            <span className="text-[10px] uppercase tracking-widest opacity-80">{m.title.split(" ")[0]}</span>
                        </button>
                    );
                })}
            </div>

            {/* Active Milestone Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/40 p-6 sm:p-10 rounded-[2rem] border border-white/5 relative">
                <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-clay)]">
                        <span className="px-3 py-1 rounded-full bg-[var(--color-clay)]/10 border border-[var(--color-clay)]/30 font-bold">
                            {activeMilestone.year} Milestone
                        </span>
                        <span>•</span>
                        <span className="text-white/60">{activeMilestone.location}</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                        {activeMilestone.title}
                    </h3>

                    <p className="text-white/70 text-base leading-relaxed font-light">
                        {activeMilestone.description}
                    </p>
                </div>

                {/* Big Stat Box */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-clay)]/20 text-[var(--color-clay)] flex items-center justify-center mx-auto mb-2">
                        <activeMilestone.icon size={24} />
                    </div>
                    <p className="text-4xl font-black text-white font-mono">{activeMilestone.stat}</p>
                    <p className="text-xs text-white/40 uppercase font-mono tracking-widest">{activeMilestone.statLabel}</p>
                </div>
            </div>
        </div>
    );
}
