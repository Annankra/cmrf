"use client";

import { useRef } from "react";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface EventItem {
    id: string;
    slug: string;
    title: string;
    description: string;
    date: string;
    location: string;
    category: string;
    featured: boolean;
    image: string;
}

export function EventsClientPage({ events }: { events: EventItem[] }) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Hero Animation
            gsap.fromTo(
                ".hero-anim",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    stagger: 0.1,
                }
            );

            // Staggered Cards Reveal on Scroll
            const cards = gsap.utils.toArray(".event-card");
            if (cards.length > 0) {
                gsap.fromTo(
                    cards,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".events-grid",
                            start: "top 80%",
                        },
                    }
                );
            }
        },
        { scope: container }
    );

    return (
        <div ref={container} className="bg-[var(--color-charcoal-light)] min-h-screen text-[var(--color-cream)]">
            {/* Dark Cinematic Hero */}
            <section className="relative h-[60vh] min-h-[400px] flex flex-col justify-end overflow-hidden">
                {/* Parallax Image Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1920&q=80&auto=format')`,
                    }}
                />

                {/* Cinematic Gradient Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal-light)] via-[var(--color-charcoal-light)]/80 to-[var(--color-charcoal-light)]/30" />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal-light)]/60 via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10 container-main px-6 md:px-12 pt-32 pb-12 md:pb-16 w-full">
                    <p
                        className="hero-anim text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-3"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Events & Calendar
                    </p>
                    <h1
                        className="hero-anim text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Upcoming{" "}
                        <span className="font-drama text-[var(--color-clay)] block lg:inline-block pr-2">Missions.</span>
                    </h1>
                </div>
            </section>

            {/* Brutalist Protocol / Dossier Grid */}
            <section className="section bg-transparent border-t border-white/5 relative z-10">
                <div className="container-main px-6 md:px-12">

                    <div className="mb-16 hero-anim">
                        <div className="section-divider ml-0 bg-white/10" />
                        <h2
                            className="text-4xl md:text-5xl font-bold text-white"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            <span className="font-drama text-[var(--color-clay)] italic pr-2">
                                Deployments.
                            </span>
                        </h2>
                    </div>

                    <div className="events-grid grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
                        {events.map((event, i) => (
                            <div
                                key={event.id}
                                className={`event-card rounded-[2rem] p-[1px] bg-gradient-to-br from-white/10 to-transparent overflow-hidden group ${i === 0 ? "lg:col-span-2" : ""}`}
                            >
                                {/* card-dark styling from globals.css mapped to glassmorphism */}
                                <div className={`relative h-full bg-black/20 backdrop-blur-xl rounded-[2rem] transition-all duration-500 overflow-hidden ${i === 0 ? "md:grid md:grid-cols-2" : "flex flex-col"}`}>

                                    {/* Image Container with inner shadow and hover scaling */}
                                    <div className={`relative overflow-hidden bg-[var(--color-charcoal)] border-b md:border-b-0 border-white/5 ${i === 0 ? "h-full min-h-[300px]" : "h-64"}`}>
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                            style={{ backgroundImage: `url('${event.image}')` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                        {/* Dossier Badge overlayed on image */}
                                        <div className="absolute top-6 left-6">
                                            <span
                                                className="inline-block px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[var(--color-clay)] text-[10px] tracking-widest uppercase font-semibold"
                                                style={{ fontFamily: "var(--font-mono)" }}
                                            >
                                                {event.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Container */}
                                    <div className="p-8 md:p-10 flex flex-col h-full relative">

                                        {/* Magnetic Hover Accent Bar */}
                                        <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-[var(--color-clay)] to-transparent opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />

                                        <h3
                                            className="text-3xl font-bold text-white mb-4"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            {event.title}
                                        </h3>

                                        <p className="text-[var(--color-cream)]/70 leading-relaxed mb-8 flex-grow">
                                            {event.description}
                                        </p>

                                        {/* Technical Metadata Row */}
                                        <div className="flex flex-col gap-3 py-4 border-y border-white/5 mb-8">
                                            <div className="flex items-start gap-3">
                                                <Calendar size={16} className="text-[var(--color-clay)] mt-0.5" />
                                                <span className="text-sm text-white/90" style={{ fontFamily: "var(--font-mono)" }}>{event.date}</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <MapPin size={16} className="text-[var(--color-clay)] mt-0.5" />
                                                <span className="text-sm text-white/60" style={{ fontFamily: "var(--font-mono)" }}>{event.location}</span>
                                            </div>
                                        </div>

                                        {/* Magnetic CTA */}
                                        <Link
                                            href={`/events/${event.slug}`}
                                            className="group/btn inline-flex items-center justify-between w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mt-auto"
                                        >
                                            <span
                                                className="uppercase tracking-[0.2em] text-[10px] text-white/90 font-bold"
                                                style={{ fontFamily: "var(--font-mono)" }}
                                            >
                                                Access Details
                                            </span>
                                            <ArrowRight size={16} className="text-[var(--color-clay)] transform transition-transform group-hover/btn:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
