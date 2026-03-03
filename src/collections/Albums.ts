import type { CollectionConfig } from 'payload'

export const Albums: CollectionConfig = {
    slug: 'albums',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    hooks: {
        beforeChange: [
            ({ data }) => {
                // Auto-merge the single helper image into the galleryImages array
                if (data?.bulkImage) {
                    const existing = Array.isArray(data.galleryImages) ? data.galleryImages : []
                    data.galleryImages = [
                        ...existing,
                        {
                            image: data.bulkImage,
                            caption: '',
                        },
                    ]
                    // Clear the helper field so it doesn't persist
                    data.bulkImage = null
                }
                return data
            },
        ],
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
        // Helper field — select a single image here, then save. It will be added to the Gallery Images below automatically.
        {
            name: 'bulkImage',
            type: 'upload',
            relationTo: 'media',
            admin: {
                description: 'Select an image here, then save. It will be added to the Gallery Images array below, and this field will reset for the next image.',
            },
        },
        {
            name: 'galleryImages',
            type: 'array',
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
