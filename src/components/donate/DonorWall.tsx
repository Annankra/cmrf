"use client";

import { useState } from "react";
import { Heart, Sparkles, CheckCircle2, MessageSquare } from "lucide-react";

interface DonorEntry {
    id: string;
    name: string;
    amount: string;
    currency: string;
    message: string;
    timeAgo: string;
    location: string;
}

const INITIAL_DONORS: DonorEntry[] = [
    {
        id: "1",
        name: "Dr. K. Mensah",
        amount: "500",
        currency: "USD",
        message: "Dedicated to the 2026 Sandema Outreach team and medical supplies.",
        timeAgo: "2 hours ago",
        location: "Accra, Ghana",
    },
    {
        id: "2",
        name: "Anonymous Partner",
        amount: "1,000",
        currency: "USD",
        message: "Thank you CMRF for 30 years of faithful service across West Africa!",
        timeAgo: "5 hours ago",
        location: "London, UK",
    },
    {
        id: "3",
        name: "Grace & Family",
        amount: "2,500",
        currency: "GHS",
        message: "For clean water boreholes and community health outreach.",
        timeAgo: "1 day ago",
        location: "Kumasi, Ghana",
    },
    {
        id: "4",
        name: "Rev. Emmanuel O.",
        amount: "250",
        currency: "USD",
        message: "Praying for every doctor and nurse on the field.",
        timeAgo: "2 days ago",
        location: "Atlanta, USA",
    },
];

export function DonorWall() {
    const [donors, setDonors] = useState<DonorEntry[]>(INITIAL_DONORS);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (amount && message) {
            const newEntry: DonorEntry = {
                id: Date.now().toString(),
                name: name.trim() || "Generous Supporter",
                amount,
                currency: "USD",
                message,
                timeAgo: "Just now",
                location: "Global Supporter",
            };
            setDonors([newEntry, ...donors]);
            setName("");
            setAmount("");
            setMessage("");
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
        }
    };

    return (
        <div className="bg-gradient-to-br from-white/[0.03] to-black/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-clay)]/20 text-[var(--color-clay)] text-xs font-mono font-bold uppercase tracking-widest border border-[var(--color-clay)]/30 mb-3">
                        <Heart size={14} />
                        <span>Community Gratitude Wall</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        Live Donor <span className="font-drama text-[var(--color-clay)] italic">Feed.</span>
                    </h3>
                </div>

                {/* Mission Target Bar */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs space-y-1.5 min-w-[240px]">
                    <div className="flex justify-between text-white/70">
                        <span>2026 Mission Goal</span>
                        <span className="font-bold text-white">$42,500 / $50,000</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-[var(--color-clay)] rounded-full transition-all duration-1000" style={{ width: "85%" }} />
                    </div>
                    <p className="text-[10px] text-white/40 text-right">85% Funded</p>
                </div>
            </div>

            {/* Grid of Gratitude Messages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {donors.map((d) => (
                    <div key={d.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-[var(--color-clay)]/20 border border-[var(--color-clay)]/30 flex items-center justify-center text-[var(--color-clay)] font-bold text-xs font-mono">
                                    {d.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">{d.name}</p>
                                    <p className="text-[10px] font-mono text-white/40">{d.location} • {d.timeAgo}</p>
                                </div>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-[var(--color-clay)]/10 text-[var(--color-clay)] font-mono font-bold text-xs border border-[var(--color-clay)]/20">
                                ${d.amount} {d.currency}
                            </span>
                        </div>
                        <p className="text-xs text-white/70 italic leading-relaxed pl-2 border-l-2 border-[var(--color-clay)]/30">
                            &ldquo;{d.message}&rdquo;
                        </p>
                    </div>
                ))}
            </div>

            {/* Leave an Encouragement Note */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                <h4 className="text-sm font-mono uppercase font-bold text-white mb-3 flex items-center gap-2">
                    <MessageSquare size={16} className="text-[var(--color-clay)]" />
                    <span>Leave a Note of Encouragement</span>
                </h4>

                {submitted ? (
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold py-2">
                        <CheckCircle2 size={16} />
                        <span>Thank you! Your words of encouragement have been posted to the wall.</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                            type="text"
                            placeholder="Your Name (or Anonymous)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--color-clay)] font-mono"
                        />
                        <input
                            type="number"
                            required
                            placeholder="Amount ($)"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--color-clay)] font-mono"
                        />
                        <div className="sm:col-span-3 flex gap-2">
                            <input
                                type="text"
                                required
                                placeholder="Write a note of prayer or encouragement for the team..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--color-clay)]"
                            />
                            <button type="submit" className="btn btn-primary py-2.5 px-5 text-xs font-mono uppercase font-bold shrink-0">
                                <span>Post Note</span>
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
