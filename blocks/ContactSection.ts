import type { Block } from 'payload'

export const ContactSectionBlock: Block = {
  slug: 'ContactSection',
  labels: {
    singular: 'Contact Section',
    plural: 'Contact Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'phoneNumbers',
      type: 'array',
      label: 'Phone Numbers',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Phone Number (e.g. 0312-0129875)',
        },
      ],
    },
    {
      name: 'whatsappNumbers',
      type: 'array',
      label: 'WhatsApp Numbers',
      fields: [
        {
          name: 'whatsapp',
          type: 'text',
          required: true,
          label: 'WhatsApp Number (e.g. 0303-2584068)',
        },
      ],
    },
    {
      name: 'formSettings',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Recipient email address (e.g. info@company.com)',
          },
        },
        {
          name: 'successMessage',
          type: 'textarea',
          required: true,
          defaultValue: 'Thank you! Your message has been sent successfully.',
        },
      ],
    },
    {
      name: 'location',
      type: 'text',
      label: 'Office Address Location',
    },
    {
      name: 'mapUrl',
      type: 'text',
      admin: {
        placeholder: 'Google Maps embed or custom map URL link',
      },
    },
  ],
}
