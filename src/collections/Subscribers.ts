import type { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
    slug: 'subscribers',
    labels: {
        singular: 'Subscriber',
        plural: 'Subscribers',
    },
    admin: {
        group: 'Community',
        defaultColumns: ['email', 'source', 'createdAt'],
        useAsTitle: 'email',
    },
    access: {
        create: () => false,
        read: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
    },
    fields: [
        {
            name: 'email',
            type: 'email',
            label: 'Email',
            required: true,
            unique: true,
            index: true,
        },
        {
            name: 'source',
            type: 'select',
            label: 'Source',
            defaultValue: 'newsletter',
            options: [
                { label: 'Newsletter', value: 'newsletter' },
                { label: 'Prayer Network', value: 'prayer' },
            ],
            required: true,
        },
    ],
}
