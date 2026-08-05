import { buildConfig } from 'payload'
let sharp: any;
try {
    sharp = require('sharp')
} catch {
    // sharp binary not available in edge/serverless runtime
}
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'
import dns from 'node:dns'

// Force IPv4-first resolution for Vercel IPv4-only build containers
try {
    dns.setDefaultResultOrder('ipv4first')
} catch {
    // ignore
}

import { Users } from './collections/Users.ts'
import { Media } from './collections/Media.ts'
import { Events } from './collections/Events.ts'
import { Posts } from './collections/Posts.ts'
import { Albums } from './collections/Albums.ts'
import { Donations } from './collections/Donations.ts'
import { Subscribers } from './collections/Subscribers.ts'
import { Volunteers } from './collections/Volunteers.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isProduction = process.env.NODE_ENV === 'production'
let dbUri = process.env.DATABASE_URI || ''

// Auto-fix common Supabase URI mixups:
// Direct Supabase host (db.[ref].supabase.co or port 5432) requires username "postgres" (without .[ref] suffix)
if (dbUri.includes('db.') && dbUri.includes('.supabase.co') && dbUri.includes('postgres.')) {
    dbUri = dbUri.replace(/postgresql:\/\/postgres\.[a-z0-9]+:/, 'postgresql://postgres:')
}

const isLocalhost = dbUri.includes('127.0.0.1') || dbUri.includes('localhost')
const isRemoteSupabase = (dbUri.includes('supabase.co') || dbUri.includes('supabase.com')) && !isLocalhost
const useSsl = isRemoteSupabase || (isProduction && !isLocalhost)

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.cmrfgh.com',
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Users, Media, Events, Posts, Albums, Donations, Subscribers, Volunteers],
    editor: lexicalEditor({}),
    db: postgresAdapter({
        pool: {
            connectionString: dbUri,
            max: isProduction ? 10 : 5,
            ssl: useSsl ? { rejectUnauthorized: false } : false,
        },
        push: true, // Force schema push in production to keep DB in sync without migration build failures
    }),
    secret: process.env.PAYLOAD_SECRET || (() => { throw new Error('PAYLOAD_SECRET environment variable is required') })(),
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    plugins: [
        vercelBlobStorage({
            enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
            collections: {
                media: true
            },
            token: process.env.BLOB_READ_WRITE_TOKEN || 'dummy-token',
        }),
    ],
    ...(sharp ? { sharp } : {}),
})
