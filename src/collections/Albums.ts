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
                // Auto-merge bulk-uploaded images into the galleryImages array
                if (data?.bulkImages && Array.isArray(data.bulkImages) && data.bulkImages.length > 0) {
                    const existing = Array.isArray(data.galleryImages) ? data.galleryImages : []
                    const newEntries = data.bulkImages.map((mediaId: string) => ({
                        image: mediaId,
                        caption: '',
                    }))
                    data.galleryImages = [...existing, ...newEntries]
                    // Clear the bulk field so it doesn't persist
                    data.bulkImages = []
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
        // Bulk upload field — select multiple images at once, they auto-merge into Gallery Images on save
        {
            name: 'bulkImages',
            type: 'upload',
            relationTo: 'media',
            hasMany: true,
            admin: {
                description: 'Select multiple images here, then save. They will be added to the Gallery Images below automatically.',
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
