import Link from "next/link";
import { Heart, Mail, MapPin } from "lucide-react";

const footerLinks = {
    organization: [
        { label: "About", href: "/about" },
        { label: "Mission", href: "/mission" },
        { label: "Clinic", href: "/clinic" },
        { label: "Our Partners", href: "/about#partners" },
    ],
    engage: [
        { label: "Events", href: "/events" },
        { label: "Gallery", href: "/gallery" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
    ],
    support: [
        { label: "Donate", href: "/get-involved" },
        { label: "Volunteer", href: "/get-involved#volunteer" },
        { label: "Newsletter", href: "/#newsletter" },
    ],
};

export function Footer() {
    return (
        <footer
            className="section-dark"
            style={{ borderRadius: "3rem 3rem 0 0" }}
        >
            <div className="container-main px-6 md:px-12 py-16 md:py-24">
                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link
                            href="/"
                            className="text-2xl font-extrabold text-[var(--color-cream)] no-underline tracking-tight block mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            CMRF
                        </Link>
                        <p
                            className="text-[var(--color-cream)]/60 text-sm leading-relaxed mb-6"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Mobilizing Christians and resources worldwide to show God&apos;s
                            love through word and positive acts of deed.
                        </p>
                        <div className="flex flex-col gap-2">
                            <a
                                href="mailto:cmmrf@usa.com"
                                className="flex items-center gap-2 text-[var(--color-cream)]/50 hover:text-[var(--color-clay)] text-sm no-underline transition-colors"
                            >
                                <Mail size={14} />
                                cmmrf@usa.com
                            </a>
                            <span className="flex items-center gap-2 text-[var(--color-cream)]/50 text-sm">
                                <MapPin size={14} />
                                Accra, Ghana
                            </span>
                        </div>
                    </div>

                    {/* Organization Links */}
                    <div>
                        <h4
                            className="text-[var(--color-cream)] text-xs font-semibold uppercase tracking-widest mb-5"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Organization
                        </h4>
                        <ul className="space-y-3 list-none p-0 m-0">
                            {footerLinks.organization.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[var(--color-cream)]/50 hover:text-[var(--color-cream)] text-sm no-underline transition-colors"
                                        style={{ fontFamily: "var(--font-body)" }}
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
                            className="text-[var(--color-cream)] text-xs font-semibold uppercase tracking-widest mb-5"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Engage
                        </h4>
                        <ul className="space-y-3 list-none p-0 m-0">
                            {footerLinks.engage.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[var(--color-cream)]/50 hover:text-[var(--color-cream)] text-sm no-underline transition-colors"
                                        style={{ fontFamily: "var(--font-body)" }}
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
                            className="text-[var(--color-cream)] text-xs font-semibold uppercase tracking-widest mb-5"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Support
                        </h4>
                        <ul className="space-y-3 list-none p-0 m-0">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[var(--color-cream)]/50 hover:text-[var(--color-cream)] text-sm no-underline transition-colors"
                                        style={{ fontFamily: "var(--font-body)" }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Registration Notice */}
                <div className="text-center mb-12">
                    <p
                        className="text-[var(--color-cream)]/50 text-xs leading-relaxed"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        CMRF is a registered NGO in Ghana.
                        <br />
                        CMMRF-USA is a registered, federally authorized tax-exempt 501(c)3 charitable organization.
                    </p>
                </div>

                {/* Divider */}
                <div className="border-t border-[var(--color-cream)]/10 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Status Indicator */}
                        <div
                            className="flex items-center gap-2 text-xs text-[var(--color-cream)]/40"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
                            Active Missions: 10+ per year
                        </div>

                        {/* Legal */}
                        <div className="flex items-center gap-1 text-xs text-[var(--color-cream)]/30">
                            <span>© {new Date().getFullYear()} CMRF Ghana</span>
                            <span className="mx-1">·</span>
                            <span>CMMRF-USA 501(c)3</span>
                            <span className="mx-1">·</span>
                            <span className="flex items-center gap-1">
                                dannankra <Heart size={10} className="text-[var(--color-clay)]" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
