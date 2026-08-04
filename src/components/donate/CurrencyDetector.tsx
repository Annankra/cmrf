"use client";

import { useState, useEffect } from "react";
import { Globe, DollarSign, Coins } from "lucide-react";

export interface CurrencyConfig {
    code: "USD" | "GHS" | "GBP" | "EUR";
    symbol: string;
    rateToUSD: number; // exchange rate relative to USD
    label: string;
    flag: string;
    gateway: "stripe" | "paystack";
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
    USD: { code: "USD", symbol: "$", rateToUSD: 1, label: "USD ($)", flag: "🇺🇸", gateway: "stripe" },
    GHS: { code: "GHS", symbol: "GH₵", rateToUSD: 15.5, label: "GHS (GH₵)", flag: "🇬🇭", gateway: "paystack" },
    GBP: { code: "GBP", symbol: "£", rateToUSD: 0.79, label: "GBP (£)", flag: "🇬🇧", gateway: "stripe" },
    EUR: { code: "EUR", symbol: "€", rateToUSD: 0.92, label: "EUR (€)", flag: "🇪🇺", gateway: "stripe" },
};

interface CurrencyDetectorProps {
    onCurrencyChange: (currency: CurrencyConfig) => void;
    activeCurrency: CurrencyConfig;
}

export function CurrencyDetector({ onCurrencyChange, activeCurrency }: CurrencyDetectorProps) {
    const [detectedRegion, setDetectedRegion] = useState<string | null>(null);

    useEffect(() => {
        // Auto-detect currency based on user's timezone / locale
        try {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const userLocale = navigator.language || "";

            if (timeZone.includes("Africa/Accra") || userLocale.includes("gh") || userLocale.includes("GH")) {
                setDetectedRegion("Ghana (GHS)");
                onCurrencyChange(CURRENCIES.GHS);
            } else if (timeZone.includes("Europe/London") || userLocale.includes("GB")) {
                setDetectedRegion("UK (GBP)");
                onCurrencyChange(CURRENCIES.GBP);
            } else if (timeZone.includes("Europe/") || userLocale.includes("de") || userLocale.includes("fr")) {
                setDetectedRegion("Europe (EUR)");
                onCurrencyChange(CURRENCIES.EUR);
            } else {
                setDetectedRegion("International (USD)");
                onCurrencyChange(CURRENCIES.USD);
            }
        } catch {
            onCurrencyChange(CURRENCIES.USD);
        }
    }, []);

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-clay)]/10 border border-[var(--color-clay)]/20 flex items-center justify-center text-[var(--color-clay)]">
                    <Globe size={18} />
                </div>
                <div>
                    <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Auto-Detected Currency</p>
                    <p className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                        <span>{activeCurrency.flag}</span>
                        <span>{activeCurrency.label}</span>
                        {detectedRegion && <span className="text-white/40 font-normal">({detectedRegion})</span>}
                    </p>
                </div>
            </div>

            {/* Currency Selector Pills */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5">
                {Object.values(CURRENCIES).map((c) => {
                    const isActive = activeCurrency.code === c.code;
                    return (
                        <button
                            key={c.code}
                            type="button"
                            onClick={() => onCurrencyChange(c)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-300 ${
                                isActive
                                    ? "bg-[var(--color-clay)] text-white shadow-md scale-105"
                                    : "text-white/50 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            {c.flag} {c.code}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
