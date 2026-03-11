'use client';

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Calendar, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    tags: string[];
    image: string;
    featured: boolean;
};

export function BlogClientPage({ initialPosts }: { initialPosts: Post[] }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            // Hero Animation: Staggered text reveal
            gsap.from(".hero-text-line", {
                y: 80,
                opacity: 0,
                duration: 1.2,
                autoAlpha: 0,
                stagger: 0.1,
                ease: "power4.out",
                delay: 0.1,
            });

            // Featured Card Entrance (Float up)
            gsap.from(".featured-card", {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".featured-section",
                    start: "top 80%",
                },
            });

            // Grid Cards Staggered Entrance
            gsap.from(".grid-card", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".grid-section",
                    start: "top 85%",
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const featuredPosts = initialPosts.filter((p) => p.featured);
    const otherPosts = initialPosts.filter((p) => !p.featured);

    return (
        <div ref={containerRef} className="bg-[var(--color-charcoal)] min-h-screen text-[var(--color-cream)]">
            {/* Hero Section */}
            <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&q=80&auto=format')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal)] via-transparent to-[var(--color-charcoal)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal)]/60 via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10 container-main px-6 md:px-12 text-center mt-20">
                    <div className="overflow-hidden mb-4">
                        <p
                            className="hero-text-line text-[var(--color-clay)] text-xs md:text-sm uppercase tracking-[0.3em]"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            <span className="inline-block w-8 h-[1px] bg-[var(--color-clay)] align-middle mr-3"></span>
                            System Operational
                        </p>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>
                        <div className="overflow-hidden">
                            <span className="hero-text-line inline-block">The CMRF</span>
                        </div>
                        <div className="overflow-hidden">
                            <span className="hero-text-line inline-block font-drama text-[var(--color-clay)] italic pr-4">Archive.</span>
                        </div>
                    </h1>
                </div>
            </section>

            {/* Featured Post Section */}
            {featuredPosts.length > 0 && (
                <section className="featured-section px-4 md:px-8 mt-[-8vh] relative z-20 max-w-[1600px] mx-auto">
                    {featuredPosts.slice(0, 1).map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="featured-card group block relative rounded-[2rem] overflow-hidden no-underline"
                        >
                            {/* Massive Image Area */}
                            <div className="aspect-[16/9] md:aspect-[21/9] w-full relative overflow-hidden bg-black">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                                    style={{ backgroundImage: `url('${post.image}')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-75" />
                            </div>

                            {/* Floating Content Glassmorphism Box */}
                            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                                <div className="bg-[var(--color-charcoal-light)]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 max-w-3xl transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                                    <div className="flex items-center gap-4 mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                                        <span className="px-3 py-1 rounded-full bg-[var(--color-clay)]/20 text-[var(--color-clay)] text-[10px] md:text-xs uppercase tracking-widest font-semibold">
                                            Priority Signal
                                        </span>
                                        <span className="text-[var(--color-muted)] text-[10px] md:text-xs tracking-wider flex items-center gap-1.5">
                                            <Calendar size={12} className="text-[var(--color-clay)]" />
                                            {post.date}
                                        </span>
                                    </div>
                                    <h2
                                        className="text-3xl md:text-5xl font-bold text-white mb-4 leading-[1.1]"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {post.title}
                                    </h2>
                                    <p className="text-white/70 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-6 max-w-2xl">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center text-[var(--color-clay)] text-sm font-semibold tracking-wide">
                                        Proceed to Archive
                                        <span className="ml-2 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-300 group-hover:bg-[var(--color-clay)] group-hover:text-white group-hover:translate-x-1">
                                            <ArrowUpRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            )}

            {/* Grid Posts Section */}
            <section className="grid-section section pb-24">
                <div className="container-main max-w-7xl mx-auto px-6 md:px-8">

                    {/* Grid Title / Divider */}
                    <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
                        <h3 className="text-xl md:text-2xl font-bold text-white/90" style={{ fontFamily: "var(--font-heading)" }}>
                            Latest Datastreams
                        </h3>
                        <div className="text-[var(--color-muted)] text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                            {otherPosts.length} Entries
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {otherPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="grid-card group block no-underline"
                            >
                                <div className="card card-dark bg-[var(--color-charcoal-light)] rounded-[1.5rem] overflow-hidden border border-white/5 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-2 group-hover:border-[var(--color-clay)]/30 group-hover:shadow-[0_20px_40px_-15px_rgba(204,88,51,0.15)] flex flex-col h-full">
                                    <div className="h-56 w-full relative overflow-hidden bg-black/50">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                            style={{ backgroundImage: `url('${post.image}')` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal-light)] to-transparent opacity-80" />

                                        {/* Tag Overlay */}
                                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                            {post.tags.slice(0, 1).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="backdrop-blur-md bg-black/40 border border-white/10 text-[var(--color-cream)] text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-md"
                                                    style={{ fontFamily: 'var(--font-mono)' }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 text-[10px] md:text-xs text-[var(--color-muted)] mb-3 tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
                                            <span>{post.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                            <span className="text-[var(--color-clay)]">Archive</span>
                                        </div>

                                        <h3
                                            className="text-lg md:text-xl font-bold text-white mb-3 line-clamp-3 transition-colors duration-300 group-hover:text-[var(--color-clay)]"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            {post.title}
                                        </h3>

                                        <p className="text-[var(--color-muted)] text-sm line-clamp-2 md:line-clamp-3 mb-6 mt-auto">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center text-xs font-bold text-white/50 tracking-widest uppercase mt-auto group-hover:text-white transition-colors duration-300">
                                            <span>Decrypt File</span>
                                            <div className="ml-2 h-[1px] bg-white/20 flex-grow relative overflow-hidden">
                                                <div className="absolute top-0 left-0 h-full w-full bg-[var(--color-clay)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
