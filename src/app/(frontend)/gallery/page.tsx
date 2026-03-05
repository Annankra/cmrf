import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAlbums, getMediaUrl } from "@/lib/payload";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Gallery",
    description:
        "Photo gallery from CMRF medical missions, community outreach, and outreaches across Ghana and Africa.",
};

// Fallback data when CMS has no entries
const fallbackAlbums = [
    {
        slug: "medical-outreach",
        title: "Medical Outreach",
        description: "Images from our medical mission deployments across Ghana",
        year: "2024",
        coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&auto=format",
        imageCount: 24,
    },
    {
        slug: "homecoming",
        title: "Homecoming",
        description: "Celebrations and reunions with our mission community",
        year: "2023",
        coverImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&auto=format",
        imageCount: 18,
    },
    {
        slug: "kpando-22",
        title: "Kpando '22",
        description: "Mission to Kpando, Volta Region",
        year: "2022",
        coverImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80&auto=format",
        imageCount: 32,
    },
    {
        slug: "children",
        title: "Children",
        description: "The children we serve and impact across communities",
        year: "2023",
        coverImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80&auto=format",
        imageCount: 15,
    },
    {
        slug: "evangelism",
        title: "Evangelism",
        description: "Spreading the Gospel alongside medical missions",
        year: "2024",
        coverImage: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=80&auto=format",
        imageCount: 20,
    },
    {
        slug: "community-impact",
        title: "Community Impact",
        description: "Boreholes, schools, and empowerment projects",
        year: "2024",
        coverImage: "https://images.unsplash.com/photo-1541692641319-981cc79ee10a?w=600&q=80&auto=format",
        imageCount: 14,
    },
];

export default async function GalleryPage() {
    const cmsAlbums = await getAlbums();

    // Use CMS data if available, otherwise fallback
    const albums =
        cmsAlbums.length > 0
            ? cmsAlbums.map((a) => ({
                slug: a.slug,
                title: a.title,
                description: a.description,
                year: a.year,
                coverImage:
                    getMediaUrl(a.coverImage) ||
                    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&auto=format",
                imageCount: a.galleryImages?.length || 0,
            }))
            : fallbackAlbums;

    return (
        <>
            {/* Hero */}
            <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/60 to-transparent" />
                <div className="relative z-10 container-main px-6 md:px-12 pb-12 md:pb-16">
                    <p
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-3"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Photo Gallery
                    </p>
                    <h1
                        className="text-4xl md:text-6xl font-bold text-[var(--color-cream)]"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Our{" "}
                        <span className="font-drama text-[var(--color-clay)]">Gallery.</span>
                    </h1>
                </div>
            </section>

            {/* Albums Grid */}
            <section className="section bg-[var(--color-cream)]">
                <div className="container-main px-6 md:px-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {albums.map((album) => (
                            <Link
                                key={album.slug}
                                href={`/gallery/${album.slug}`}
                                className="block group no-underline h-full"
                            >
                                <div className="relative rounded-[2.5rem] overflow-hidden bg-[var(--color-cream)] border border-[var(--color-charcoal)]/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 will-change-transform hover:-translate-y-1">
                                    {/* Image Container */}
                                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[var(--color-charcoal)]/5">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03]"
                                            style={{ backgroundImage: `url('${album.coverImage}')` }}
                                        />
                                        {/* Elegant Top Badge */}
                                        <div className="absolute top-6 left-6 bg-[var(--color-cream)]/90 backdrop-blur-md text-[var(--color-charcoal)] text-[10px] px-4 py-2 rounded-full uppercase tracking-widest font-mono shadow-sm border border-white/20 transition-transform duration-500 group-hover:-translate-y-1">
                                            {album.imageCount} {album.imageCount === 1 ? 'Photo' : 'Photos'}
                                        </div>
                                    </div>

                                    {/* Content Container */}
                                    <div className="p-8 relative bg-[var(--color-cream)]">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-xs font-mono text-[var(--color-clay)] tracking-[0.25em] uppercase">
                                                {album.year}
                                            </span>

                                            {/* Arrow Interaction */}
                                            <div className="w-10 h-10 rounded-full bg-[var(--color-charcoal)] flex items-center justify-center text-[var(--color-cream)] -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </div>

                                        <h3 className="text-2xl lg:text-3xl font-bold text-[var(--color-charcoal)] font-heading mb-4 pr-4 group-hover:text-[var(--color-clay)] transition-colors duration-300">
                                            {album.title}
                                        </h3>

                                        <p className="text-base text-[var(--color-charcoal)]/60 line-clamp-2 leading-relaxed font-light">
                                            {album.description || "Explore the gallery narrative and moments captured during our events."}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
