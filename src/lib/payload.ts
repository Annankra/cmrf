import { getPayload as getPayloadClient } from 'payload'
import config from '@payload-config'
import type { Event, Post, Album, Media } from '@/payload-types'

/** Get the Payload Local API client (server-side only) */
export async function getPayload() {
    return getPayloadClient({ config })
}

const VERCEL_BLOB_BASE = "https://umiff0vttpz6cxtl.public.blob.vercel-storage.com";

/** Helper to resolve a Media relation to a URL */
export function getMediaUrl(media: number | Media | null | undefined): string | null {
    if (!media || typeof media === 'number') return null
    if (media.filename) {
        return `${VERCEL_BLOB_BASE}/${media.filename}`
    }
    if (media.url?.startsWith('/api/media/file/')) {
        const filename = media.url.replace('/api/media/file/', '')
        return `${VERCEL_BLOB_BASE}/${filename}`
    }
    return media.url || null
}

/** Helper to resolve a Media relation to its alt text */
export function getMediaAlt(media: number | Media | null | undefined): string {
    if (!media || typeof media === 'number') return ''
    return media.alt || ''
}

/** Fetch all upcoming events (featured first, then by date) */
export async function getEvents(): Promise<Event[]> {
    const payload = await getPayload()
    const result = await payload.find({
        collection: 'events',
        sort: '-startDate',
        limit: 50,
        depth: 1, // populate media relations
    })
    return result.docs
}

/** Fetch all blog posts (featured first, then by date) */
export async function getPosts(): Promise<Post[]> {
    const payload = await getPayload()
    const result = await payload.find({
        collection: 'posts',
        sort: '-date',
        limit: 100,
        depth: 1,
    })
    return result.docs
}

/** Fetch a single post by slug */
export async function getPostBySlug(slug: string): Promise<Post | null> {
    const payload = await getPayload()
    const result = await payload.find({
        collection: 'posts',
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 1,
    })
    return result.docs[0] || null
}

/** Fetch a single event by slug */
export async function getEventBySlug(slug: string): Promise<Event | null> {
    const payload = await getPayload()
    const result = await payload.find({
        collection: 'events',
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 1,
    })
    return result.docs[0] || null
}

/** Fetch all photo albums */
export async function getAlbums(): Promise<Album[]> {
    const payload = await getPayload()
    const result = await payload.find({
        collection: 'albums',
        sort: '-year',
        limit: 50,
        depth: 1,
    })
    return result.docs
}

/** Fetch a single album by slug with full gallery images */
export async function getAlbumBySlug(slug: string): Promise<Album | null> {
    const payload = await getPayload()
    const result = await payload.find({
        collection: 'albums',
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 2, // deeper for nested galleryImages.image
    })
    return result.docs[0] || null
}
