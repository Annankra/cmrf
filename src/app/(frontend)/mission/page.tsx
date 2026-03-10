import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
    title: "Mission",
    description:
        "CMRF Mission: Mobilizing Christians and resources worldwide to send forth God's love through word and positive acts of deed.",
    openGraph: {
        title: "Our Mission — CMRF",
        description: "Mobilizing Christians and resources worldwide to send forth God's love through medical missions, relief, and development services.",
        url: "https://www.cmrfgh.com/mission",
        type: "website",
    },
    twitter: {
        title: "CMRF Mission — Word and Deed",
        description: "Mobilizing Christians and resources worldwide for medical missions and humanitarian services.",
    },
    alternates: { canonical: "https://www.cmrfgh.com/mission" },
};

const objectives = [
    {
        number: "01",
        title: "Mobilize Resources",
        description:
            "Mobilizing human and material resources, proclaiming and demonstrating the gospel for the whole person through Medical Missions, Christian Relief and Development Services.",
    },
    {
        number: "02",
        title: "Train for Missions",
        description:
            "Training and growing men, women and children for missions — building capacity across communities to serve God's purpose.",
    },
    {
        number: "03",
        title: "Motivate the Church",
        description:
            "Motivating the church to rise to the missionary task — inspiring congregations worldwide to participate in God's work.",
    },
];

export default function MissionPage() {
    return (
        <>
            <JsonLd data={breadcrumbJsonLd([
                { name: "Home", url: "https://www.cmrfgh.com" },
                { name: "Mission", url: "https://www.cmrfgh.com/mission" },
            ])} />
            {/* Hero */}
            <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-overlay"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&q=80&auto=format')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal-light)] via-[var(--color-charcoal-light)]/80 to-[var(--color-charcoal-light)]/30" />
                <div className="relative z-10 container-main px-6 md:px-12 pb-12 md:pb-16 w-full">
                    <p
                        className="hero-anim text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-3"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Our Mission
                    </p>
                    <h1
                        className="hero-anim text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Purpose &{" "}
                        <span className="font-drama text-[var(--color-clay)] block lg:inline-block pr-2">Calling.</span>
                    </h1>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="section bg-transparent relative z-10 border-t border-white/5">
                <div className="container-main px-6 md:px-12 max-w-4xl text-center">
                    <blockquote className="mb-8">
                        <p
                            className="text-3xl md:text-5xl lg:text-6xl font-drama text-white leading-tight font-light"
                        >
                            &ldquo;Mobilizing Christians and resources worldwide to send forth
                            God&apos;s love through{" "}
                            <span className="text-[var(--color-clay)] italic">word</span> and{" "}
                            <span className="text-[var(--color-moss)] italic">positive acts of deed</span>
                            .&rdquo;
                        </p>
                    </blockquote>
                    <div className="w-16 h-0.5 bg-[var(--color-clay)] mx-auto opacity-50" />
                </div>
            </section>

            {/* Objectives */}
            <section id="objectives" className="section bg-black/20 border-t border-white/5">
                <div className="container-main px-6 md:px-12 max-w-5xl">
                    <div className="text-center mb-16">
                        <div className="section-divider mx-auto bg-white/10" />
                        <h2
                            className="text-4xl md:text-5xl font-bold text-white mb-2"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Serving Christ{" "}
                            <span className="font-drama text-[var(--color-clay)] italic pr-2">
                                through.
                            </span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {objectives.map((obj) => (
                            <div key={obj.number} className="p-8 md:p-10 rounded-[2rem] bg-black/40 border border-white/5 backdrop-blur-md group hover:-translate-y-2 hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex flex-col">
                                <span
                                    className="text-5xl font-bold text-[var(--color-clay)]/20 block mb-6 group-hover:text-[var(--color-clay)]/40 transition-colors duration-500"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    {obj.number}
                                </span>
                                <h3
                                    className="text-xl font-bold text-white mb-4"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {obj.title}
                                </h3>
                                <p className="text-[15px] text-white/50 leading-relaxed font-light mt-auto">
                                    {obj.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statement of Faith */}
            <section id="faith" className="section bg-black/40 border-t border-white/5 relative overflow-hidden">
                {/* Subtle background glow */}
                <div className="absolute top-0 right-0 w-full max-w-3xl h-full bg-[var(--color-moss)]/5 rounded-[100%] blur-[120px] pointer-events-none" />

                <div className="container-main relative z-10 px-6 md:px-12 max-w-4xl">
                    <div className="text-center mb-16">
                        <div className="section-divider mx-auto bg-white/10" />
                        <h2
                            className="text-4xl md:text-5xl font-bold text-white mb-2"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            What we{" "}
                            <span className="font-drama text-[var(--color-clay)] italic pr-2">
                                believe.
                            </span>
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            "We accept the revelation of the triune God given in the Bible and confess the historic faith of the Gospel therein set forth.",
                            "The sovereignty and grace of God the Father, God the Son and God the Holy Spirit in creation, providence, revelation, redemption and final judgment.",
                            "The divine inspiration of the Holy Scriptures and its consequent entire trustworthiness and supreme authority in all matters of faith and conduct.",
                            "The universal sinfulness and guilt of fallen man, making him subject to God's wrath and condemnation.",
                            "The substitutionary sacrifice of the incarnate Son of God as the sole and all-sufficient ground of redemption.",
                            "The justification of sinners solely by the grace of God through faith in Christ crucified and risen from the dead.",
                            "The illuminating, regenerating, indwelling and sanctifying work of the Holy Spirit.",
                            "The Priesthood of all believers, who form the Universal Church — the Body of Christ — committed by His command to the proclamation of the gospel throughout the world.",
                            "The expectation of the personal, visible return of the Lord Jesus Christ in Power and Glory.",
                        ].map((statement, i) => (
                            <div
                                key={i}
                                className="flex gap-6 p-6 md:p-8 rounded-[1.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm group hover:bg-white/[0.04] transition-colors duration-300"
                            >
                                <span
                                    className="text-[var(--color-moss)]/40 text-sm mt-0.5 flex-shrink-0 font-bold tracking-widest group-hover:text-[var(--color-moss)] transition-colors duration-300"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <p className="text-[15px] md:text-base text-white/70 leading-relaxed font-light">
                                    {statement}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
