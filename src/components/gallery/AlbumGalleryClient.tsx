"use client";

import { useState } from "react";
import { FullscreenViewer, type GalleryImage } from "./FullscreenViewer";

interface AlbumGalleryClientProps {
    images: GalleryImage[];
    albumTitle: string;
}

export function AlbumGalleryClient({ images, albumTitle }: AlbumGalleryClientProps) {
    const [viewerIndex, setViewerIndex] = useState<number | null>(null);

    if (images.length === 0) {
        return (
            <div className="text-center py-20">
                <p
                    className="text-[var(--color-charcoal)]/60 text-lg"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    No images have been uploaded to this album yet.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setViewerIndex(i)}
                        className="group relative w-full aspect-square sm:aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[var(--color-charcoal)]/5 block text-left outline-none cursor-pointer will-change-transform shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-shadow duration-[0.8s]"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={img.url}
                            alt={img.alt}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05]"
                        />

                        {/* Soft Vignette/Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/90 via-[var(--color-charcoal)]/20 to-[var(--color-charcoal)]/10 opacity-60 group-hover:opacity-80 transition-opacity duration-700 mix-blend-multiply" />

                        {/* Hover overlay with modern expand icon micro-interaction */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-[var(--color-cream)]/90 backdrop-blur-md text-[var(--color-charcoal)] flex items-center justify-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-lg">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                            </div>
                        </div>

                        {/* Elegant Caption Overlay */}
                        {img.caption && (
                            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                                <p className="text-[var(--color-cream)] text-sm md:text-base font-medium leading-relaxed drop-shadow-md line-clamp-2">
                                    {img.caption}
                                </p>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Fullscreen Viewer */}
            {viewerIndex !== null && (
                <FullscreenViewer
                    images={images}
                    initialIndex={viewerIndex}
                    albumTitle={albumTitle}
                    onClose={() => setViewerIndex(null)}
                />
            )}
        </>
    );
}
