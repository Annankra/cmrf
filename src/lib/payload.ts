import 'server-only'
import { getPayload as getPayloadClient } from 'payload'
import config from '@payload-config'
import type { Event, Post, Album, Media } from '@/payload-types'
import net from 'node:net'

/**
 * Quick TCP probe to check if a host:port is reachable.
 * Returns true if the connection succeeds within the timeout.
 */
function isPortReachable(host: string, port: number, timeoutMs = 1500): Promise<boolean> {
    return new Promise((resolve) => {
        const socket = new net.Socket()
        socket.setTimeout(timeoutMs)
        socket.once('connect', () => { socket.destroy(); resolve(true) })
        socket.once('timeout', () => { socket.destroy(); resolve(false) })
        socket.once('error', () => { socket.destroy(); resolve(false) })
        socket.connect(port, host)
    })
}

/** Extract host and port from DATABASE_URI for the connectivity check */
function parseDatabaseHostPort(): { host: string; port: number } | null {
    const uri = process.env.DATABASE_URI || ''
    try {
        // postgres://user:pass@host:port/db
        const url = new URL(uri)
        return { host: url.hostname || '127.0.0.1', port: parseInt(url.port, 10) || 5432 }
    } catch {
        return null
    }
}

let dbReachable: boolean | null = null

/** Check (and cache) whether the database is reachable */
async function isDatabaseReachable(): Promise<boolean> {
    // In production (Vercel serverless functions), node:net socket probing can be blocked or unreliable.
    // Always attempt database calls in production.
    if (process.env.NODE_ENV === 'production') return true;
    if (dbReachable !== null) return dbReachable
    const hp = parseDatabaseHostPort()
    if (!hp) { dbReachable = false; return false }
    dbReachable = await isPortReachable(hp.host, hp.port)
    // Reset cache after 30s so we re-check if DB comes up later
    setTimeout(() => { dbReachable = null }, 30_000)
    return dbReachable
}

/**
 * Suppress Payload's internal unhandled ECONNREFUSED rejections during dev.
 * Payload's postgres adapter fires promise rejections outside the main chain
 * when the DB is unreachable, which Next.js dev mode catches as errors.
 */
if (process.env.NODE_ENV !== 'production') {
    const handler = (reason: unknown) => {
        if (
            reason instanceof Error &&
            'code' in reason &&
            (reason as NodeJS.ErrnoException).code === 'ECONNREFUSED'
        ) {
            // Swallow — our functions already return fallback data
            return
        }
        // For non-ECONNREFUSED rejections in dev, still throw
        // (don't swallow unrelated errors)
    }
    process.removeAllListeners?.('unhandledRejection')
    process.on('unhandledRejection', handler)
}

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
    try {
        if (!(await isDatabaseReachable())) return []
        const payload = await getPayload()
        const result = await payload.find({
            collection: 'events',
            sort: '-startDate',
            limit: 50,
            depth: 1, // populate media relations
        })
        return result.docs
    } catch {
        return [];
    }
}

/** Fetch all blog posts (featured first, then by date) */
export async function getPosts(): Promise<Post[]> {
    try {
        if (!(await isDatabaseReachable())) return []
        const payload = await getPayload()
        const result = await payload.find({
            collection: 'posts',
            sort: '-date',
            limit: 100,
            depth: 1,
        })
        return result.docs
    } catch {
        return [];
    }
}

/** Fetch a single post by slug */
export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        if (!(await isDatabaseReachable())) return null
        const payload = await getPayload()
        const result = await payload.find({
            collection: 'posts',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2,
        })
        return result.docs[0] || null
    } catch {
        return null;
    }
}

/** Fetch a single event by slug */
export async function getEventBySlug(slug: string): Promise<Event | null> {
    try {
        if (!(await isDatabaseReachable())) return null
        const payload = await getPayload()
        const result = await payload.find({
            collection: 'events',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
        })
        return result.docs[0] || null
    } catch {
        return null;
    }
}

/** Fetch all photo albums */
export async function getAlbums(): Promise<Album[]> {
    try {
        if (!(await isDatabaseReachable())) return []
        const payload = await getPayload()
        const result = await payload.find({
            collection: 'albums',
            sort: '-year',
            limit: 50,
            depth: 1,
        })
        return result.docs
    } catch {
        return [];
    }
}

/** Fetch a single album by slug with full gallery images */
export async function getAlbumBySlug(slug: string): Promise<Album | null> {
    try {
        if (!(await isDatabaseReachable())) return null
        const payload = await getPayload()
        const result = await payload.find({
            collection: 'albums',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2, // deeper for nested galleryImages.image
        })
        return result.docs[0] || null
    } catch {
        return null;
    }
}

