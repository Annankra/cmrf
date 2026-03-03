import type { CollectionConfig } from 'payload'

export const Albums: CollectionConfig = {
    slug: 'albums',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'year',
            type: 'text',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
        },
        {
            name: 'galleryImages',
            type: 'array',
            admin: {
                description: 'Add images to this album. You can select multiple images at once from the media library, and drag to reorder them.',
            },
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'caption',
                    type: 'text',
                },
            ],
        },
    ],
}
