import Link from "next/link";
import { Compass, Home, Search, ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[var(--color-charcoal)]">
            <PageHero
                badge="404 Error"
                titleLine1="Page Not"
                titleLine2="Found."
                description="The page or resource you are looking for does not exist, has been moved, or is temporarily unavailable."
                bgImage="/hero/medical-outreach.webp"
                imageAlt="CMRF Ghana Medical Outreach"
            />

            <section className="section py-16 md:py-24 relative z-10 border-t border-white/5">
                <div className="container-main px-6 md:px-12 max-w-2xl mx-auto text-center">
                    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-14 shadow-2xl space-y-8">
                        <div className="w-20 h-20 rounded-full bg-[var(--color-clay)]/10 border border-[var(--color-clay)]/20 flex items-center justify-center mx-auto text-[var(--color-clay)]">
                            <Compass size={40} className="animate-spin-slow" />
                        </div>

                        <div className="space-y-3">
                            <h2
                                className="text-2xl md:text-3xl font-bold text-[var(--color-cream)] tracking-tight"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Let&apos;s get you back on track
                            </h2>
                            <p className="text-[var(--color-cream)]/70 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                                Explore our key sections below or return directly to the homepage to learn more about our medical missions.
                            </p>
                        </div>

                        {/* Quick Navigation Links */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
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
                                <ArrowLeft size={18} />
                                <span>Contact Support</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
