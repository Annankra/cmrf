import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, Phone, Stethoscope, Eye, Heart } from "lucide-react";

export const metadata: Metadata = {
    title: "Clinic",
    description:
        "CMRF Clinic — providing free medical consultation, eye care, and dental services to underserved communities since 1991.",
};

const clinicServices = [
    {
        icon: Stethoscope,
        title: "General Medical",
        description: "Primary healthcare consultations and treatments",
    },
    {
        icon: Eye,
        title: "Eye Care",
        description: "Optical examinations, prescriptions, and treatments",
    },
    {
        icon: Heart,
        title: "Dental Care",
        description: "Dental examinations, treatments, and oral health services",
    },
];

export default function ClinicPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80&auto=format')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/60 to-transparent" />
                <div className="relative z-10 container-main px-6 md:px-12 pb-12 md:pb-16">
                    <p
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-3"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        CMRF Clinic
                    </p>
                    <h1
                        className="text-4xl md:text-6xl font-bold text-[var(--color-cream)]"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Our{" "}
                        <span className="font-drama text-[var(--color-clay)]">Clinic.</span>
                    </h1>
                </div>
            </section>

            {/* Clinic Info */}
            <section className="section bg-[var(--color-cream)]">
                <div className="container-main px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Info */}
                        <div>
                            <h2
                                className="text-3xl font-bold text-[var(--color-charcoal)] mb-4"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Caring for communities{" "}
                                <span className="font-drama text-[var(--color-clay)]">
                                    since 1991.
                                </span>
                            </h2>
                            <p className="text-[var(--color-charcoal)]/70 leading-relaxed mb-8">
                                CMRF operates one permanent medical clinic established in 1991,
                                providing free healthcare services to underserved communities.
                                Our medical professionals volunteer their time and expertise to
                                serve those who need it most.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <MapPin
                                        size={18}
                                        className="text-[var(--color-clay)] mt-0.5 flex-shrink-0"
                                    />
                                    <div>
                                        <p className="font-semibold text-[var(--color-charcoal)]text-sm">
                                            Location
                                        </p>
                                        <p className="text-sm text-[var(--color-muted)]">
                                            Accra, Ghana
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock
                                        size={18}
                                        className="text-[var(--color-clay)] mt-0.5 flex-shrink-0"
                                    />
                                    <div>
                                        <p className="font-semibold text-[var(--color-charcoal)] text-sm">
                                            Outreach Schedule
                                        </p>
                                        <p className="text-sm text-[var(--color-muted)]">
                                            10+ missions per year across Ghana and Africa
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone
                                        size={18}
                                        className="text-[var(--color-clay)] mt-0.5 flex-shrink-0"
                                    />
                                    <div>
                                        <p className="font-semibold text-[var(--color-charcoal)] text-sm">
                                            Contact
                                        </p>
                                        <p className="text-sm text-[var(--color-muted)]">
                                            cmmrf@usa.com
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/contact" className="btn btn-primary">
                                <span className="btn-text">Get in Touch</span>
                            </Link>
                        </div>

                        {/* Map Placeholder */}
                        <div className="card overflow-hidden h-80 lg:h-auto">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254228.90079724!2d-0.30543!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1709000000000!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0, borderRadius: "2rem" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="CMRF Clinic Location"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="section bg-[var(--color-ivory)]">
                <div className="container-main px-6 md:px-12">
                    <div className="text-center mb-12">
                        <h2
                            className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Clinical{" "}
                            <span className="font-drama text-[var(--color-clay)]">
                                services.
                            </span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {clinicServices.map((service) => {
                            const Icon = service.icon;
                            return (
                                <div key={service.title} className="card p-8 text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-moss)]/10 flex items-center justify-center mx-auto mb-5">
                                        <Icon size={24} className="text-[var(--color-moss)]" />
                                    </div>
                                    <h3
                                        className="text-lg font-bold text-[var(--color-charcoal)] mb-2"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-[var(--color-muted)]">
                                        {service.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
