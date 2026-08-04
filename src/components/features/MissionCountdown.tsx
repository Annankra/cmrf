"use client";

import { useState, useEffect } from "react";
import { Clock, Calendar, Bell, CheckCircle2, ChevronRight, MapPin, Share2 } from "lucide-react";
import Link from "next/link";

interface CountdownTimer {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export function MissionCountdown() {
    // Sandema Outreach Date: March 20, 2026 08:00:00 GMT
    const targetDate = new Date("2026-03-20T08:00:00Z").getTime();
    const [timeLeft, setTimeLeft] = useState<CountdownTimer>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail("");
        }
    };

    const downloadIcs = () => {
        const csContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:CMRF Sandema Medical Outreach 2026\nDESCRIPTION:Join CMRF medical volunteers delivering free healthcare in Sandema.\nLOCATION:Sandema, Upper East Region, Ghana\nDTSTART:20260320T080000Z\nDTEND:20260325T170000Z\nEND:VEVENT\nEND:VCALENDAR`;
        const blob = new Blob([csContent], { type: "text/calendar;charset=utf-8" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "cmrf-sandema-2026.ics");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-gradient-to-br from-white/[0.04] via-black/40 to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Radial */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--color-clay)]/10 blur-[120px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left Ticker Information */}
                <div className="lg:col-span-6 space-y-4 text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-clay)]/20 text-[var(--color-clay)] text-xs font-mono font-bold uppercase tracking-widest border border-[var(--color-clay)]/30">
                        <Clock size={14} className="animate-pulse" />
                        <span>Next Mission Deployment</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        Sandema Medical <br />
                        <span className="font-drama text-[var(--color-clay)] italic">Outreach 2026</span>
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60">
                        <span className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-[var(--color-clay)]" />
                            Sandema, Upper East Ghana
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-amber-400" />
                            March 20 – 25, 2026
                        </span>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={downloadIcs}
                            className="btn btn-secondary py-3 px-5 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2"
                        >
                            <Calendar size={14} />
                            <span>Add to Calendar (.ICS)</span>
                        </button>
                    </div>
                </div>

                {/* Right Live Digital Clock & Notify Widget */}
                <div className="lg:col-span-6 space-y-6">
                    <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                        {[
                            { label: "Days", val: timeLeft.days },
                            { label: "Hours", val: timeLeft.hours },
                            { label: "Mins", val: timeLeft.minutes },
                            { label: "Secs", val: timeLeft.seconds },
                        ].map((unit, idx) => (
                            <div key={idx} className="p-3 sm:p-5 rounded-2xl bg-black/60 border border-white/10 shadow-inner">
                                <span className="text-2xl sm:text-4xl font-black font-mono text-white block">
                                    {String(unit.val).padStart(2, "0")}
                                </span>
                                <span className="text-[10px] sm:text-xs text-white/40 uppercase font-mono tracking-widest mt-1 block">
                                    {unit.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Quick Reminder Sign Up */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                        {submitted ? (
                            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold py-1">
                                <CheckCircle2 size={16} />
                                <span>You are subscribed to Sandema deployment updates!</span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex gap-2">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email for mission alerts..."
                                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--color-clay)]"
                                />
                                <button type="submit" className="btn btn-primary py-2.5 px-4 text-xs font-mono uppercase font-bold shrink-0">
                                    <Bell size={14} />
                                    <span>Remind Me</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
