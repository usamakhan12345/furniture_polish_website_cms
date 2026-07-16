import type { CollectionConfig } from 'payload'

export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'createdAt'],
  },
  access: {
    create: () => true, // Anyone can submit a message
    read: ({ req: { user } }) => !!user, // Only logged-in admin users can read them
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Sender Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Sender Email',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Sender Phone Number',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message Content',
    },
  ],
  timestamps: true,
}

export default Messages
