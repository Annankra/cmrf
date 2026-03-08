import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Get in touch with CMRF — Christian Medical Missions Resource Foundation. Reach out for inquiries, partnerships, or support.",
};

export default function ContactPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative h-[50vh] min-h-[350px] flex items-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-overlay"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80&auto=format')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal-light)] via-[var(--color-charcoal-light)]/80 to-[var(--color-charcoal-light)]/30" />
                <div className="relative z-10 container-main px-6 md:px-12 pb-12 md:pb-16 w-full">
                    <p
                        className="hero-anim text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-3"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Get in Touch
                    </p>
                    <h1
                        className="hero-anim text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Contact{" "}
                        <span className="font-drama text-[var(--color-clay)] block lg:inline-block pr-2">Us.</span>
                    </h1>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section bg-transparent relative z-10 border-t border-white/5">
                <div className="container-main px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Contact Form */}
                        <div>
                            <h2
                                className="text-3xl md:text-4xl font-bold text-white mb-6"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Send us a{" "}
                                <span className="font-drama text-[var(--color-clay)] italic pr-2">
                                    message.
                                </span>
                            </h2>
                            <div className="p-8 md:p-10 rounded-[2rem] bg-black/40 border border-white/5 backdrop-blur-md">
                                <ContactForm />
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="lg:pl-8">
                            <h2
                                className="text-3xl md:text-4xl font-bold text-white mb-6"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Direct{" "}
                                <span className="font-drama text-[var(--color-clay)] italic pr-2">
                                    contact.
                                </span>
                            </h2>
                            <div className="space-y-6 mb-10 pb-10 border-b border-white/5">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110">
                                        <Mail size={20} className="text-white/70" />
                                    </div>
                                    <div className="pt-1.5">
                                        <p
                                            className="font-bold text-white/90 text-sm mb-1 uppercase tracking-widest text-[10px]"
                                            style={{ fontFamily: "var(--font-mono)" }}
                                        >
                                            Email
                                        </p>
                                        <a
                                            href="mailto:cmmrf@usa.com"
                                            className="text-[var(--color-clay)] text-[15px] no-underline hover:underline transition-all"
                                        >
                                            cmmrf@usa.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[var(--color-moss)]/10 border border-[var(--color-moss)]/20 flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110">
                                        <MapPin size={20} className="text-[var(--color-moss)]" />
                                    </div>
                                    <div className="pt-1.5">
                                        <p
                                            className="font-bold text-white/90 text-sm mb-1 uppercase tracking-widest text-[10px]"
                                            style={{ fontFamily: "var(--font-mono)" }}
                                        >
                                            Location
                                        </p>
                                        <p className="text-white/60 text-[15px] font-light">
                                            Accra, Ghana
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[var(--color-clay)]/10 border border-[var(--color-clay)]/20 flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110">
                                        <Phone size={20} className="text-[var(--color-clay)]" />
                                    </div>
                                    <div className="pt-1.5">
                                        <p
                                            className="font-bold text-white/90 text-sm mb-1 uppercase tracking-widest text-[10px]"
                                            style={{ fontFamily: "var(--font-mono)" }}
                                        >
                                            Organization Type
                                        </p>
                                        <p className="text-white/60 text-[15px] font-light">
                                            CMRF Ghana (NGO) · CMMRF-USA 501(c)3
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="relative overflow-hidden h-64 rounded-[2rem] bg-black/40 border border-white/10 group">
                                <div className="absolute inset-0 bg-[var(--color-moss)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay z-10" />
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254228.90079724!2d-0.30543!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1709000000000!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) opacity(0.8)' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="CMRF Location"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
