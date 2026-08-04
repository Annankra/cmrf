import type { Metadata } from "next";
import { getAlbums, getMediaUrl } from "@/lib/payload";
import { GalleryClientGrid } from "@/components/features/GalleryClientGrid";

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
            <section className="relative h-[60vh] min-h-[400px] flex flex-col justify-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-overlay"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal-light)] via-[var(--color-charcoal-light)]/80 to-[var(--color-charcoal-light)]/30" />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal-light)]/60 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 container-main px-6 md:px-12 pt-32 pb-12 md:pb-16 w-full">
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
                    <GalleryClientGrid albums={albums} />
                </div>
            </section>
        </>
    );
}
