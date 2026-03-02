import type { CollectionConfig } from 'payload'

export const Volunteers: CollectionConfig = {
    slug: 'volunteers',
    labels: {
        singular: 'Volunteer',
        plural: 'Volunteers',
    },
    admin: {
        group: 'Community',
        defaultColumns: ['name', 'email', 'area', 'createdAt'],
        useAsTitle: 'name',
    },
    access: {
        create: () => false,
        read: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: 'Full Name',
            required: true,
        },
        {
            name: 'email',
            type: 'email',
            label: 'Email',
            required: true,
        },
        {
            name: 'area',
            type: 'select',
            label: 'Area of Interest',
            required: true,
            options: [
                { label: 'Medical (Doctor / Nurse)', value: 'medical' },
                { label: 'Dental', value: 'dental' },
                { label: 'Optical / Eye Care', value: 'optical' },
                { label: 'Counselling', value: 'counselling' },
                { label: 'Logistics & Administration', value: 'logistics' },
                { label: 'Photography / Media', value: 'photography' },
                { label: 'Other', value: 'other' },
            ],
        },
        {
            name: 'message',
            type: 'textarea',
            label: 'Message',
        },
    ],
}
