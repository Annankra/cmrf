"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon, X, Maximize2 } from "lucide-react";

export interface AlbumItem {
    slug: string;
    title: string;
    description: string;
    year: string;
    coverImage: string;
    imageCount: number;
}

const CATEGORIES = ["All", "2024", "2023", "2022"];

export function GalleryClientGrid({ albums }: { albums: AlbumItem[] }) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

    const filteredAlbums = selectedCategory === "All"
        ? albums
        : albums.filter((a) => a.year === selectedCategory);

    return (
        <div className="space-y-12">
            {/* Category Filter Pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
                {CATEGORIES.map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 ${
                                isActive
                                    ? "bg-[var(--color-clay)] text-white shadow-[0_0_20px_rgba(204,88,51,0.3)] scale-105"
                                    : "bg-white/[0.03] text-white/50 hover:text-white hover:bg-white/10"
                            }`}
                        >
                            {cat === "All" ? "All Archives" : `${cat} Missions`}
                        </button>
                    );
                })}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAlbums.map((album) => (
                    <div
                        key={album.slug}
                        className="group relative rounded-[2rem] bg-black/40 border border-white/5 overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2"
                    >
                        {/* Cover Image Container */}
                        <div className="relative h-64 overflow-hidden bg-black/60">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url('${album.coverImage}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Lightbox Quick View Button */}
                            <button
                                type="button"
                                onClick={() => setLightboxImage({ url: album.coverImage, title: album.title })}
                                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white/70 hover:text-white hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100"
                                title="Quick Preview"
                            >
                                <Maximize2 size={16} />
                            </button>

                            {/* Year Badge */}
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[var(--color-clay)] font-mono text-[10px] uppercase font-bold tracking-widest">
                                    {album.year}
                                </span>
                            </div>

                            {/* Count Badge */}
                            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/70 font-mono text-[10px]">
                                <ImageIcon size={12} className="text-[var(--color-clay)]" />
                                <span>{album.imageCount} Photos</span>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="p-6 space-y-4">
                            <h3 className="text-2xl font-bold text-white group-hover:text-[var(--color-clay)] transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                                {album.title}
                            </h3>
                            <p className="text-xs text-white/60 leading-relaxed font-light">
                                {album.description}
                            </p>
                            <Link
                                href={`/gallery/${album.slug}`}
                                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-clay)] hover:translate-x-1 transition-transform"
                            >
                                <span>View Archive</span>
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6"
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        type="button"
                        onClick={() => setLightboxImage(null)}
                        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <div className="max-w-4xl w-full space-y-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={lightboxImage.url}
                            alt={lightboxImage.title}
                            className="max-h-[75vh] mx-auto rounded-2xl border border-white/10 shadow-2xl object-contain"
                        />
                        <p className="text-white font-mono text-sm font-bold">{lightboxImage.title}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
