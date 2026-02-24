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
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setViewerIndex(i)}
                        className="break-inside-avoid relative overflow-hidden group rounded-[1rem] sm:rounded-[2rem] shadow-sm block w-full text-left cursor-pointer border-none bg-transparent p-0"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={img.url}
                            alt={img.alt}
                            className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-[var(--color-charcoal)]/0 group-hover:bg-[var(--color-charcoal)]/30 transition-colors duration-500 flex items-center justify-center">
                            <span
                                className="text-[var(--color-cream)] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                View →
                            </span>
                        </div>
                        {img.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-charcoal)]/90 to-transparent p-6 pt-12 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <p
                                    className="text-[var(--color-cream)] text-sm"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
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
