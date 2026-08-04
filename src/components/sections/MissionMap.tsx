"use client";

import { useState } from "react";
import { MapPin, Calendar, Users, ArrowUpRight, CheckCircle2, ChevronRight, Stethoscope, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Zone {
    id: string;
    name: string;
    region: string;
    coordinates: { x: number; y: number }; // percentage on SVG container
    status: "Completed 2026" | "Upcoming 2026" | "Permanent Clinic";
    metrics: { patients: string; volunteers: string; services: string };
    date: string;
    partners: string[];
    image: string;
    description: string;
}

const ZONES: Zone[] = [
    {
        id: "tamale",
        name: "Tamale Outreach Hub",
        region: "Northern Region",
        coordinates: { x: 48, y: 32 },
        status: "Completed 2026",
        metrics: { patients: "1,913+", volunteers: "100+", services: "Medical, Eye & Dental" },
        date: "Jan 31 – Feb 7, 2026",
        partners: ["Lakepointe Church", "E3 Partners", "KBC Baptist"],
        image: "https://images.squarespace-cdn.com/content/v1/59a369a3914e6bc2a7485f18/1774633215751-KWXUP51XIGMUEQGMH67F/www.CMRFGH.COM_20260327_155750_0000.png",
        description: "Provided free primary consultations, 850 eye screenings, 477 pairs of glasses, and dental extractions across 5 communities.",
    },
    {
        id: "sandema",
        name: "Sandema Medical Deployment",
        region: "Upper East Region",
        coordinates: { x: 52, y: 16 },
        status: "Upcoming 2026",
        metrics: { patients: "2,000 Expected", volunteers: "75+", services: "Primary Healthcare & Surgery" },
        date: "March 2026",
        partners: ["Local Health Directorate", "CMRF Mobile Team"],
        image: "https://images.squarespace-cdn.com/content/v1/59a369a3914e6bc2a7485f18/1774633092062-5EJN19B2RX6XGD2H2N3K/photo_2026-03-27_14-48-54.jpg",
        description: "Mobile clinic deployment targeting high-priority surgical candidates and vision diagnostics in rural Upper East.",
    },
    {
        id: "ada-goi",
        name: "Ada Goi Medical Outreach",
        region: "Greater Accra Region (Coastal)",
        coordinates: { x: 68, y: 84 },
        status: "Upcoming 2026",
        metrics: { patients: "1,500 Target", volunteers: "60+", services: "Maternal Health & Water Safety" },
        date: "April 2026",
        partners: ["EZM Ministries", "CMRF Field Team"],
        image: "https://images.squarespace-cdn.com/content/v1/59a369a3914e6bc2a7485f18/1774543966734-QFZ2TV1BITWNYMGNRUDM/photo_2026-03-26_16-27-56.jpg",
        description: "Coastal outreach providing maternal screenings, water purification tablets, and mobile pharmacy care.",
    },
    {
        id: "accra-clinic",
        name: "Haatso Permanent Clinic & HQ",
        region: "Greater Accra",
        coordinates: { x: 62, y: 88 },
        status: "Permanent Clinic",
        metrics: { patients: "Year-Round", volunteers: "Resident Doctors", services: "Outpatient & Urgent Care" },
        date: "Operating 24/7",
        partners: ["CMRF Ghana Board", "CMMRF-USA"],
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80&auto=format",
        description: "CMRF's brick-and-mortar headquarters delivering non-stop free and subsidized clinical consultation, labs, and pharmacy.",
    },
];

export function MissionMap() {
    const [selectedZone, setSelectedZone] = useState<Zone>(ZONES[0]);

    return (
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="px-3.5 py-1 rounded-full bg-[var(--color-clay)]/20 text-[var(--color-clay)] text-xs font-mono font-bold uppercase tracking-widest border border-[var(--color-clay)]/30 inline-block mb-3">
                    Interactive Field Dossier
                </span>
                <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                    Ghana Mission <span className="font-drama text-[var(--color-clay)] italic">Deployments.</span>
                </h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed mt-3">
                    Explore active deployment hubs, rural mobile clinics, and our permanent health infrastructure across Ghana.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Interactive SVG Ghana Map Map Pin Container */}
                <div className="lg:col-span-7 relative w-full aspect-[4/5] sm:aspect-square max-h-[520px] mx-auto bg-black/40 border border-white/10 rounded-[2.5rem] overflow-hidden p-6 flex items-center justify-center">
                    {/* Ghana Styling Silhouette SVG */}
                    <svg viewBox="0 0 100 100" className="w-full h-full opacity-30 text-[var(--color-cream)] fill-current">
                        <path d="M 35 10 L 65 10 L 72 25 L 85 45 L 80 70 L 70 90 L 55 92 L 40 88 L 30 75 L 25 50 L 28 30 Z" className="stroke-white/20 stroke-1" />
                    </svg>

                    {/* Zone Pins */}
                    {ZONES.map((zone) => {
                        const isSelected = selectedZone.id === zone.id;
                        return (
                            <button
                                key={zone.id}
                                type="button"
                                onClick={() => setSelectedZone(zone)}
                                style={{ left: `${zone.coordinates.x}%`, top: `${zone.coordinates.y}%` }}
                                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer outline-none z-20"
                            >
                                <span className={`absolute -inset-3 rounded-full animate-ping ${
                                    zone.status === "Completed 2026"
                                        ? "bg-[var(--color-clay)]/40"
                                        : zone.status === "Upcoming 2026"
                                        ? "bg-amber-400/40"
                                        : "bg-emerald-400/40"
                                }`} />
                                <div className={`relative w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-xl ${
                                    isSelected
                                        ? "bg-[var(--color-clay)] border-white scale-125 z-30"
                                        : "bg-[#1A1A22] border-white/40 hover:scale-110"
                                }`}>
                                    <MapPin size={16} className="text-white" />
                                </div>
                                <span className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none">
                                    {zone.name}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Selected Zone Dossier Card */}
                <div className="lg:col-span-5 bg-black/60 border border-white/10 rounded-[2rem] p-6 sm:p-8 space-y-6 relative overflow-hidden backdrop-blur-xl">
                    <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-white/10">
                        <Image
                            src={selectedZone.image}
                            alt={selectedZone.name}
                            fill
                            unoptimized
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                            selectedZone.status === "Completed 2026"
                                ? "bg-[var(--color-clay)]/20 text-[var(--color-clay)] border-[var(--color-clay)]/40"
                                : selectedZone.status === "Upcoming 2026"
                                ? "bg-amber-400/20 text-amber-400 border-amber-400/40"
                                : "bg-emerald-400/20 text-emerald-400 border-emerald-400/40"
                        }`}>
                            {selectedZone.status}
                        </span>
                    </div>

                    <div>
                        <span className="text-xs text-[var(--color-clay)] font-mono uppercase tracking-widest font-semibold block mb-1">
                            {selectedZone.region} · {selectedZone.date}
                        </span>
                        <h4 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                            {selectedZone.name}
                        </h4>
                        <p className="text-white/70 text-sm leading-relaxed mt-2 font-light">
                            {selectedZone.description}
                        </p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                            <span className="text-[10px] text-white/40 uppercase font-mono block">Impact Reach</span>
                            <span className="text-base font-bold text-white font-mono">{selectedZone.metrics.patients}</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                            <span className="text-[10px] text-white/40 uppercase font-mono block">Key Services</span>
                            <span className="text-xs font-bold text-white font-mono truncate block">{selectedZone.metrics.services}</span>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs text-white/50 font-mono">Partners: {selectedZone.partners.join(", ")}</span>
                        <Link href="/events" className="text-xs font-bold text-[var(--color-clay)] hover:underline inline-flex items-center gap-1">
                            <span>Deployments</span>
                            <ChevronRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
