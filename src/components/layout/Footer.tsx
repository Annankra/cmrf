import Link from "next/link";
import { Heart, Mail, MapPin, Sparkles } from "lucide-react";

const footerLinks = {
    organization: [
        { label: "About Us", href: "/about" },
        { label: "Our Mission", href: "/mission" },
        { label: "Permanent Clinic", href: "/clinic" },
        { label: "Partners & Sponsors", href: "/about#partners" },
    ],
    engage: [
        { label: "Outreach Events", href: "/events" },
        { label: "Photo Gallery", href: "/gallery" },
        { label: "Stories & Blog", href: "/blog" },
        { label: "Contact Us", href: "/contact" },
    ],
    support: [
        { label: "Donate", href: "/donate" },
        { label: "Volunteer", href: "/get-involved#volunteer" },
        { label: "Newsletter", href: "/#newsletter" },
    ],
};

export function Footer() {
    return (
        <footer
            className="bg-[var(--color-charcoal)] text-[var(--color-cream)] border-t border-white/10 relative overflow-hidden"
            style={{ borderRadius: "4rem 4rem 0 0" }}
        >
            <div className="container-main px-6 md:px-12 py-16 md:py-24 relative z-10">
                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link
                            href="/"
                            className="text-2xl font-extrabold text-[var(--color-cream)] no-underline tracking-tight block mb-4 flex items-center gap-2"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            <span>CMRF</span>
                            <Sparkles size={16} className="text-[var(--color-clay)]" />
                        </Link>
                        <p
                            className="text-[var(--color-cream)]/60 text-sm leading-relaxed mb-6"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Mobilizing Christians and resources worldwide to show God&apos;s
                            love through word and positive acts of deed across Ghana and Africa.
                        </p>
                        <div className="flex flex-col gap-2.5">
                            <a
                                href="mailto:cmmrf@usa.com"
                                className="flex items-center gap-2 text-[var(--color-cream)]/60 hover:text-[var(--color-clay)] text-sm no-underline transition-colors"
                            >
                                <Mail size={15} />
                                cmmrf@usa.com
                            </a>
                            <span className="flex items-center gap-2 text-[var(--color-cream)]/60 text-sm">
                                <MapPin size={15} />
                                Accra, Ghana · West Africa
                            </span>
                        </div>
                    </div>

                    {/* Organization Links */}
                    <div>
                        <h4
                            className="text-[var(--color-cream)] text-xs font-bold uppercase tracking-widest mb-5"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            Organization
                        </h4>
                        <ul className="space-y-3 list-none p-0 m-0">
                            {footerLinks.organization.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[var(--color-cream)]/60 hover:text-[var(--color-cream)] text-sm no-underline transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Engage Links */}
                    <div>
                        <h4
                            className="text-[var(--color-cream)] text-xs font-bold uppercase tracking-widest mb-5"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            Engage
                        </h4>
                        <ul className="space-y-3 list-none p-0 m-0">
                            {footerLinks.engage.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[var(--color-cream)]/60 hover:text-[var(--color-cream)] text-sm no-underline transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4
                            className="text-[var(--color-cream)] text-xs font-bold uppercase tracking-widest mb-5"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            Support
                        </h4>
                        <ul className="space-y-3 list-none p-0 m-0">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[var(--color-cream)]/60 hover:text-[var(--color-cream)] text-sm no-underline transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Registration Notice */}
                <div className="text-center mb-12 p-6 rounded-2xl bg-white/5 border border-white/10 max-w-3xl mx-auto">
                    <p
                        className="text-[var(--color-cream)]/60 text-xs leading-relaxed"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        CMRF is a registered NGO in Ghana (Reg #G-1,540).
                        <br />
                        CMMRF-USA is a registered, federally authorized tax-exempt 501(c)3 charitable organization.
                    </p>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* System Operational Status Indicator */}
                        <div
                            className="flex items-center gap-2.5 text-xs text-white/70 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
                            <span className="text-emerald-400 font-bold uppercase tracking-wider">System Operational</span>
                            <span className="text-white/40">· Active Network</span>
                        </div>

                        {/* Legal */}
                        <div className="flex items-center gap-1.5 text-xs text-white/40 font-mono">
                            <span>© {new Date().getFullYear()} CMRF</span>
                            <span className="mx-1">·</span>
                            <span>CMMRF-USA 501(c)3</span>
                            <span className="mx-1">·</span>
                            <span className="flex items-center gap-1">
                                Crafted with <Heart size={12} className="text-[var(--color-clay)] fill-current" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
