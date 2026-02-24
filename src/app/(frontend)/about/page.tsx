import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Stethoscope, Eye, BookOpen, Droplets, GraduationCap, Users } from "lucide-react";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about CMRF — a Christian NGO founded in 1991, mobilizing medical professionals and resources to serve underserved communities across Ghana and Africa.",
};

const services = [
    {
        icon: Stethoscope,
        title: "Medical & Surgical",
        description: "Free consultations and treatment as our primary mission",
    },
    {
        icon: Eye,
        title: "Optical Services",
        description: "Eye examinations and treatments for underserved communities",
    },
    {
        icon: Heart,
        title: "Dental Care",
        description: "Oral health services delivered across mission outreaches",
    },
    {
        icon: Droplets,
        title: "Potable Water",
        description: "Boreholes and filtration systems for clean drinking water",
    },
    {
        icon: BookOpen,
        title: "Education Support",
        description: "Scholarships and educational materials for needy students",
    },
    {
        icon: GraduationCap,
        title: "Economic Empowerment",
        description: "Drip irrigation, livestock projects, and micro-enterprise support",
    },
    {
        icon: Users,
        title: "Leadership Development",
        description: "Training and growing men, women, and children for missions",
    },
];

export default function AboutPage() {
    return (
        <>
            {/* Hero Banner */}
            <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&q=80&auto=format')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/60 to-transparent" />
                <div className="relative z-10 container-main px-6 md:px-12 pb-12 md:pb-16">
                    <p
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-3"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        About Us
                    </p>
                    <h1
                        className="text-4xl md:text-6xl font-bold text-[var(--color-cream)]"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Our{" "}
                        <span className="font-drama text-[var(--color-clay)]">Story.</span>
                    </h1>
                </div>
            </section>

            {/* About Content */}
            <section className="section bg-[var(--color-cream)]">
                <div className="container-main px-6 md:px-12 max-w-4xl">
                    <div className="prose prose-lg">
                        <p className="text-lg text-[var(--color-charcoal)]/80 leading-relaxed mb-6">
                            Christian Medical Missions Resource Foundation (CMRF) is a registered
                            Christian Non-Governmental Organization (NGO) dedicated to showing the
                            love of God through <strong>word and positive acts of deed</strong>.
                        </p>
                        <p className="text-[var(--color-charcoal)]/70 leading-relaxed mb-6">
                            We mobilize both human and material resources to bring free medical
                            consultation and treatment to the needy in our society. We also donate
                            medical equipment and consumables to needy institutions.
                        </p>
                        <p className="text-[var(--color-charcoal)]/70 leading-relaxed">
                            Over the past years, we have reached out to all the Regions in Ghana
                            — over six hundred communities — and to Togo, Benin, Ethiopia, Uganda,
                            Kenya and Zambia with the word of God through medical, surgical,
                            optical and dental services.
                        </p>
                    </div>
                </div>
            </section>

            {/* Timeline / History */}
            <section id="story" className="section bg-[var(--color-ivory)]">
                <div className="container-main px-6 md:px-12 max-w-4xl">
                    <p
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Our History
                    </p>
                    <h2
                        className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)] mb-8"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        From prayer group to{" "}
                        <span className="font-drama text-[var(--color-clay)]">
                            global mission.
                        </span>
                    </h2>
                    <div className="border-l-2 border-[var(--color-moss)]/20 pl-8 space-y-10">
                        <div>
                            <span
                                className="text-xs text-[var(--color-clay)] mb-1 block"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                1991
                            </span>
                            <h3
                                className="text-xl font-bold text-[var(--color-charcoal)] mb-2"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Founded as a Hospital Prayer Group
                            </h3>
                            <p className="text-[var(--color-charcoal)]/70">
                                CMRF was born as a hospital prayer group under the inspiration of
                                its founder, the late Group Captain Dr. Samuel Akanyam Annankra, Head
                                of the Paediatric Division of the 37 Military Hospital, Accra. The
                                initial group of twenty were mostly medical personnel and a few
                                non-medics.
                            </p>
                        </div>
                        <div>
                            <span
                                className="text-xs text-[var(--color-clay)] mb-1 block"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Early Years
                            </span>
                            <h3
                                className="text-xl font-bold text-[var(--color-charcoal)] mb-2"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Expanding Beyond Prayer
                            </h3>
                            <p className="text-[var(--color-charcoal)]/70">
                                Professionals from diverse fields — lawyers, engineers, soldiers,
                                teachers, artists, and business leaders — joined the group. Members
                                saw the need to transcend spiritual satisfaction to the physical,
                                consequently seeking relief items and funds to provide health,
                                education, and food assistance to the marginalized.
                            </p>
                        </div>
                        <div>
                            <span
                                className="text-xs text-[var(--color-clay)] mb-1 block"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Present Day
                            </span>
                            <h3
                                className="text-xl font-bold text-[var(--color-charcoal)] mb-2"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                30+ Years of Impact
                            </h3>
                            <p className="text-[var(--color-charcoal)]/70">
                                Today, CMRF conducts 10+ medical outreaches annually, has served
                                600+ communities across Ghana and five other African nations, and
                                operates one permanent clinic since 1991. CMRF is a registered NGO
                                in Ghana; CMMRF-USA operates as a federally authorized tax-exempt
                                501(c)3 charitable organization.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="section bg-[var(--color-cream)]">
                <div className="container-main px-6 md:px-12">
                    <div className="text-center mb-16">
                        <p
                            className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            Our Services
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            How we{" "}
                            <span className="font-drama text-[var(--color-clay)]">serve.</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <div key={service.title} className="card p-6 hover:translate-y-[-2px]">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--color-moss)]/10 flex items-center justify-center mb-4">
                                        <Icon size={20} className="text-[var(--color-moss)]" />
                                    </div>
                                    <h3
                                        className="text-base font-bold text-[var(--color-charcoal)] mb-2"
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

            {/* Partners */}
            <section id="partners" className="section section-dark">
                <div className="container-main px-6 md:px-12 text-center">
                    <p
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Partnerships
                    </p>
                    <h2
                        className="text-3xl md:text-4xl font-bold text-[var(--color-cream)] mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Our{" "}
                        <span className="font-drama text-[var(--color-clay)]">
                            Partners.
                        </span>
                    </h2>
                    <p className="text-[var(--color-cream)]/50 text-sm max-w-lg mx-auto mb-12">
                        CMRF works in partnership with the government, churches, communities,
                        NGOs, individuals, and corporate organizations — including the Joy FM
                        Easter Soup Kitchen initiative.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
                        {["Joy FM", "37 Military Hospital", "Ghana Health Service", "CMMRF-USA"].map(
                            (partner) => (
                                <div
                                    key={partner}
                                    className="px-6 py-3 border border-[var(--color-cream)]/10 rounded-full text-[var(--color-cream)]/60 text-sm"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {partner}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
