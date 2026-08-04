import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Get in touch with CMRF — Christian Medical Missions Resource Foundation. Reach out for inquiries, partnerships, or support.",
    openGraph: {
        title: "Contact CMRF",
        description: "Reach out to CMRF for inquiries, partnerships, volunteer opportunities, or to support our medical missions.",
        url: "https://www.cmrfgh.com/contact",
        type: "website",
    },
    twitter: {
        title: "Contact CMRF — Get in Touch",
        description: "Reach out to the Christian Medical Missions Resource Foundation for inquiries and partnerships.",
    },
    alternates: { canonical: "https://www.cmrfgh.com/contact" },
};

export default function ContactPage() {
    return (
        <>
            <JsonLd data={breadcrumbJsonLd([
                { name: "Home", url: "https://www.cmrfgh.com" },
                { name: "Contact", url: "https://www.cmrfgh.com/contact" },
            ])} />
            {/* Hero */}
            <PageHero
                badge="Get in Touch"
                titleLine1="Contact"
                titleLine2="Us."
                description="Have questions about our medical missions, partnerships, or volunteering? We'd love to hear from you."
                bgImage="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80&auto=format"
                imageAlt="CMRF Contact Office"
            />

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
                                Our{" "}
                                <span className="font-drama text-[var(--color-clay)] italic pr-2">
                                    Offices.
                                </span>
                            </h2>
                            <div className="space-y-8 mb-10 pb-10 border-b border-white/5">
                                {/* Ghana Office */}
                                <div className="p-6 rounded-[2rem] bg-black/20 border border-white/5 hover:border-[var(--color-clay)]/30 transition-all duration-300">
                                    <h3 className="text-white font-mono text-xs uppercase tracking-widest text-[var(--color-clay)] mb-3">Ghana (HQ)</h3>
                                    <div className="space-y-2">
                                        <p className="text-white/80 font-medium text-sm">
                                            Christian Medical Missions Resource Foundation
                                        </p>
                                        <p className="text-white/60 text-sm font-light">
                                            P. O. Box CT 4583, Cantonments, Accra, Ghana
                                        </p>
                                        <p className="text-sm">
                                            <span className="text-white/40 font-mono uppercase tracking-wider text-[10px] mr-2">Phone:</span>
                                            <a href="tel:+233540316355" className="text-white/70 hover:text-white transition-colors">+233 54 031 6355</a>
                                            <span className="text-white/40 mx-2">|</span>
                                            <a href="tel:+233208129634" className="text-white/70 hover:text-white transition-colors">+233 20 812 9634</a>
                                        </p>
                                        <p className="text-sm">
                                            <span className="text-white/40 font-mono uppercase tracking-wider text-[10px] mr-2">Email:</span>
                                            <a href="mailto:cmrfinternational@gmail.com" className="text-[var(--color-clay)] hover:underline">cmrfinternational@gmail.com</a>
                                        </p>
                                    </div>
                                </div>

                                {/* USA Office */}
                                <div className="p-6 rounded-[2rem] bg-black/20 border border-white/5 hover:border-[var(--color-clay)]/30 transition-all duration-300">
                                    <h3 className="text-white font-mono text-xs uppercase tracking-widest text-[var(--color-clay)] mb-3">USA (501c3)</h3>
                                    <div className="space-y-2">
                                        <p className="text-white/80 font-medium text-sm">
                                            Christian Missions Resources Foundation
                                        </p>
                                        <p className="text-white/60 text-sm font-light">
                                            7531 Trail Hollow, Missouri City, TX 77459
                                        </p>
                                        <p className="text-sm">
                                            <span className="text-white/40 font-mono uppercase tracking-wider text-[10px] mr-2">Phone:</span>
                                            <a href="tel:+18322896812" className="text-white/70 hover:text-white transition-colors">+1 (832) 289-6812</a>
                                            <span className="text-white/40 mx-2">|</span>
                                            <a href="tel:+19797392682" className="text-white/70 hover:text-white transition-colors">+1 (979) 739-2682</a>
                                        </p>
                                        <p className="text-sm">
                                            <span className="text-white/40 font-mono uppercase tracking-wider text-[10px] mr-2">Email:</span>
                                            <a href="mailto:mkminta@gmail.com" className="text-[var(--color-clay)] hover:underline">mkminta@gmail.com</a>
                                        </p>
                                    </div>
                                </div>

                                {/* Europe Office */}
                                <div className="p-6 rounded-[2rem] bg-black/20 border border-white/5 hover:border-[var(--color-clay)]/30 transition-all duration-300">
                                    <h3 className="text-white font-mono text-xs uppercase tracking-widest text-[var(--color-clay)] mb-3">Europe</h3>
                                    <div className="space-y-2">
                                        <p className="text-sm">
                                            <span className="text-white/40 font-mono uppercase tracking-wider text-[10px] mr-2">Phone:</span>
                                            <a href="tel:+447946757846" className="text-white/70 hover:text-white transition-colors">+44 7946 757846</a>
                                            <span className="text-white/40 mx-2">|</span>
                                            <a href="tel:+447866439985" className="text-white/70 hover:text-white transition-colors">+44 7866 439985</a>
                                        </p>
                                        <p className="text-sm">
                                            <span className="text-white/40 font-mono uppercase tracking-wider text-[10px] mr-2">Email:</span>
                                            <a href="mailto:papadelca@hotmail.com" className="text-[var(--color-clay)] hover:underline">papadelca@hotmail.com</a>
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
