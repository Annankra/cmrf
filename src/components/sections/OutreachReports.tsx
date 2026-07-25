"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowUpRight, Calendar, FileText, BarChart3, X, CheckCircle2, HeartHandshake } from "lucide-react";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

interface MetricItem {
    label: string;
    value: string;
}

interface ReportCard {
    id: number;
    title: string;
    label: string;
    description: string;
    fullNarrative: string;
    date: string;
    imageUrl: string;
    badge: string;
    badgeColor: string;
    icon: React.ReactNode;
    metrics?: MetricItem[];
    highlights?: string[];
    partners?: string[];
}

const CARDS_DATA: ReportCard[] = [
    {
        id: 1,
        title: "CMRF Tamale 2026 Medical Outreach Report",
        label: "Tamale 2026 Outreach Impact",
        description: "CMRF and partners delivered medical and evangelistic services across five communities in Tamale, reaching over 1,900 people with healthcare and sharing hope through the Gospel.",
        fullNarrative: "CMRF and partner organizations executed a multi-community medical and evangelistic outreach across five underserved communities in Tamale from January 31 to February 7, 2026. The outreach provided comprehensive primary healthcare, vision care, dental procedures, and essential medications completely free of charge to over 1,900 individuals. Simultaneously, volunteer chaplains provided spiritual counseling and prayer support.",
        date: "February 19, 2026",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/59a369a3914e6bc2a7485f18/1774633215751-KWXUP51XIGMUEQGMH67F/www.CMRFGH.COM_20260327_155750_0000.png",
        badge: "Impact Report",
        badgeColor: "text-[#CC5833] border-[#CC5833]/30 bg-[#CC5833]/10",
        icon: <BarChart3 className="w-3.5 h-3.5 text-[#CC5833]" />,
        metrics: [
            { label: "Medical Consultations", value: "1,913" },
            { label: "Drugs Dispensed", value: "1,913" },
            { label: "Eye Clinic Patients", value: "850" },
            { label: "Eye Drops Dispensed", value: "511" },
            { label: "Eyeglasses Provided", value: "477" },
            { label: "Dental Beneficiaries", value: "269" },
            { label: "Active Volunteers", value: "100+" },
            { label: "Holy Spirit Baptisms", value: "60" }
        ],
        partners: ["CMRF", "Lakepointe Church", "E3 Partners", "Koinonia Baptist Church", "Shalom Baptist Church", "Christ Apostolic Church", "B-Fresh Mineral Water"]
    },
    {
        id: 2,
        title: "2026 Tamale Medical Outreach (31st Jan - 7th Feb 2026)",
        label: "Tamale Medical Outreach 2026",
        description: "CMRF, in partnership with leading churches and organisations, will host a major medical evangelistic outreach in Tamale from 31 January to 7 February 2026. The mission aims to provide free healthcare services to over 2,500 people, alongside eye and dental care, while sharing the message of hope with the community.",
        fullNarrative: "The 2026 Tamale Medical Outreach represents one of CMRF's largest annual deployments. In collaboration with local churches and international mission partners, our team established mobile clinics across key locations in Tamale. Services included general medical checkups, vital sign screenings, vision testing, dental extractions, and pharmacy services.",
        date: "January 19, 2026",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/59a369a3914e6bc2a7485f18/1774633092062-5EJN19B2RX6XGD2H2N3K/photo_2026-03-27_14-48-54.jpg",
        badge: "Deployment Details",
        badgeColor: "text-[#3B5247] border-[#3B5247]/30 bg-[#3B5247]/10",
        icon: <FileText className="w-3.5 h-3.5 text-[#3B5247]" />,
        highlights: [
            "Free Dental Care & Extractions",
            "Free Eye Screenings & Eyeglasses",
            "Free General Consultations & Vital Check-ups",
            "Free Prescription Medication & Pharmacy",
            "Free Pastoral Counseling & Prayer Sessions"
        ],
        partners: ["E3 Partners", "Koinonia Baptist Church (KBC)", "Shalom Baptist Church (SBC)", "Christ Apostolic Church (CAC)"]
    },
    {
        id: 3,
        title: "CMRF 2026 Medical Missions Calendar",
        label: "CMRF 2026 Missions at a Glance",
        description: "In 2026, the Christian Missions Resource Foundation (CMRF) is committed to reaching marginalized and underserved communities across Ghana with life-saving healthcare and the message of hope. Through our medical outreaches, we aim to support over 12,000 people with free medical treatment, dental care, and eye care.",
        fullNarrative: "The CMRF 2026 Missions Calendar establishes an ambitious annual roadmap to deliver life-saving healthcare and spiritual hope to 12,000+ underserved individuals across 7 major regions in Ghana. Outreaches combine mobile clinics, dental units, and eye care teams working alongside local churches.",
        date: "January 19, 2026",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/59a369a3914e6bc2a7485f18/1774543966734-QFZ2TV1BITWNYMGNRUDM/photo_2026-03-26_16-27-56.jpg",
        badge: "Yearly Schedule",
        badgeColor: "text-amber-400 border-amber-400/30 bg-amber-400/10",
        icon: <Calendar className="w-3.5 h-3.5 text-amber-400" />,
        metrics: [
            { label: "February 2026", value: "Tamale (KBC) Medical Outreach" },
            { label: "March 2026", value: "Sandema Medical Outreach" },
            { label: "April 2026", value: "Ada Goi (EZM) Medical Outreach" },
            { label: "July 2026", value: "Tamale (TBC / E3) Medical Outreach" },
            { label: "September 2026", value: "Dansoman Dental Outreach" },
            { label: "October 2026", value: "Nanumba South Medical Outreach" },
            { label: "December 2026", value: "Haatso Medical Outreach" }
        ]
    }
];

