"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";

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
        let isMounted = true;
        const sequence = async () => {
            // Reset
            setCursorPos(null);
            setActiveDay(null);
            setPressing(false);
            setSaved(false);

            await sleep(1000);
            if (!isMounted) return;

            if (!gridRef.current) return;
            const gridRect = gridRef.current.getBoundingClientRect();

            // Enter from bottom-right
            setCursorPos({ x: gridRect.width + 15, y: gridRect.height + 15 });
            await sleep(350);
            if (!isMounted) return;

            // Cycle through target days
            for (const dayIndex of activeDays) {
                const cell = cellRefs.current[dayIndex];
                if (!cell) continue;

                const cellRect = cell.getBoundingClientRect();
                const relX = cellRect.left - gridRect.left + cellRect.width / 2;
                const relY = cellRect.top - gridRect.top + cellRect.height / 2;

                setCursorPos({ x: relX, y: relY });
                await sleep(500);
                if (!isMounted) return;

                setPressing(true);
                await sleep(200);
                if (!isMounted) return;
                setActiveDay(dayIndex);
                setPressing(false);
                await sleep(350);
                if (!isMounted) return;
            }

            // Move to Save button
            if (saveRef.current) {
                const saveRect = saveRef.current.getBoundingClientRect();
                const relX = saveRect.left - gridRect.left + saveRect.width / 2;
                const relY = saveRect.top - gridRect.top + saveRect.height / 2;
                setCursorPos({ x: relX, y: relY });
                await sleep(500);
                if (!isMounted) return;
                setPressing(true);
                await sleep(200);
                if (!isMounted) return;
                setSaved(true);
                setPressing(false);
                await sleep(1800);
                if (!isMounted) return;
            }

            setStep((prev) => prev + 1);
        };

        sequence();
        return () => {
            isMounted = false;
        };
    }, [step]);

    return (
        <div className="card-dark p-6 md:p-8 h-full flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <CalendarIcon size={18} className="text-[var(--color-clay)]" />
                        <h3
                            className="text-lg font-bold text-white"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Cursor Protocol Scheduler
                        </h3>
                    </div>
                    <span
                        className="text-[10px] uppercase tracking-widest text-white/50 px-2.5 py-1 rounded-full bg-white/5 border border-white/10"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Auto-Planner
                    </span>
                </div>
                <p className="text-white/60 text-sm mb-5">
                    Automated outreach schedule protocol & deployment window
                </p>
            </div>

            <div ref={gridRef} className="relative bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1.5 mb-2">
                    {days.map((day, i) => (
                        <div
                            key={`${day}-${i}`}
                            className="text-center text-xs text-white/40 font-mono font-medium"
                        >
                            {day}
                        </div>
                    ))}
                </div>
                {/* Day cells */}
                <div className="grid grid-cols-7 gap-1.5">
                    {days.map((_, i) => {
                        const isActivated =
                            activeDays.includes(i) &&
                            activeDay !== null &&
                            activeDays.indexOf(i) <= activeDays.indexOf(activeDay);

                        return (
                            <div
                                key={i}
                                ref={(el) => { cellRefs.current[i] = el; }}
                                className={`aspect-square rounded-xl border flex items-center justify-center text-xs font-mono transition-all duration-300 ${isActivated
                                        ? "bg-[var(--color-clay)] border-[var(--color-clay)] text-white font-bold scale-95 shadow-md shadow-[var(--color-clay)]/30"
                                        : "bg-white/5 border-white/10 text-white/40"
                                    }`}
                            >
                                {i + 1}
                            </div>
                        );
                    })}
                </div>

                {/* Save button */}
                <button
                    ref={saveRef}
                    className={`mt-4 w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 ${saved
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                            : "bg-white/10 text-white border border-white/10"
                        }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    {saved ? (
                        <>
                            <CheckCircle2 size={14} />
                            <span>✓ Schedule Saved</span>
                        </>
                    ) : (
                        "Save Schedule"
                    )}
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
                            zIndex: 20,
                            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
                        }}
                        viewBox="0 0 20 24"
                        fill="none"
                    >
                        <path
                            d="M1 1L1 17L5.5 13.5L9 21L12 19.5L8.5 12.5L14 12L1 1Z"
                            fill="var(--color-clay)"
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
