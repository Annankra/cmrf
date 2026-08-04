"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Heart } from "lucide-react";
import gsap from "gsap";

const navLinks = [
    { label: "About", href: "/about" },
    { label: "Mission", href: "/mission" },
    { label: "Clinic", href: "/clinic" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
];

export function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const prevScrolled = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // GSAP morph on scroll state change
    useEffect(() => {
        if (!navRef.current) return;
        if (scrolled === prevScrolled.current) return;
        prevScrolled.current = scrolled;

        if (scrolled) {
            gsap.to(navRef.current, {
                backgroundColor: "rgba(17, 17, 21, 0.85)",
                backdropFilter: "blur(24px)",
                borderColor: "rgba(255, 255, 255, 0.12)",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35)",
                width: "min(88vw, 1040px)",
                duration: 0.5,
                ease: "power3.out",
            });
        } else {
            gsap.to(navRef.current, {
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                backdropFilter: "blur(12px)",
                borderColor: "rgba(255, 255, 255, 0.08)",
                boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
                width: "min(92vw, 1140px)",
                duration: 0.5,
                ease: "power3.out",
            });
        }
    }, [scrolled]);

    // Entrance animation
    useEffect(() => {
        if (!navRef.current) return;
        gsap.from(navRef.current, {
            y: -40,
            opacity: 0,
            duration: 0.9,
            delay: 0.2,
            ease: "power3.out",
        });
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-4 px-5 py-2.5 rounded-full border border-white/10"
                style={{
                    width: "min(92vw, 1140px)",
                    willChange: "background-color, width, box-shadow",
                }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2.5 group no-underline"
                >
                    <Image
                        src="/cmrflogo.png"
                        alt="CMRF Logo"
                        width={36}
                        height={36}
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <span
                        className="font-extrabold text-xl md:text-2xl tracking-tight text-[var(--color-cream)] transition-colors group-hover:text-[var(--color-clay)]"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        CMRF
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-clay)] animate-pulse-dot" />
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-300 no-underline hover:translate-y-[-1px] ${isActive
                                        ? "text-[var(--color-clay)] bg-white/10 font-semibold"
                                        : "text-[var(--color-cream)]/80 hover:text-[var(--color-cream)] hover:bg-white/5"
                                    }`}
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* CTA + Mobile Trigger */}
                <div className="flex items-center gap-2 md:gap-3">
                    <Link
                        href="/get-involved"
                        className="hidden lg:inline-flex px-3.5 py-1.5 text-xs font-semibold text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-full transition-all duration-300 no-underline hover:bg-white/5"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Volunteer
                    </Link>

                    <Link
                        href="/donate"
                        className="hidden sm:inline-flex btn btn-primary text-xs py-2 px-5"
                    >
                        <Heart size={14} fill="currentColor" />
                        <span className="btn-text">Donate</span>
                    </Link>

                    <button
                        className="md:hidden p-2 rounded-full text-[var(--color-cream)] hover:bg-white/10 transition-colors cursor-pointer"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-[var(--color-charcoal)]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 transition-all duration-500 ${mobileOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
            >
                {navLinks.map((link, i) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-[var(--color-cream)] text-3xl font-bold no-underline tracking-tight hover:text-[var(--color-clay)] transition-colors"
                        style={{
                            fontFamily: "var(--font-heading)",
                            transitionDelay: `${i * 50}ms`,
                        }}
                    >
                        {link.label}
                    </Link>
                ))}
                <Link
                    href="/donate"
                    onClick={() => setMobileOpen(false)}
                    className="btn btn-primary mt-6 text-lg"
                >
                    <Heart size={18} fill="currentColor" />
                    <span className="btn-text">Donate Now</span>
                </Link>
            </div>
        </>
    );
}
