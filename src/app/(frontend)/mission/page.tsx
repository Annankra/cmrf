import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mission",
    description:
        "CMRF Mission: Mobilizing Christians and resources worldwide to send forth God's love through word and positive acts of deed.",
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
            {/* Hero */}
            <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&q=80&auto=format')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/60 to-transparent" />
                <div className="relative z-10 container-main px-6 md:px-12 pb-12 md:pb-16">
                    <p
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-3"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Our Mission
                    </p>
                    <h1
                        className="text-4xl md:text-6xl font-bold text-[var(--color-cream)]"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Purpose &{" "}
                        <span className="font-drama text-[var(--color-clay)]">Calling.</span>
                    </h1>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="section bg-[var(--color-cream)]">
                <div className="container-main px-6 md:px-12 max-w-4xl text-center">
                    <blockquote className="mb-8">
                        <p
                            className="text-2xl md:text-4xl lg:text-5xl font-drama text-[var(--color-charcoal)] leading-tight"
                        >
                            &ldquo;Mobilizing Christians and resources worldwide to send forth
                            God&apos;s love through{" "}
                            <span className="text-[var(--color-clay)]">word</span> and{" "}
                            <span className="text-[var(--color-clay)]">positive acts of deed</span>
                            .&rdquo;
                        </p>
                    </blockquote>
                    <div className="w-16 h-0.5 bg-[var(--color-clay)] mx-auto" />
                </div>
            </section>

            {/* Objectives */}
            <section id="objectives" className="section bg-[var(--color-ivory)]">
                <div className="container-main px-6 md:px-12 max-w-5xl">
                    <div className="text-center mb-16">
                        <p
                            className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            Mission Objectives
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Serving Christ{" "}
                            <span className="font-drama text-[var(--color-clay)]">
                                through.
                            </span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {objectives.map((obj) => (
                            <div key={obj.number} className="card p-8">
                                <span
                                    className="text-4xl font-bold text-[var(--color-clay)]/20 block mb-4"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    {obj.number}
                                </span>
                                <h3
                                    className="text-xl font-bold text-[var(--color-charcoal)] mb-3"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {obj.title}
                                </h3>
                                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                                    {obj.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statement of Faith */}
            <section id="faith" className="section section-dark">
                <div className="container-main px-6 md:px-12 max-w-4xl">
                    <div className="text-center mb-12">
                        <p
                            className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            Statement of Faith
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-bold text-[var(--color-cream)]"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            What we{" "}
                            <span className="font-drama text-[var(--color-clay)]">
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
                                className="flex gap-4 p-4 rounded-2xl bg-[var(--color-cream)]/5 border border-[var(--color-cream)]/5"
                            >
                                <span
                                    className="text-[var(--color-clay)]/30 text-xs mt-1 flex-shrink-0"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <p className="text-sm text-[var(--color-cream)]/70 leading-relaxed">
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
