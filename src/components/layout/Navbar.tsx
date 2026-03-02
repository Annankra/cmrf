"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const prevScrolled = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
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
                backgroundColor: "rgba(242, 240, 233, 0.6)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(46, 64, 54, 0.1)",
                boxShadow: "0 8px 32px rgba(26, 26, 26, 0.08)",
                width: "min(85vw, 1000px)",
                duration: 0.5,
                ease: "power2.out",
            });
        } else {
            gsap.to(navRef.current, {
                backgroundColor: "rgba(0, 0, 0, 0)",
                backdropFilter: "blur(0px)",
                borderColor: "rgba(0, 0, 0, 0)",
                boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
                width: "min(90vw, 1100px)",
                duration: 0.5,
                ease: "power2.out",
            });
        }
    }, [scrolled]);

    // Entrance animation
    useEffect(() => {
        if (!navRef.current) return;
        gsap.from(navRef.current, {
            y: -30,
            opacity: 0,
            duration: 0.8,
            delay: 0.6,
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
                className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-6 px-6 py-3 rounded-full border border-transparent"
                style={{
                    width: "min(90vw, 1100px)",
                    willChange: "background-color, width, box-shadow",
                }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    className={`font-extrabold text-xl tracking-tight transition-colors duration-500 no-underline ${scrolled ? "text-[var(--color-moss)]" : "text-[var(--color-cream)]"
                        }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    CMRF
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 no-underline hover:translate-y-[-1px] ${scrolled
                                ? "text-[var(--color-charcoal)] hover:bg-[var(--color-moss)]/5"
                                : "text-[var(--color-cream)]/80 hover:text-[var(--color-cream)]"
                                }`}
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA + Mobile Trigger */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/donate"
                        className={`hidden md:inline-flex btn text-sm py-2 px-5 ${scrolled ? "btn-primary" : "btn-ghost"
                            }`}
                    >
                        <span className="btn-text">Donate</span>
                    </Link>
                    <button
                        className={`md:hidden p-2 rounded-full transition-colors cursor-pointer ${scrolled
                            ? "text-[var(--color-moss)]"
                            : "text-[var(--color-cream)]"
                            }`}
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
                    <span className="btn-text">Donate Now</span>
                </Link>
            </div>
        </>
    );
}
