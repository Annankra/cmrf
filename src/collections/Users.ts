import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
    slug: 'users',
    admin: {
        useAsTitle: 'email',
    },
    auth: true,
    access: {
        // Only admins can create new users
        create: ({ req: { user } }) => user?.role === 'admin',
        // Authenticated users can read user list (needed for admin UI)
        read: ({ req: { user } }) => Boolean(user),
        // Users can update themselves; admins can update anyone
        update: ({ req: { user }, id }) => {
            if (!user) return false
            if (user.role === 'admin') return true
            return user.id === id
        },
        // Only admins can delete users
        delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
        // Email added by default
        // Add more fields as needed
        {
            name: 'role',
            type: 'select',
            options: ['admin', 'editor'],
            defaultValue: 'editor',
            required: true,
            access: {
                // Only admins can change roles (prevents privilege escalation)
                update: ({ req: { user } }) => user?.role === 'admin',
            },
        }
    ],
}
