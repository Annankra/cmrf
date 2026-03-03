import type { Metadata } from "next";
import Link from "next/link";
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
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {albums.map((album, i) => (
                            <Link
                                key={album.slug}
                                href={`/gallery/${album.slug}`}
                                className="card block break-inside-avoid overflow-hidden group no-underline"
                            >
                                <div className="relative overflow-hidden">
                                    <div
                                        className={`bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 ${i % 3 === 0
                                            ? "h-72"
                                            : i % 3 === 1
                                                ? "h-56"
                                                : "h-64"
                                            }`}
                                        style={{ backgroundImage: `url('${album.coverImage}')` }}
                                    />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-[var(--color-charcoal)]/0 group-hover:bg-[var(--color-charcoal)]/40 transition-colors duration-500 flex items-center justify-center">
                                        <span
                                            className="text-[var(--color-cream)] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            View Album →
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3
                                            className="text-base font-bold text-[var(--color-charcoal)]"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            {album.title}
                                        </h3>
                                        <span
                                            className="text-xs text-[var(--color-muted)]"
                                            style={{ fontFamily: "var(--font-mono)" }}
                                        >
                                            {album.year}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[var(--color-muted)]">
                                        {album.description}
                                    </p>
                                    <span
                                        className="text-xs text-[var(--color-clay)] mt-2 block"
                                        style={{ fontFamily: "var(--font-mono)" }}
                                    >
                                        {album.imageCount} photos
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
