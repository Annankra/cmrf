import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import Image from "next/image";
import { Heart, Stethoscope, Eye, BookOpen, Droplets, GraduationCap, Users } from "lucide-react";
import { JsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
    title: "About CMRF — 30+ Years of Christian Medical Missions in Ghana",
    description:
        "Founded in 1991, CMRF is a registered Ghanaian NGO and US 501(c)(3) that has served 700+ communities with free medical care, dental services, and eye care across Ghana and Africa.",
    openGraph: {
        title: "About CMRF — 30+ Years of Christian Medical Missions",
        description: "Founded in 1991, CMRF has grown into a global Christian medical missions organization serving 700+ communities across Ghana and Africa.",
        url: "https://www.cmrfgh.com/about",
        type: "website",
    },
    twitter: {
        title: "About CMRF — 30+ Years of Medical Impact",
        description: "30+ years of free medical care, 700+ communities served across Ghana and Africa. CMMRF-USA 501(c)(3).",
    },
    alternates: { canonical: "https://www.cmrfgh.com/about" },
};

const services = [
    {
        icon: Stethoscope,
        title: "Medical Outreaches",
        description: "Mobile clinics offering free consultations, vitals checkups, and prescription medicines",
    },
    {
        icon: Eye,
        title: "Eye & Dental Clinics",
        description: "Free vision testing, prescription glasses, eye drops, and dental extractions",
    },
    {
        icon: Heart,
        title: "Pastoral Care & Prayer",
        description: "Spiritual counseling, prayer ministry, and sharing the Gospel during outreaches",
    },
    {
        icon: Droplets,
        title: "Clean Water & Relief",
        description: "Installing clean water boreholes and distributing essential relief supplies",
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
            <JsonLd data={breadcrumbJsonLd([
                { name: "Home", url: "https://www.cmrfgh.com" },
                { name: "About", url: "https://www.cmrfgh.com/about" },
            ])} />
            <JsonLd data={faqPageJsonLd([
                {
                    question: "What is CMRF?",
                    answer: "The Christian Missions Resource Foundation (CMRF) is a medical NGO founded in 1991 that provides free healthcare, dental care, and eye care to underserved communities across Ghana and Africa.",
                },
                {
                    question: "Is CMRF a registered nonprofit?",
                    answer: "Yes. CMRF is a registered NGO in Ghana, and CMMRF-USA is a tax-exempt 501(c)(3) organization in the United States.",
                },
                {
                    question: "How can I volunteer or support CMRF?",
                    answer: "You can volunteer as a medical professional, prayer partner, or general volunteer, or support through one-time or recurring tax-deductible financial donations.",
                },
            ])} />
            {/* Hero Banner */}
            <PageHero
                badge="About Us"
                titleLine1="Our"
                titleLine2="Story."
                bgImage="/surgery.webp"
                imageAlt="CMRF Surgical Mission"
            />

            {/* About Content */}
            <section className="section bg-transparent border-t border-white/5 relative z-10">
                <div className="container-main px-6 md:px-12 max-w-4xl">
                    <div className="prose prose-lg prose-headings:text-white prose-p:text-white/80 prose-strong:text-white pb-8">
                        <p className="text-xl md:text-2xl text-[var(--color-clay)] leading-relaxed mb-8 font-light italic" style={{ fontFamily: "var(--font-drama)" }}>
                            Christian Medical Missions Resource Foundation (CMRF) is a registered
                            Christian Non-Governmental Organization (NGO) dedicated to showing the
                            love of God through <strong className="text-white font-bold not-italic">word and positive acts of deed</strong>.
                        </p>
                        <p className="text-white/80 leading-relaxed mb-6 font-light">
                            We mobilize both human and material resources to bring free medical
                            consultation and treatment to the needy in our society. We also donate
                            medical equipment and consumables to needy institutions.
                        </p>
                        <p className="text-white/80 leading-relaxed font-light">
                            Over the past years, we have reached out to all the Regions in Ghana
                            — over six hundred communities — and to Togo, Benin, Ethiopia, Uganda,
                            Kenya and Zambia with the word of God through medical, surgical,
                            optical and dental services.
                        </p>
                    </div>
                </div>
            </section>

            {/* Timeline / History */}
            <section id="story" className="section bg-black/20">
                <div className="container-main px-6 md:px-12 max-w-4xl">
                    <div className="mb-16">
                        <div className="section-divider ml-0 bg-white/10" />
                        <h2
                            className="text-4xl md:text-5xl font-bold text-white mb-2"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            From prayer group to{" "}
                            <span className="font-drama text-[var(--color-clay)] block mt-1 italic pr-2">
                                global mission.
                            </span>
                        </h2>
                    </div>

                    <div className="border-l border-white/10 pl-8 md:pl-12 space-y-16 py-4">
                        <div className="relative group">
                            {/* Node Point */}
                            <div className="absolute w-3 h-3 rounded-full bg-[var(--color-charcoal-light)] border-2 border-[var(--color-clay)] -left-[38px] md:-left-[54px] top-1.5 transition-transform duration-500 group-hover:scale-150 group-hover:bg-[var(--color-clay)]" />

                            <span
                                className="text-[10px] tracking-widest text-[var(--color-clay)] mb-2 block uppercase font-semibold"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                1991
                            </span>
                            <h3
                                className="text-2xl font-bold text-white mb-4"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Founded as a Hospital Prayer Group
                            </h3>
                            <p className="text-white/70 leading-relaxed font-light">
                                CMRF was born as a hospital prayer group under the inspiration of
                                its founder, the late Group Captain Dr. Samuel Akanyam Annankra, Head
                                of the Paediatric Division of the 37 Military Hospital, Accra. The
                                initial group of twenty were mostly medical personnel and a few
                                non-medics.
                            </p>
                        </div>

                        <div className="relative group">
                            {/* Node Point */}
                            <div className="absolute w-3 h-3 rounded-full bg-[var(--color-charcoal-light)] border-2 border-[var(--color-clay)] -left-[38px] md:-left-[54px] top-1.5 transition-transform duration-500 group-hover:scale-150 group-hover:bg-[var(--color-clay)]" />

                            <span
                                className="text-[10px] tracking-widest text-[var(--color-clay)] mb-2 block uppercase font-semibold"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Early Years
                            </span>
                            <h3
                                className="text-2xl font-bold text-white mb-4"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Expanding Beyond Prayer
                            </h3>
                            <p className="text-white/70 leading-relaxed font-light">
                                Professionals from diverse fields — lawyers, engineers, soldiers,
                                teachers, artists, and business leaders — joined the group. Members
                                saw the need to transcend spiritual satisfaction to the physical,
                                consequently seeking relief items and funds to provide health,
                                education, and food assistance to the marginalized.
                            </p>
                        </div>

                        <div className="relative group">
                            {/* Node Point */}
                            <div className="absolute w-3 h-3 rounded-full bg-[var(--color-charcoal-light)] border-2 border-[var(--color-clay)] -left-[38px] md:-left-[54px] top-1.5 transition-transform duration-500 group-hover:scale-150 group-hover:bg-[var(--color-clay)]" />

                            <span
                                className="text-[10px] tracking-widest text-[var(--color-clay)] mb-2 block uppercase font-semibold"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                Present Day
                            </span>
                            <h3
                                className="text-2xl font-bold text-white mb-4"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                30+ Years of Impact
                            </h3>
                            <p className="text-white/70 leading-relaxed font-light">
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
            <section className="section bg-transparent border-t border-white/5">
                <div className="container-main px-6 md:px-12">
                    <div className="text-center mb-16">
                        <div className="section-divider mx-auto bg-white/10" />
                        <h2
                            className="text-4xl md:text-5xl font-bold text-white mb-2"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            How we{" "}
                            <span className="font-drama text-[var(--color-clay)] italic pr-2">serve.</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <div key={service.title} className="p-8 rounded-[2rem] bg-black/20 border border-white/5 backdrop-blur-md group hover:-translate-y-2 hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-moss)]/20 transition-colors duration-500">
                                        <Icon size={20} className="text-white/70 group-hover:text-[var(--color-moss)] transition-colors duration-500" />
                                    </div>
                                    <h3
                                        className="text-lg font-bold text-white mb-3"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-white/50 leading-relaxed font-light mt-auto">
                                        {service.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Partners */}
            <section id="partners" className="section bg-black/40 border-t border-white/5 relative overflow-hidden">
                {/* Subtle background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-[var(--color-clay)]/5 rounded-[100%] blur-[100px] pointer-events-none" />

                <div className="container-main relative z-10 px-6 md:px-12 text-center">
                    <h2
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Our{" "}
                        <span className="font-drama text-[var(--color-clay)] italic pr-2">
                            Partners.
                        </span>
                    </h2>
                    <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto mb-16 font-light leading-relaxed">
                        CMRF works in partnership with the government, churches, communities,
                        NGOs, individuals, and corporate organizations — including the Joy FM
                        Easter Soup Kitchen initiative.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6 opacity-70">
                        {["Joy FM", "37 Military Hospital", "Ghana Health Service", "CMMRF-USA"].map(
                            (partner) => (
                                <div
                                    key={partner}
                                    className="px-6 py-3 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full text-white/80 text-xs md:text-sm tracking-widest uppercase hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                    style={{ fontFamily: "var(--font-mono)" }}
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
