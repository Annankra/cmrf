import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { MissionMap } from "@/components/sections/MissionMap";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
    title: "Our Mission — Christian Medical Evangelism in Ghana & Africa",
    description:
        "CMRF mobilizes Christian medical professionals and resources worldwide to deliver free healthcare, community outreach, and evangelistic services to underserved communities across Ghana.",
    openGraph: {
        title: "Our Mission — Christian Medical Evangelism in Ghana",
        description: "Mobilizing Christians and resources worldwide to send forth God's love through medical missions, relief, and development services.",
        url: "https://www.cmrfgh.com/mission",
        type: "website",
    },
    twitter: {
        title: "Our Mission — Christian Medical Evangelism in Ghana",
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
            <PageHero
                badge="CMRF Mission"
                titleLine1="Mission &"
                titleLine2="Purpose."
                description="Demonstrating God's love through medical care, Christian relief, and leadership development."
                bgImage="/hero/medical-outreach.webp"
                imageAlt="CMRF Medical Outreach Mission"
            />

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
            {/* Interactive Ghana Mission Deployments Map */}
            <section className="section py-16 md:py-24 border-t border-white/5 bg-black/20">
                <div className="container-main px-6 md:px-12">
                    <MissionMap />
                </div>
            </section>
        </>
    );
}
