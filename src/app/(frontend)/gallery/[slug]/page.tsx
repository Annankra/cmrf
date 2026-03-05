import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getAlbumBySlug, getMediaUrl, getMediaAlt } from "@/lib/payload";
import { AlbumGalleryClient } from "@/components/gallery/AlbumGalleryClient";
import type { GalleryImage } from "@/components/gallery/FullscreenViewer";

export const dynamic = 'force-dynamic';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const p = await params;
    const album = await getAlbumBySlug(p.slug);

    if (!album) {
        return { title: "Album Not Found" };
    }

    return {
        title: album.title,
        description: album.description,
    };
}

export default async function AlbumPage({ params }: PageProps) {
    const p = await params;
    const album = await getAlbumBySlug(p.slug);

    if (!album) {
        notFound();
    }

    const coverImageUrl =
        getMediaUrl(album.coverImage) ||
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80&auto=format";

    // Serialize images for the client component
    const galleryImages: GalleryImage[] = (album.galleryImages || []).reduce<GalleryImage[]>(
        (acc, imgObj) => {
            const url = getMediaUrl(imgObj.image);
            if (!url) return acc;
            acc.push({
                url,
                alt: getMediaAlt(imgObj.image) || "Gallery image",
                caption: imgObj.caption ?? null,
            });
            return acc;
        },
        []
    );

    return (
        <>
            {/* Hero */}
            <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                    style={{ backgroundImage: `url('${coverImageUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/80 to-[var(--color-charcoal)]/30" />
                <div className="relative z-10 container-main px-6 md:px-12 pb-12 w-full">
                    <p
                        className="text-[var(--color-clay)] text-xs uppercase tracking-[0.2em] mb-4"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        Gallery / {album.year}
                    </p>
                    <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-cream)] mb-4 max-w-4xl leading-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {album.title}
                    </h1>
                    <p className="text-[var(--color-cream)]/80 text-lg md:text-xl max-w-2xl font-light">
                        {album.description}
                    </p>
                </div>
            </section>

            {/* Images Grid — interactive client component */}
            <section className="section bg-[var(--color-cream)]">
                <div className="container-main px-6 md:px-12">
                    <div className="flex justify-end mb-8">
                        <Link
                            href="/gallery"
                            className="inline-flex items-center text-[var(--color-charcoal)]/70 hover:text-[var(--color-clay)] transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            <span className="uppercase tracking-[0.1em] text-xs font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                                Back to Gallery
                            </span>
                        </Link>
                    </div>
                    <AlbumGalleryClient
                        images={galleryImages}
                        albumTitle={album.title}
                    />
                </div>
            </section>
        </>
    );
}
