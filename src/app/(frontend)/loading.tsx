import { Sparkles } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-[70vh] w-full flex flex-col items-center justify-center py-24 px-6">
            <div className="relative flex flex-col items-center gap-6 text-center">
                {/* Glowing Pulse Rings */}
                <div className="relative flex items-center justify-center">
                    <div className="absolute w-20 h-20 rounded-full bg-[var(--color-clay)]/20 animate-ping" />
                    <div className="relative w-16 h-16 rounded-full bg-[var(--color-charcoal)] border border-white/10 flex items-center justify-center shadow-xl">
                        <Sparkles className="w-7 h-7 text-[var(--color-clay)] animate-spin-slow" />
                    </div>
                </div>

                {/* Loading Text */}
                <div className="space-y-2">
                    <p
                        className="text-xs uppercase tracking-[0.25em] text-[var(--color-clay)] font-mono font-medium"
                    >
                        CMRF Ghana
                    </p>
                    <p
                        className="text-xl md:text-2xl font-bold text-[var(--color-cream)] tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Loading...
                    </p>
                </div>
            </div>
        </div>
    );
}
