import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'

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

export default buildConfig({
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
            connectionString: process.env.DATABASE_URI || '',
        },
    }),
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-dev',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    plugins: [
        vercelBlobStorage({
            collections: {
                media: true
            },
            // The token is pulled automatically from process.env.BLOB_READ_WRITE_TOKEN by default
            token: process.env.BLOB_READ_WRITE_TOKEN,
            // Client-side uploads bypass Vercel's 4.5MB serverless function limit
            clientUploads: true,
        }),
    ],
})
