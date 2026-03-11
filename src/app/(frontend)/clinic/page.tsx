import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, Phone, Stethoscope, Eye, Heart } from "lucide-react";
import { JsonLd, breadcrumbJsonLd, medicalClinicJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
    title: "Clinic",
    description:
        "CMRF Clinic — providing free medical consultation, eye care, and dental services to underserved communities since 1991.",
    openGraph: {
        title: "CMRF Medical Clinic",
        description: "Free medical consultation, eye care, and dental services for underserved communities since 1991.",
        url: "https://www.cmrfgh.com/clinic",
        type: "website",
    },
    twitter: {
        title: "CMRF Medical Clinic — Free Healthcare Since 1991",
        description: "Providing free medical, optical, and dental services to communities across Ghana.",
    },
    alternates: { canonical: "https://www.cmrfgh.com/clinic" },
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
            <JsonLd data={breadcrumbJsonLd([
                { name: "Home", url: "https://www.cmrfgh.com" },
                { name: "Clinic", url: "https://www.cmrfgh.com/clinic" },
            ])} />
            <JsonLd data={medicalClinicJsonLd()} />
            {/* Hero */}
            <section className="relative h-[60vh] min-h-[400px] flex flex-col justify-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-overlay"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1920&q=100&auto=format')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal-light)] via-[var(--color-charcoal-light)]/80 to-[var(--color-charcoal-light)]/30" />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal-light)]/60 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 container-main px-6 md:px-12 pt-32 pb-12 md:pb-16 w-full">
                    <p
                        className="hero-anim text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-3"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        CMRF Clinic
                    </p>
                    <h1
                        className="hero-anim text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Our{" "}
                        <span className="font-drama text-[var(--color-clay)] block lg:inline-block pr-2">Clinic.</span>
                    </h1>
                </div>
            </section>

            {/* Clinic Info */}
            <section className="section bg-transparent relative z-10">
                <div className="container-main px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Info */}
                        <div>
                            <h2
                                className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Caring for communities{" "}
                                <span className="font-drama text-[var(--color-clay)] italic block mt-1 pr-2">
                                    since 1991.
                                </span>
                            </h2>
                            <p className="text-white/70 leading-relaxed mb-10 font-light text-lg">
                                CMRF operates one permanent medical clinic established in 1991,
                                providing free healthcare services to underserved communities.
                                Our medical professionals volunteer their time and expertise to
                                serve those who need it most.
                            </p>

                            <div className="space-y-6 mb-10 pb-10 border-b border-white/5">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--color-moss)]/10 border border-[var(--color-moss)]/20 flex flex-col items-center justify-center flex-shrink-0">
                                        <MapPin
                                            size={18}
                                            className="text-[var(--color-moss)]"
                                        />
                                    </div>
                                    <div className="pt-1">
                                        <p className="font-semibold text-white/90 text-sm mb-1 uppercase tracking-widest text-[10px]" style={{ fontFamily: "var(--font-mono)" }}>
                                            Location
                                        </p>
                                        <p className="text-[15px] text-white/60 font-light">
                                            Accra, Ghana
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--color-clay)]/10 border border-[var(--color-clay)]/20 flex flex-col items-center justify-center flex-shrink-0">
                                        <Clock
                                            size={18}
                                            className="text-[var(--color-clay)]"
                                        />
                                    </div>
                                    <div className="pt-1">
                                        <p className="font-semibold text-white/90 text-sm mb-1 uppercase tracking-widest text-[10px]" style={{ fontFamily: "var(--font-mono)" }}>
                                            Outreach Schedule
                                        </p>
                                        <p className="text-[15px] text-white/60 font-light">
                                            10+ missions per year across Ghana and Africa
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center flex-shrink-0">
                                        <Phone
                                            size={18}
                                            className="text-white/60"
                                        />
                                    </div>
                                    <div className="pt-1">
                                        <p className="font-semibold text-white/90 text-sm mb-1 uppercase tracking-widest text-[10px]" style={{ fontFamily: "var(--font-mono)" }}>
                                            Contact
                                        </p>
                                        <p className="text-[15px] text-white/60 font-light">
                                            cmmrf@usa.com
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/contact" className="group inline-flex items-center justify-between w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <span className="uppercase tracking-[0.2em] text-[10px] text-white/90 font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                                    Get in Touch
                                </span>
                            </Link>
                        </div>

                        {/* Map Placeholder */}
                        <div className="relative overflow-hidden h-80 lg:h-full min-h-[400px] rounded-[2rem] bg-black/40 border border-white/10">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254228.90079724!2d-0.30543!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1709000000000!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) opacity(0.8)' }}
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
            <section className="section bg-black/20 border-t border-white/5">
                <div className="container-main px-6 md:px-12">
                    <div className="text-center mb-16">
                        <div className="section-divider mx-auto bg-white/10" />
                        <h2
                            className="text-4xl md:text-5xl font-bold text-white"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Clinical{" "}
                            <span className="font-drama text-[var(--color-clay)] italic pr-2">
                                services.
                            </span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {clinicServices.map((service) => {
                            const Icon = service.icon;
                            return (
                                <div key={service.title} className="p-8 md:p-10 rounded-[2rem] bg-black/40 border border-white/5 backdrop-blur-md text-center group hover:-translate-y-2 hover:bg-white/[0.03] transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--color-moss)]/20 transition-colors duration-500">
                                        <Icon size={28} className="text-white/50 group-hover:text-[var(--color-moss)] transition-colors duration-500" />
                                    </div>
                                    <h3
                                        className="text-xl font-bold text-white mb-3"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {service.title}
                                    </h3>
                                    <p className="text-[15px] text-white/50 font-light leading-relaxed">
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
