"use client";

import { useEffect, useRef, useState } from "react";

const days = ["S", "M", "T", "W", "T", "F", "S"];
const activeDays = [1, 3, 4, 5]; // Mon, Wed, Thu, Fri

export function CursorScheduler() {
    const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
    const [activeDay, setActiveDay] = useState<number | null>(null);
    const [pressing, setPressing] = useState(false);
    const [saved, setSaved] = useState(false);
    const [step, setStep] = useState(0);
    const gridRef = useRef<HTMLDivElement>(null);
    const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
    const saveRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const sequence = async () => {
            // Reset
            setCursorPos(null);
            setActiveDay(null);
            setPressing(false);
            setSaved(false);

            await sleep(1000);

            if (!gridRef.current) return;
            const gridRect = gridRef.current.getBoundingClientRect();

            // Enter from bottom-right
            setCursorPos({ x: gridRect.width + 20, y: gridRect.height + 20 });
            await sleep(300);

            // Cycle through target days
            for (const dayIndex of activeDays) {
                const cell = cellRefs.current[dayIndex];
                if (!cell) continue;

                const cellRect = cell.getBoundingClientRect();
                const relX = cellRect.left - gridRect.left + cellRect.width / 2;
                const relY = cellRect.top - gridRect.top + cellRect.height / 2;

                setCursorPos({ x: relX, y: relY });
                await sleep(500);

                setPressing(true);
                await sleep(200);
                setActiveDay(dayIndex);
                setPressing(false);
                await sleep(400);
            }

            // Move to Save button
            if (saveRef.current) {
                const saveRect = saveRef.current.getBoundingClientRect();
                const relX = saveRect.left - gridRect.left + saveRect.width / 2;
                const relY = saveRect.top - gridRect.top + saveRect.height / 2;
                setCursorPos({ x: relX, y: relY });
                await sleep(500);
                setPressing(true);
                await sleep(200);
                setSaved(true);
                setPressing(false);
                await sleep(1500);
            }

            setStep((prev) => prev + 1);
        };

        sequence();
    }, [step]);

    return (
        <div className="card p-6 md:p-8 h-full">
            <h3
                className="text-lg font-bold text-[var(--color-moss)] mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
            >
                Mission Calendar
            </h3>
            <p className="text-[var(--color-muted)] text-sm mb-5">
                Outreach scheduling across communities
            </p>
            <div ref={gridRef} className="relative">
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1.5 mb-2">
                    {days.map((day, i) => (
                        <div
                            key={`${day}-${i}`}
                            className="text-center text-xs text-[var(--color-muted)]"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            {day}
                        </div>
                    ))}
                </div>
                {/* Day cells */}
                <div className="grid grid-cols-7 gap-1.5">
                    {days.map((_, i) => (
                        <div
                            key={i}
                            ref={(el) => { cellRefs.current[i] = el; }}
                            className={`aspect-square rounded-xl border flex items-center justify-center text-xs font-medium transition-all duration-300 ${activeDays.includes(i) && activeDay !== null && activeDays.indexOf(i) <= activeDays.indexOf(activeDay)
                                    ? "bg-[var(--color-clay)] border-[var(--color-clay)] text-white scale-95"
                                    : "bg-[var(--color-cream)] border-[var(--color-moss)]/10 text-[var(--color-charcoal)]/40"
                                }`}
                            style={{
                                transform:
                                    pressing && cursorPos && i === activeDays[activeDays.indexOf(activeDay ?? -1) + 1]
                                        ? "scale(0.95)"
                                        : undefined,
                                fontFamily: "var(--font-mono)",
                            }}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>

                {/* Save button */}
                <button
                    ref={saveRef}
                    className={`mt-4 w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${saved
                            ? "bg-emerald-500 text-white"
                            : "bg-[var(--color-moss)]/10 text-[var(--color-moss)]"
                        }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    {saved ? "✓ Schedule Saved" : "Save Schedule"}
                </button>

                {/* Animated Cursor */}
                {cursorPos && (
                    <svg
                        className="absolute pointer-events-none"
                        style={{
                            left: cursorPos.x - 6,
                            top: cursorPos.y - 2,
                            width: 20,
                            height: 24,
                            transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                            transform: pressing ? "scale(0.85)" : "scale(1)",
                            zIndex: 10,
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                        }}
                        viewBox="0 0 20 24"
                        fill="none"
                    >
                        <path
                            d="M1 1L1 17L5.5 13.5L9 21L12 19.5L8.5 12.5L14 12L1 1Z"
                            fill="var(--color-charcoal)"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </div>
        </div>
    );
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
