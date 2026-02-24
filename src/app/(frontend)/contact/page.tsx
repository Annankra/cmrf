import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

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
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80&auto=format')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/60 to-transparent" />
                <div className="relative z-10 container-main px-6 md:px-12 pb-12 md:pb-16">
                    <p
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-3"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Get in Touch
                    </p>
                    <h1
                        className="text-4xl md:text-6xl font-bold text-[var(--color-cream)]"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Contact{" "}
                        <span className="font-drama text-[var(--color-clay)]">Us.</span>
                    </h1>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section bg-[var(--color-cream)]">
                <div className="container-main px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Contact Form */}
                        <div>
                            <h2
                                className="text-2xl font-bold text-[var(--color-charcoal)] mb-6"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Send us a{" "}
                                <span className="font-drama text-[var(--color-clay)]">
                                    message.
                                </span>
                            </h2>
                            <form className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-moss)]/10 bg-[var(--color-ivory)] text-[var(--color-charcoal)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay)]/30 transition-all"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-moss)]/10 bg-[var(--color-ivory)] text-[var(--color-charcoal)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay)]/30 transition-all"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-moss)]/10 bg-[var(--color-ivory)] text-[var(--color-charcoal)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay)]/30 transition-all"
                                        placeholder="What is this about?"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        rows={5}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-moss)]/10 bg-[var(--color-ivory)] text-[var(--color-charcoal)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay)]/30 transition-all resize-none"
                                        placeholder="Your message..."
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    <span className="btn-text">Send Message</span>
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="lg:pl-8">
                            <h2
                                className="text-2xl font-bold text-[var(--color-charcoal)] mb-6"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Direct{" "}
                                <span className="font-drama text-[var(--color-clay)]">
                                    contact.
                                </span>
                            </h2>
                            <div className="space-y-6 mb-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--color-moss)]/10 flex items-center justify-center flex-shrink-0">
                                        <Mail size={18} className="text-[var(--color-moss)]" />
                                    </div>
                                    <div>
                                        <p
                                            className="font-semibold text-[var(--color-charcoal)] text-sm mb-0.5"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            Email
                                        </p>
                                        <a
                                            href="mailto:cmmrf@usa.com"
                                            className="text-[var(--color-clay)] text-sm no-underline hover:underline"
                                        >
                                            cmmrf@usa.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--color-moss)]/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin size={18} className="text-[var(--color-moss)]" />
                                    </div>
                                    <div>
                                        <p
                                            className="font-semibold text-[var(--color-charcoal)] text-sm mb-0.5"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            Location
                                        </p>
                                        <p className="text-[var(--color-muted)] text-sm">
                                            Accra, Ghana
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--color-moss)]/10 flex items-center justify-center flex-shrink-0">
                                        <Phone size={18} className="text-[var(--color-moss)]" />
                                    </div>
                                    <div>
                                        <p
                                            className="font-semibold text-[var(--color-charcoal)] text-sm mb-0.5"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            Organization Type
                                        </p>
                                        <p className="text-[var(--color-muted)] text-sm">
                                            CMRF Ghana (NGO) · CMMRF-USA 501(c)3
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="card overflow-hidden h-64">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254228.90079724!2d-0.30543!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1709000000000!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, borderRadius: "2rem" }}
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
