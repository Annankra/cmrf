"use client";

import { useState, useEffect } from "react";
import { Clock, Calendar, Bell, CheckCircle2, MapPin } from "lucide-react";

interface CountdownTimer {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownEvent {
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    slug: string;
    category: string;
}

interface MissionCountdownProps {
    event: CountdownEvent | null;
}

/** Format an ISO date string to a readable date */
function formatDisplayDate(isoDate: string): string {
    try {
        const d = new Date(isoDate);
        if (isNaN(d.getTime())) return isoDate;
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(d);
    } catch {
        return isoDate;
    }
}

/** Format a Date to ICS timestamp (YYYYMMDDTHHMMSSZ) */
function toIcsDate(isoDate: string, time = "T080000Z"): string {
    try {
        const d = new Date(isoDate);
        const year = d.getUTCFullYear();
        const month = String(d.getUTCMonth() + 1).padStart(2, "0");
        const day = String(d.getUTCDate()).padStart(2, "0");
        return `${year}${month}${day}${time}`;
    } catch {
        return `20260101${time}`;
    }
}

export function MissionCountdown({ event }: MissionCountdownProps) {
    const targetDate = event ? new Date(event.startDate).getTime() : 0;
    const [timeLeft, setTimeLeft] = useState<CountdownTimer>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [isPast, setIsPast] = useState(false);

    useEffect(() => {
        if (!event) return;

        const updateTimer = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setIsPast(false);
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                setIsPast(true);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [targetDate, event]);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail("");
        }
    };

    const downloadIcs = () => {
        if (!event) return;
        const summary = event.title;
        const location = event.location;
        const dtStart = toIcsDate(event.startDate);
        const dtEnd = toIcsDate(event.endDate, "T170000Z");

        const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${summary}\nDESCRIPTION:Join CMRF medical volunteers for ${summary}.\nLOCATION:${location}\nDTSTART:${dtStart}\nDTEND:${dtEnd}\nEND:VEVENT\nEND:VCALENDAR`;
        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `cmrf-${event.slug}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // No upcoming event — show a subtle "stay tuned" state
    if (!event) {
        return (
            <div className="bg-gradient-to-br from-white/[0.04] via-black/40 to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--color-clay)]/10 blur-[120px] pointer-events-none" />
                <div className="relative z-10 text-center space-y-3 py-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-clay)]/20 text-[var(--color-clay)] text-xs font-mono font-bold uppercase tracking-widest border border-[var(--color-clay)]/30">
                        <Clock size={14} />
                        <span>Mission Countdown</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                        Next mission <span className="font-drama text-[var(--color-clay)] italic">coming soon.</span>
                    </h3>
                    <p className="text-sm text-white/50 font-mono">Stay tuned for upcoming deployments.</p>
                </div>
            </div>
        );
    }

    // Build display date range
    const dateRange =
        event.startDate && event.endDate && event.startDate !== event.endDate
            ? `${formatDisplayDate(event.startDate)} – ${formatDisplayDate(event.endDate)}`
            : formatDisplayDate(event.startDate);

    return (
        <div className="bg-gradient-to-br from-white/[0.04] via-black/40 to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Radial */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--color-clay)]/10 blur-[120px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left Ticker Information */}
                <div className="lg:col-span-6 space-y-4 text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-clay)]/20 text-[var(--color-clay)] text-xs font-mono font-bold uppercase tracking-widest border border-[var(--color-clay)]/30">
                        <Clock size={14} className="animate-pulse" />
                        <span>{isPast ? "Mission In Progress" : "Next Mission Deployment"}</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        {event.title.split(" ").slice(0, -1).join(" ")} <br />
                        <span className="font-drama text-[var(--color-clay)] italic">{event.title.split(" ").slice(-1)[0]}</span>
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60">
                        <span className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-[var(--color-clay)]" />
                            {event.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-amber-400" />
                            {dateRange}
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
                                <span>You are subscribed to {event.title} updates!</span>
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
