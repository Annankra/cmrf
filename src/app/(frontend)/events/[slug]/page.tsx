import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEventBySlug, getMediaUrl } from "@/lib/payload";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { MapPin, Calendar } from "lucide-react";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const p = await params;
    const event = await getEventBySlug(p.slug);

    if (!event) return { title: "Event Not Found" };

    return {
        title: event.title,
        description: event.description,
    };
}

// Helper to safely format dates
function formatDate(dateString: string): string {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (!isNaN(d.getTime()) && dateString.includes("-")) {
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(d);
    }
    return dateString;
}

export default async function EventPage({ params }: PageProps) {
    const p = await params;
    const event = await getEventBySlug(p.slug);

    if (!event) notFound();

    const coverImageUrl = getMediaUrl(event.image) || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80&auto=format";

    const displayDate = event.startDate && event.endDate && event.startDate !== event.endDate
        ? `${formatDate(event.startDate)} – ${formatDate(event.endDate)}`
        : formatDate(event.startDate || "");

    return (
        <article>
            {/* Hero */}
            <section className="relative h-[60vh] min-h-[500px] flex items-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                    style={{ backgroundImage: `url('${coverImageUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/80 to-[var(--color-charcoal)]/30" />
                <div className="relative z-10 container-main px-6 md:px-12 pb-16">
                    <p
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        {event.category}
                    </p>
                    <h1
                        className="text-4xl md:text-5xl lg:text-7xl font-bold text-[var(--color-cream)] mb-8 max-w-5xl leading-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {event.title}
                    </h1>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-[var(--color-cream)]/90" style={{ fontFamily: "var(--font-mono)" }}>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-[var(--color-clay)]" />
                            <span className="text-sm tracking-wide">{displayDate}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-[var(--color-clay)]" />
                            <span className="text-sm tracking-wide">{event.location}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="section bg-[var(--color-cream)]">
                <div className="container-main px-6 md:px-12">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-12 pb-12 border-b border-[var(--color-charcoal)]/10">
                            <h3 className="text-2xl md:text-3xl text-[var(--color-charcoal)] font-drama italic mb-4">Target Impact</h3>
                            <p className="text-lg md:text-xl text-[var(--color-charcoal)]/80 leading-relaxed font-light">
                                {event.description}
                            </p>
                        </div>

                        <div className="prose prose-lg md:prose-xl prose-headings:font-heading prose-p:font-sans prose-a:text-[var(--color-clay)] text-[var(--color-charcoal)]">
                            {event.content ? (
                                <RichText data={event.content} />
                            ) : (
                                <p className="opacity-50 italic">Full mission details have not been published yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