export function OutreachReports() {
    const [selectedCard, setSelectedCard] = useState<ReportCard | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedCard) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedCard]);

    // Handle Esc key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedCard(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
        <section 
            className="section relative overflow-hidden bg-[#111115] text-[#FAF9F6] border-t border-b border-white/5 py-24 md:py-32"
        >
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(46,64,54,0.18),transparent_50%)] pointer-events-none" />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#CC5833]/5 blur-[120px] pointer-events-none" />
            
            <div className="container-main px-6 md:px-12 relative z-10">
                
                {/* Section Header */}
                <ScrollReveal animation="fade-up">
                    <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
                        <div className="section-divider mx-auto mb-6" />
                        <p 
                            className="text-[#CC5833] text-xs uppercase tracking-[0.25em] mb-4 font-bold font-mono"
                        >
                            Mission Archives
                        </p>
                        <h2 
                            className="text-3.5xl md:text-5.5xl font-bold text-white tracking-tight"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Recent reports &{" "}
                            <span className="font-drama text-[#CC5833] italic pr-2">
                                schedules.
                            </span>
                        </h2>
                    </div>
                </ScrollReveal>

                {/* 3-Column Perfectly Aligned Glassy Cards Grid */}
                <ScrollReveal animation="fade-up" stagger={0.15}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto items-stretch">
                        {CARDS_DATA.map((card) => (
                            <div 
                                key={card.id}
                                onClick={() => setSelectedCard(card)}
                                className="group flex flex-col bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-[2.5rem] p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative h-full cursor-pointer overflow-hidden backdrop-blur-xl"
                            >
                                {/* Decorative top highlight line */}
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                
                                {/* 1. Poster Image Container (Aspect 3/4 - Strict aspect ratio for 100% horizontal alignment) */}
                                <div className="relative w-full aspect-[3/4] flex-shrink-0 overflow-hidden rounded-[2rem] border border-white/5 mb-6 group-hover:border-white/10 transition-colors duration-500 bg-white/[0.01]">
                                    <Image
                                        src={card.imageUrl}
                                        alt={card.title}
                                        fill
                                        unoptimized
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                                        priority={card.id === 1}
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                                    
                                    {/* Action button reveal */}
                                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-lg">
                                        <ArrowUpRight className="w-4 h-4 text-white" />
                                    </div>
                                </div>

                                {/* 2. Inner Info Block (100% Baseline Aligned across columns) */}
                                <div className="flex flex-col flex-1 justify-between">
                                    <div>
                                        {/* Tag & Date Header */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`flex items-center gap-2 border px-3 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase ${card.badgeColor}`}>
                                                {card.icon}
                                                {card.badge}
                                            </div>
                                            <span className="text-[10px] text-white/40 font-mono font-medium">
                                                {card.date}
                                            </span>
                                        </div>

                                        {/* Title (Fixed min-height for baseline alignment across columns) */}
                                        <h3 
                                            className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-2 tracking-tight group-hover:text-[#CC5833] transition-colors duration-300 min-h-[3.25rem] md:min-h-[3.75rem] flex items-start leading-snug"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            {card.title}
                                        </h3>

                                        {/* Subtitle Label (Fixed min-height for baseline alignment) */}
                                        <p className="text-xs text-[#CC5833]/90 font-mono uppercase tracking-wider mb-3 font-semibold min-h-[1.5rem] flex items-center">
                                            {card.label}
                                        </p>

                                        {/* Body Description (Flex-1 with min-height) */}
                                        <p 
                                            className="text-white/70 text-sm leading-relaxed mb-6 line-clamp-4 min-h-[5.25rem] md:min-h-[6.25rem]"
                                            style={{ fontFamily: "var(--font-body)" }}
                                        >
                                            {card.description}
                                        </p>
                                    </div>

                                    {/* 3. Footer Divider & Action Link (Anchored to bottom with mt-auto) */}
                                    <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                                        <span className="text-xs font-bold text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 flex items-center gap-2">
                                            Click for full details
                                            <ArrowUpRight className="w-3.5 h-3.5 text-[#CC5833]" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>

        </section>

            {/* ================================================================ */}
            {/* FULL DETAILS MODAL — Rendered via Portal on document.body */}
            {/* ================================================================ */}
            {selectedCard && typeof document !== "undefined" && createPortal(
                <div 
                    className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-2xl"
                    onClick={() => setSelectedCard(null)}
                >
                    <div 
                        className="relative w-full max-w-4xl max-h-[88vh] bg-[#1A1A22] border border-white/20 rounded-[2.5rem] p-6 md:p-10 overflow-y-auto shadow-[0_25px_80px_rgba(0,0,0,0.8)] text-[#FAF9F6] scrollbar-hide"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedCard(null)}
                            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 text-white hover:scale-105 z-30"
                            aria-label="Close details dialog"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            
                            {/* Left Column: Full Poster Image Preview */}
                            <div className="lg:col-span-5 relative aspect-[3/4] w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-xl bg-black/60">
                                <Image
                                    src={selectedCard.imageUrl}
                                    alt={selectedCard.title}
                                    fill
                                    unoptimized
                                    sizes="(max-width: 1024px) 100vw, 400px"
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            {/* Right Column: Full Details & Metrics */}
                            <div className="lg:col-span-7 flex flex-col justify-between">
                                
                                {/* Top Meta Row */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`flex items-center gap-2 border px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase ${selectedCard.badgeColor}`}>
                                        {selectedCard.icon}
                                        {selectedCard.badge}
                                    </div>
                                    <span className="text-xs text-white/50 font-mono">
                                        {selectedCard.date}
                                    </span>
                                </div>

                                {/* Title & Subtitle */}
                                <h3 
                                    className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight pr-8"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {selectedCard.title}
                                </h3>

                                <p className="text-sm font-semibold text-[#CC5833] font-mono uppercase tracking-wider mb-6">
                                    {selectedCard.label}
                                </p>

                                {/* Full Detailed Narrative */}
                                <div className="mb-8 text-white/85 text-sm md:text-base leading-relaxed space-y-3">
                                    <p>{selectedCard.fullNarrative}</p>
                                </div>

                                {/* Metrics Breakdown Grid (if available) */}
                                {selectedCard.metrics && selectedCard.metrics.length > 0 && (
                                    <div className="mb-8">
                                        <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3 font-semibold">
                                            Outreach Impact Breakdown
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {selectedCard.metrics.map((m, idx) => (
                                                <div 
                                                    key={idx}
                                                    className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col"
                                                >
                                                    <span className="text-lg md:text-xl font-bold text-[#CC5833] font-heading">
                                                        {m.value}
                                                    </span>
                                                    <span className="text-[11px] text-white/70 font-mono line-clamp-1">
                                                        {m.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Service Highlights List (if available) */}
                                {selectedCard.highlights && selectedCard.highlights.length > 0 && (
                                    <div className="mb-8">
                                        <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3 font-semibold">
                                            Services & Care Offered
                                        </h4>
                                        <div className="space-y-2">
                                            {selectedCard.highlights.map((h, idx) => (
                                                <div key={idx} className="flex items-center gap-2.5 text-sm text-white/90">
                                                    <CheckCircle2 className="w-4 h-4 text-[#3B5247] flex-shrink-0" />
                                                    <span>{h}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Partner List (if available) */}
                                {selectedCard.partners && selectedCard.partners.length > 0 && (
                                    <div className="mb-8 pt-4 border-t border-white/10">
                                        <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3 font-semibold flex items-center gap-2">
                                            <HeartHandshake className="w-3.5 h-3.5 text-[#CC5833]" />
                                            Collaborating Mission Partners
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCard.partners.map((p, idx) => (
                                                <span 
                                                    key={idx}
                                                    className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-mono text-white/80"
                                                >
                                                    {p}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Action button footer */}
                                <div className="pt-4 border-t border-white/10 flex items-center justify-end">
                                    <button 
                                        onClick={() => setSelectedCard(null)}
                                        className="btn btn-ghost"
                                    >
                                        <span className="btn-text">Close Details</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
