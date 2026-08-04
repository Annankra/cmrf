import Link from "next/link";
import { Compass, Home, ArrowRight } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[85vh] w-full flex flex-col items-center justify-center py-28 px-6 text-center">
            <div className="max-w-2xl w-full bg-[var(--color-charcoal)]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-14 shadow-2xl space-y-8 relative overflow-hidden">
                <div className="w-20 h-20 rounded-full bg-[var(--color-clay)]/10 border border-[var(--color-clay)]/20 flex items-center justify-center mx-auto text-[var(--color-clay)]">
                    <Compass size={40} className="animate-spin-slow" />
                </div>

                <div className="space-y-3">
                    <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-clay)] font-mono font-medium">
                        404 Error
                    </span>
                    <h1
                        className="text-4xl md:text-5xl font-extrabold text-[var(--color-cream)] tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Page Not Found
                    </h1>
                    <p className="text-sm md:text-base text-[var(--color-cream)]/75 leading-relaxed max-w-md mx-auto">
                        The page or resource you are looking for does not exist or has been moved. Explore our key pages below:
                    </p>
                </div>

                {/* Quick Access Links Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left pt-2">
                    {[
                        { label: "About Us", href: "/about" },
                        { label: "Free Clinic", href: "/clinic" },
                        { label: "Our Mission", href: "/mission" },
                        { label: "Gallery", href: "/gallery" },
                        { label: "Events", href: "/events" },
                        { label: "Donate", href: "/donate" },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[var(--color-clay)]/50 hover:bg-white/[0.08] transition-all duration-300 text-xs font-mono font-medium text-[var(--color-cream)]/80 hover:text-white text-center"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link href="/" className="btn btn-primary w-full sm:w-auto">
                        <Home size={18} />
                        <span>Return to Homepage</span>
                    </Link>
                    <Link href="/contact" className="btn btn-ghost w-full sm:w-auto">
                        <ArrowRight size={18} />
                        <span>Contact Support</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
