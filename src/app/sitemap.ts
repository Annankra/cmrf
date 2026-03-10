import type { MetadataRoute } from "next";
import { getPosts, getEvents, getAlbums } from "@/lib/payload";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://www.cmrfgh.com";

    // ── Static routes ──
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/mission`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/clinic`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/donate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `${baseUrl}/events`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
        { url: `${baseUrl}/get-involved`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    ];

    // ── Dynamic CMS routes ──
    let blogRoutes: MetadataRoute.Sitemap = [];
    let eventRoutes: MetadataRoute.Sitemap = [];
    let albumRoutes: MetadataRoute.Sitemap = [];

    try {
        const posts = await getPosts();
        blogRoutes = posts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }));
    } catch {
        // CMS unavailable — skip dynamic blog routes
    }

    try {
        const events = await getEvents();
        eventRoutes = events.map((event) => ({
            url: `${baseUrl}/events/${event.slug}`,
            lastModified: event.updatedAt ? new Date(event.updatedAt) : new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        }));
    } catch {
        // CMS unavailable — skip dynamic event routes
    }

    try {
        const albums = await getAlbums();
        albumRoutes = albums.map((album) => ({
            url: `${baseUrl}/gallery/${album.slug}`,
            lastModified: album.updatedAt ? new Date(album.updatedAt) : new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.5,
        }));
    } catch {
        // CMS unavailable — skip dynamic album routes
    }

    return [...staticRoutes, ...blogRoutes, ...eventRoutes, ...albumRoutes];
}
