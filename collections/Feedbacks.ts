import type { CollectionConfig } from 'payload'

export const Feedbacks: CollectionConfig = {
  slug: 'feedbacks',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'rating', 'createdAt'],
  },
  access: {
    create: () => true, // Anyone can submit feedback
    read: () => true, // Anyone can read feedbacks (frontend API queries this list)
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
  ],
  timestamps: true,
}

export default Feedbacks
