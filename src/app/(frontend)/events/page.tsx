import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Events",
    description:
        "Upcoming CMRF medical outreaches, mission trips, and community events across Ghana and Africa.",
};

// Placeholder events — will come from CMS in production
const upcomingEvents = [
    {
        id: "1",
        slug: "tamale-outreach-2025",
        title: "2025 Tamale Medical Outreach",
        description:
            "Join us for a multi-day medical evangelistic outreach in Tamale, serving over 2,500 people across five communities with free healthcare, counselling, and spiritual support.",
        date: "January 24 – February 1, 2025",
        location: "Tamale, Northern Region",
        category: "Medical Outreach",
        featured: true,
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format",
    },
    {
        id: "2",
        slug: "haatso-mission-2025",
        title: "Haatso Community Medical Mission",
        description:
            "A one-day medical mission for the people in Haatso, providing general medical, dental and eye care. Resources provided freely to the community.",
        date: "March 2025",
        location: "Haatso, Greater Accra",
        category: "Community Mission",
        featured: false,
        image: "https://images.unsplash.com/photo-1559757175-7cb056fba93d?w=800&q=80&auto=format",
    },
    {
        id: "3",
        slug: "annual-soup-kitchen-2025",
        title: "Joy FM Easter Soup Kitchen",
        description:
            "CMRF partners with Joy FM for the annual Easter Soup Kitchen, providing meals and care to the vulnerable in our communities.",
        date: "April 2025",
        location: "Accra, Ghana",
        category: "Community Service",
        featured: false,
        image: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?w=800&q=80&auto=format",
    },
];

const pastEvents = [
    {
        title: "2024 Year-End Medical Outreach",
        date: "December 2024",
        location: "Multiple Communities, Ghana",
        impact: "5,800+ consultations",
    },
    {
        title: "Kpando Medical Mission 2022",
        date: "2022",
        location: "Kpando, Volta Region",
        impact: "1,200+ patients served",
    },
];

export default function EventsPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1920&q=80&auto=format')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/60 to-transparent" />
                <div className="relative z-10 container-main px-6 md:px-12 pb-12 md:pb-16">
                    <p
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-3"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Events & Calendar
                    </p>
                    <h1
                        className="text-4xl md:text-6xl font-bold text-[var(--color-cream)]"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Upcoming{" "}
                        <span className="font-drama text-[var(--color-clay)]">Missions.</span>
                    </h1>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="section bg-[var(--color-cream)]">
                <div className="container-main px-6 md:px-12">
                    <div className="mb-12">
                        <p
                            className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            Upcoming
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Join the{" "}
                            <span className="font-drama text-[var(--color-clay)]">
                                mission.
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
                        {upcomingEvents.map((event, i) => (
                            <div
                                key={event.id}
                                className={`card overflow-hidden ${i === 0 ? "lg:col-span-2" : ""}`}
                            >
                                <div className={`grid ${i === 0 ? "md:grid-cols-2" : "grid-cols-1"}`}>
                                    <div
                                        className="h-48 md:h-auto bg-cover bg-center"
                                        style={{ backgroundImage: `url('${event.image}')` }}
                                    />
                                    <div className="p-6 md:p-8">
                                        <span
                                            className="inline-block px-3 py-1 rounded-full bg-[var(--color-moss)]/10 text-[var(--color-moss)] text-xs font-medium mb-4"
                                            style={{ fontFamily: "var(--font-mono)" }}
                                        >
                                            {event.category}
                                        </span>
                                        <h3
                                            className="text-xl font-bold text-[var(--color-charcoal)] mb-3"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            {event.title}
                                        </h3>
                                        <p className="text-sm text-[var(--color-muted)] mb-4 leading-relaxed">
                                            {event.description}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--color-muted)] mb-4">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                {event.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin size={12} />
                                                {event.location}
                                            </span>
                                        </div>
                                        <Link
                                            href={`/events/${event.slug}`}
                                            className="inline-flex items-center gap-1 text-[var(--color-clay)] text-sm font-semibold no-underline hover:gap-2 transition-all"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            Learn More <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Past Events Archive */}
            <section className="section bg-[var(--color-ivory)]">
                <div className="container-main px-6 md:px-12 max-w-5xl">
                    <p
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Archive
                    </p>
                    <h2
                        className="text-2xl font-bold text-[var(--color-charcoal)] mb-8"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Past{" "}
                        <span className="font-drama text-[var(--color-clay)]">events.</span>
                    </h2>
                    <div className="space-y-4">
                        {pastEvents.map((event) => (
                            <div
                                key={event.title}
                                className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                            >
                                <div>
                                    <h3
                                        className="text-base font-bold text-[var(--color-charcoal)]"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {event.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-[var(--color-muted)]">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={10} /> {event.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin size={10} /> {event.location}
                                        </span>
                                    </div>
                                </div>
                                <span
                                    className="text-sm font-semibold text-[var(--color-moss)] whitespace-nowrap"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    {event.impact}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
