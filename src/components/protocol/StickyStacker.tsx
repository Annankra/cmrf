"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const protocolSteps = [
    {
        step: "01",
        title: "Mobilize",
        description:
            "We gather medical professionals, volunteers, and resources from churches and partners around the world — preparing teams for the mission ahead.",
        animation: "helix",
    },
    {
        step: "02",
        title: "Deploy",
        description:
            "Teams travel to underserved communities across Ghana and Africa, setting up temporary clinics and outreach stations in partnership with local leaders.",
        animation: "scanner",
    },
    {
        step: "03",
        title: "Heal",
        description:
            "Free medical, dental, and optical care is delivered to those who need it most — alongside counselling, prayer, and the sharing of God's love.",
        animation: "waveform",
    },
];

function HelixCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let rotation = 0;

        const draw = () => {
            if (!canvas.offsetWidth || !canvas.offsetHeight) return;
            canvas.width = canvas.offsetWidth * 2;
            canvas.height = canvas.offsetHeight * 2;
            ctx.scale(2, 2);

            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            const cx = w / 2;
            const cy = h / 2;

            ctx.clearRect(0, 0, w, h);

            // Double helix
            for (let i = 0; i < 2; i++) {
                ctx.beginPath();
                for (let t = 0; t < Math.PI * 4; t += 0.05) {
                    const x = cx + Math.cos(t + rotation + i * Math.PI) * (40 + t * 6);
                    const y = cy + Math.sin(t + rotation + i * Math.PI) * (40 + t * 6);
                    if (t === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.strokeStyle =
                    i === 0 ? "rgba(204, 88, 51, 0.45)" : "rgba(46, 64, 54, 0.45)";
                ctx.lineWidth = 2.5;
                ctx.stroke();
            }

            // Center dots
            for (let t = 0; t < Math.PI * 4; t += 0.5) {
                const x = cx + Math.cos(t + rotation) * (40 + t * 6);
                const y = cy + Math.sin(t + rotation) * (40 + t * 6);
                ctx.beginPath();
                ctx.arc(x, y, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(204, 88, 51, 0.8)";
                ctx.fill();
            }

            rotation += 0.006;
            animationId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animationId);
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
}

function ScannerCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let scanY = 0;

        const draw = () => {
            if (!canvas.offsetWidth || !canvas.offsetHeight) return;
            canvas.width = canvas.offsetWidth * 2;
            canvas.height = canvas.offsetHeight * 2;
            ctx.scale(2, 2);

            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;

            ctx.clearRect(0, 0, w, h);

            // Grid of dots
            const spacing = 22;
            for (let x = spacing; x < w - spacing; x += spacing) {
                for (let y = spacing; y < h - spacing; y += spacing) {
                    const dist = Math.abs(y - scanY);
                    const intensity = Math.max(0, 1 - dist / 45);
                    ctx.beginPath();
                    ctx.arc(x, y, 2 + intensity * 2.5, 0, Math.PI * 2);
                    ctx.fillStyle =
                        intensity > 0.4
                            ? `rgba(204, 88, 51, ${0.3 + intensity * 0.6})`
                            : "rgba(255, 255, 255, 0.1)";
                    ctx.fill();
                }
            }

            // Scan line
            ctx.beginPath();
            ctx.moveTo(0, scanY);
            ctx.lineTo(w, scanY);
            ctx.strokeStyle = "rgba(204, 88, 51, 0.8)";
            ctx.lineWidth = 2;
            ctx.stroke();

            scanY = (scanY + 0.6) % h;
            animationId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animationId);
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
}

function WaveformCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let offset = 0;

        const draw = () => {
            if (!canvas.offsetWidth || !canvas.offsetHeight) return;
            canvas.width = canvas.offsetWidth * 2;
            canvas.height = canvas.offsetHeight * 2;
            ctx.scale(2, 2);

            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            const cy = h / 2;

            ctx.clearRect(0, 0, w, h);

            ctx.beginPath();
            ctx.moveTo(0, cy);

            for (let x = 0; x < w; x++) {
                const t = (x / w) * Math.PI * 6 + offset;
                let y = cy;

                const phase = (t % (Math.PI * 2)) / (Math.PI * 2);
                if (phase > 0.3 && phase < 0.35) {
                    y = cy - 25;
                } else if (phase > 0.4 && phase < 0.42) {
                    y = cy + 12;
                } else if (phase > 0.42 && phase < 0.47) {
                    y = cy - 55;
                } else if (phase > 0.47 && phase < 0.5) {
                    y = cy + 18;
                } else if (phase > 0.55 && phase < 0.65) {
                    y = cy - 12;
                } else {
                    y = cy + Math.sin(t * 5) * 2;
                }

                ctx.lineTo(x, y);
            }

            ctx.strokeStyle = "rgba(204, 88, 51, 0.85)";
            ctx.lineWidth = 2.5;
            ctx.stroke();

            offset += 0.035;
            animationId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animationId);
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
}

const animationComponents = {
    helix: HelixCanvas,
    scanner: ScannerCanvas,
    waveform: WaveformCanvas,
};

export function StickyStacker() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardRefs.current.forEach((card, i) => {
                if (!card || i === protocolSteps.length - 1) return;

                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    end: "bottom top",
                    pin: true,
                    pinSpacing: false,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        gsap.set(card, {
                            scale: 1 - progress * 0.08,
                            filter: `blur(${progress * 16}px)`,
                            opacity: 1 - progress * 0.45,
                        });
                    },
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative">
            {protocolSteps.map((step, i) => {
                const AnimComponent =
                    animationComponents[step.animation as keyof typeof animationComponents];
                return (
                    <div
                        key={step.step}
                        ref={(el) => { cardRefs.current[i] = el; }}
                        className="min-h-screen w-full flex items-center justify-center px-4 md:px-8 py-12 bg-transparent"
                    >
                        <div
                            className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative"
                            style={{ minHeight: "480px" }}
                        >
                            {/* Canvas Animation */}
                            <div className="relative bg-[#0d0d12] border-b lg:border-b-0 lg:border-r border-white/10 h-64 lg:h-auto">
                                <AnimComponent />
                            </div>

                            {/* Content */}
                            <div className="p-8 md:p-14 flex flex-col justify-center relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-clay)] animate-pulse-dot" />
                                    <span
                                        className="text-white/60 text-xs uppercase tracking-[0.2em] font-bold"
                                        style={{ fontFamily: "var(--font-mono)" }}
                                    >
                                        Protocol Step {step.step}
                                    </span>
                                </div>

                                <span
                                    className="text-[var(--color-clay)]/25 text-7xl md:text-9xl font-bold leading-none select-none absolute right-8 top-6 pointer-events-none"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    {step.step}
                                </span>

                                <h3
                                    className="text-4xl md:text-5xl font-bold text-white mb-6 pr-16"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {step.title}
                                </h3>
                                <p className="text-white/80 text-lg leading-relaxed max-w-md" style={{ fontFamily: "var(--font-body)" }}>
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
