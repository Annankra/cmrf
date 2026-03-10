import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAlbums, getMediaUrl } from "@/lib/payload";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Gallery",
    description:
        "Photo gallery from CMRF medical missions, community outreach, and outreaches across Ghana and Africa.",
    openGraph: {
        title: "CMRF Gallery — Mission Photos",
        description: "Photos from CMRF medical missions, community outreach, and events across Ghana and Africa.",
        url: "https://www.cmrfgh.com/gallery",
        type: "website",
    },
    twitter: {
        title: "CMRF Gallery — Photos from the Field",
        description: "Photo gallery from CMRF medical missions and community outreach.",
    },
    alternates: { canonical: "https://www.cmrfgh.com/gallery" },
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
                    className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-overlay"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal-light)] via-[var(--color-charcoal-light)]/80 to-[var(--color-charcoal-light)]/30" />
                <div className="relative z-10 container-main px-6 md:px-12 pb-12 md:pb-16 w-full">
                    <p
                        className="hero-anim text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-3"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Photo Gallery
                    </p>
                    <h1
                        className="hero-anim text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Our{" "}
                        <span className="font-drama text-[var(--color-clay)] block lg:inline-block pr-2">Gallery.</span>
                    </h1>
                </div>
            </section>

            {/* Albums Grid */}
            <section className="section bg-transparent relative z-10 border-t border-white/5">
                <div className="container-main px-6 md:px-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {albums.map((album) => (
                            <Link
                                key={album.slug}
                                href={`/gallery/${album.slug}`}
                                className="block group no-underline h-full"
                            >
                                <div className="relative rounded-[2.5rem] overflow-hidden bg-black/40 border border-white/5 backdrop-blur-md transition-all duration-500 will-change-transform hover:-translate-y-2 hover:bg-white/[0.03] hover:border-white/10 flex flex-col h-full">
                                    {/* Image Container */}
                                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/20">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05]"
                                            style={{ backgroundImage: `url('${album.coverImage}')` }}
                                        />
                                        {/* Elegant Top Badge */}
                                        <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md text-white text-[10px] px-4 py-2 rounded-full uppercase tracking-widest font-mono border border-white/10 transition-transform duration-500 group-hover:-translate-y-1">
                                            {album.imageCount} {album.imageCount === 1 ? 'Photo' : 'Photos'}
                                        </div>
                                    </div>

                                    {/* Content Container */}
                                    <div className="p-8 relative flex-grow flex flex-col justify-center">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-xs font-mono text-[var(--color-clay)] tracking-[0.25em] uppercase">
                                                {album.year}
                                            </span>

                                            {/* Arrow Interaction */}
                                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                                                <ArrowRight className="w-5 h-5 text-[var(--color-clay)]" />
                                            </div>
                                        </div>

                                        <h3 className="text-2xl lg:text-3xl font-bold text-white font-heading mb-4 pr-4 transition-colors duration-300">
                                            {album.title}
                                        </h3>

                                        <p className="text-[15px] text-white/50 line-clamp-2 leading-relaxed font-light mt-auto">
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
