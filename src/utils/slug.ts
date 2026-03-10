import type { TextFieldValidation } from 'payload'

export const slugFieldValidation: TextFieldValidation = (val) => {
    if (!val) return 'Slug is required'
    if (Array.isArray(val)) return 'Slug cannot be an array'

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugRegex.test(val)) {
        return 'Invalid slug format. Use only lowercase letters, numbers, and hyphens (e.g., "my-event-2025"). No spaces or special characters allowed.'
    }
    return true
}
