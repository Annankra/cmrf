import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEventBySlug, getMediaUrl } from "@/lib/payload";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { MapPin, Calendar } from "lucide-react";
import { JsonLd, eventJsonLd, breadcrumbJsonLd } from "@/lib/jsonLd";

export const dynamic = 'force-dynamic';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const p = await params;
    const event = await getEventBySlug(p.slug);

    if (!event) return { title: "Event Not Found" };

    const imageUrl = getMediaUrl(event.image);

    return {
        title: event.title,
        description: event.description,
        openGraph: {
            title: event.title,
            description: event.description,
            type: "article",
            url: `https://www.cmrfgh.com/events/${p.slug}`,
            ...(imageUrl && {
                images: [{ url: imageUrl, width: 1200, height: 630, alt: event.title }],
            }),
        },
        twitter: {
            card: "summary_large_image",
            title: event.title,
            description: event.description,
            ...(imageUrl && { images: [imageUrl] }),
        },
        alternates: { canonical: `https://www.cmrfgh.com/events/${p.slug}` },
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
            <JsonLd data={breadcrumbJsonLd([
                { name: "Home", url: "https://www.cmrfgh.com" },
                { name: "Events", url: "https://www.cmrfgh.com/events" },
                { name: event.title, url: `https://www.cmrfgh.com/events/${p.slug}` },
            ])} />
            <JsonLd data={eventJsonLd({
                name: event.title,
                description: event.description,
                url: `https://www.cmrfgh.com/events/${p.slug}`,
                startDate: event.startDate || "",
                endDate: event.endDate || undefined,
                location: event.location,
                imageUrl: getMediaUrl(event.image),
            })} />
            {/* Hero */}
            <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden pt-40 pb-16">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 opacity-70 mix-blend-overlay"
                    style={{ backgroundImage: `url('${coverImageUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal-light)] via-[var(--color-charcoal-light)]/80 to-[var(--color-charcoal-light)]/30" />
                <div className="relative z-10 container-main px-6 md:px-12 w-full">
                    <p
                        className="hero-anim text-[var(--color-clay)] text-[10px] font-bold uppercase tracking-[0.25em] mb-4 border border-[var(--color-clay)]/30 bg-black/40 backdrop-blur-md rounded-full px-4 py-1.5 inline-block"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        {event.category}
                    </p>
                    <h1
                        className="hero-anim text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 max-w-5xl leading-[1.1] tracking-tight text-balance"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {event.title}
                    </h1>

                    <div className="hero-anim flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-white/80" style={{ fontFamily: "var(--font-mono)" }}>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-[var(--color-clay)]" />
                            <span className="text-xs tracking-widest uppercase font-bold">{displayDate}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-[var(--color-clay)]" />
                            <span className="text-xs tracking-widest uppercase font-bold">{event.location}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="section bg-transparent relative z-10 border-t border-white/5">
                <div className="container-main px-6 md:px-12">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-12 pb-12 border-b border-white/10">
                            <h3 className="text-3xl md:text-4xl text-white font-drama italic mb-4">
                                Target <span className="text-[var(--color-clay)]">Impact.</span>
                            </h3>
                            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                                {event.description}
                            </p>
                        </div>

                        <div className="prose prose-lg md:prose-xl prose-invert prose-headings:font-heading prose-headings:text-white prose-p:font-sans prose-p:text-white/70 prose-p:font-light prose-a:text-[var(--color-clay)] text-white/70 selection:bg-[var(--color-clay)]/30 selection:text-white">
                            {event.content ? (
                                <RichText data={event.content} />
                            ) : (
                                <p className="text-white/30 italic font-mono text-sm uppercase tracking-widest">Full mission details have not been published yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
