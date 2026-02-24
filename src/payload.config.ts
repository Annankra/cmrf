import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users.ts'
import { Media } from './collections/Media.ts'
import { Events } from './collections/Events.ts'
import { Posts } from './collections/Posts.ts'
import { Albums } from './collections/Albums.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Users, Media, Events, Posts, Albums],
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
})
