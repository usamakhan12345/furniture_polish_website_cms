import type { CollectionConfig, Where } from 'payload'

/**
 * Reviews visible on the public website: the ones an admin accepted.
 *
 * Reviews saved before moderation existed have no `status`. They were already public, so they
 * keep counting as accepted instead of silently vanishing from the site.
 */
export const publicFeedbackWhere: Where = {
  or: [{ status: { equals: 'approved' } }, { status: { exists: false } }],
}

export const Feedbacks: CollectionConfig = {
  slug: 'feedbacks',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'rating', 'status', 'createdAt'],
  },
  defaultSort: '-createdAt',
  access: {
    create: () => true, // Anyone can submit a review (it starts out as "pending")
    // Visitors only ever see accepted reviews; logged-in admins see everything to moderate it.
    read: ({ req: { user } }) => (user ? true : publicFeedbackWhere),
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Client Name',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Client Designation / Company',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Review Headline (Optional)',
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
      label: 'Rating (1 to 5 Stars)',
    },
    {
      name: 'feedback',
      type: 'textarea',
      required: true,
      label: 'Feedback / Review Content',
    },
    {
      name: 'status',
      type: 'radio',
      label: 'Review Status',
      required: true,
      defaultValue: 'pending',
      index: true,
      options: [
        { label: 'Pending (under review)', value: 'pending' },
        { label: 'Accept (show on website)', value: 'approved' },
        { label: 'Reject (keep hidden)', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Only accepted reviews appear on the website.',
      },
      access: {
        // Visitors can submit a review, but only an admin can decide its outcome.
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
      },
      hooks: {
        // Legacy reviews (no status stored) show as accepted, matching `publicFeedbackWhere`.
        afterRead: [({ value }) => value ?? 'approved'],
      },
    },
  ],
  timestamps: true,
}

export default Feedbacks
