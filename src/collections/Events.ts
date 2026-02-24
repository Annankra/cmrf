import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
    slug: 'events',
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
            name: 'startDate',
            type: 'date',
            required: true,
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'd MMM yyy',
                },
            },
        },
        {
            name: 'endDate',
            type: 'date',
            required: true,
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'd MMM yyy',
                },
            },
        },
        {
            name: 'location',
            type: 'text',
            required: true,
        },
        {
            name: 'category',
            type: 'text',
            required: true,
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
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
            admin: {
                description: 'Short summary for the listing cards.',
            },
        },
        {
            name: 'content',
            type: 'richText',
            admin: {
                description: 'Full rich text details of the mission.',
            },
        },
    ],
}
