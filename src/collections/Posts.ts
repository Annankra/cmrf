import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
    slug: 'posts',
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
            name: 'date',
            type: 'date',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'tags',
            type: 'array',
            fields: [
                {
                    name: 'tag',
                    type: 'text',
                },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'featured',
            type: 'checkbox',
            defaultValue: false,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'excerpt',
            type: 'textarea',
            required: true,
            admin: {
                description: 'Short summary for the blog card grid.',
            },
        },
        {
            name: 'content',
            type: 'richText',
            admin: {
                description: 'Full rich text blog content.',
            },
        },
        {
            name: 'legacyUrl',
            type: 'text',
            admin: {
                position: 'sidebar',
                description: 'Original Squarespace URL (for reference/redirects).',
            },
        },
    ],
}
