import Image from "next/image";
import { Sparkles } from "lucide-react";

interface PageHeroProps {
    badge?: string;
    titleLine1: string;
    titleLine2?: string;
    description?: string;
    bgImage: string;
    imageAlt: string;
    priority?: boolean;
}

export function PageHero({
    badge,
    titleLine1,
    titleLine2,
    description,
    bgImage,
    imageAlt,
    priority = true,
}: PageHeroProps) {
    return (
        <section className="relative h-[60vh] min-h-[420px] w-full flex flex-col justify-end overflow-hidden">
            {/* Optimized Next Image Background */}
            <Image
                src={bgImage}
                alt={imageAlt}
                fill
                priority={priority}
                sizes="100vw"
                quality={85}
                className="object-cover object-center will-change-transform scale-105"
            />

            {/* Gradient Overlays matching design system */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/80 to-[var(--color-charcoal)]/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal)]/70 via-transparent to-transparent pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-16 md:pb-20">
                <div className="max-w-3xl">
                    {badge && (
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-6">
                            <Sparkles size={14} className="text-[var(--color-clay)]" />
                            <span
                                className="text-xs uppercase tracking-[0.2em] text-[var(--color-cream)] font-medium"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                {badge}
                            </span>
                        </div>
                    )}

                    <h1 className="mb-4">
                        <span
                            className="block text-[var(--color-cream)] text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {titleLine1}
                        </span>
                        {titleLine2 && (
                            <span className="block text-[var(--color-clay)] font-drama text-5xl md:text-7xl lg:text-8xl leading-none mt-1">
                                {titleLine2}
                            </span>
                        )}
                    </h1>

                    {description && (
                        <p
                            className="text-[var(--color-cream)]/80 text-base md:text-lg max-w-xl leading-relaxed"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
