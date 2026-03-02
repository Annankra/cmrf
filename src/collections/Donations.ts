import type { CollectionConfig } from 'payload'

export const Donations: CollectionConfig = {
    slug: 'donations',
    labels: {
        singular: 'Donation',
        plural: 'Donations',
    },
    admin: {
        group: 'Donations',
        defaultColumns: ['donorName', 'amount', 'status', 'createdAt'],
        useAsTitle: 'donorName',
    },
    access: {
        // Donations are created programmatically via webhook — no public create
        create: () => false,
        read: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
    },
    fields: [
        {
            name: 'donorName',
            type: 'text',
            label: 'Donor Name',
        },
        {
            name: 'donorEmail',
            type: 'email',
            label: 'Donor Email',
        },
        {
            name: 'amount',
            type: 'number',
            label: 'Amount (cents)',
            required: true,
            admin: {
                description: 'Donation amount in cents (e.g. 2500 = $25.00)',
            },
        },
        {
            name: 'currency',
            type: 'text',
            label: 'Currency',
            defaultValue: 'usd',
        },
        {
            name: 'status',
            type: 'select',
            label: 'Status',
            defaultValue: 'pending',
            options: [
                { label: 'Pending', value: 'pending' },
                { label: 'Completed', value: 'completed' },
                { label: 'Failed', value: 'failed' },
            ],
            required: true,
        },
        {
            name: 'stripeSessionId',
            type: 'text',
            label: 'Stripe Session ID',
            unique: true,
            index: true,
            admin: {
                readOnly: true,
            },
        },
        {
            name: 'stripePaymentIntentId',
            type: 'text',
            label: 'Stripe Payment Intent ID',
            admin: {
                readOnly: true,
            },
        },
        {
            name: 'receiptSent',
            type: 'checkbox',
            label: 'Receipt Sent',
            defaultValue: false,
        },
    ],
}
