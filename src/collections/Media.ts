import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const hasVercelBlob = !!process.env.BLOB_READ_WRITE_TOKEN

export const Media: CollectionConfig = {
    slug: 'media',
    upload: {
        disableLocalStorage: hasVercelBlob,
        staticDir: hasVercelBlob ? undefined : path.resolve(dirname, '../../public/media'),
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'centre',
            },
            {
                name: 'tablet',
                width: 1024,
                height: undefined,
                position: 'centre',
            },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'],
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: false,
        },
    ],
}
