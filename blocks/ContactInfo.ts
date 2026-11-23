import type { Block } from 'payload'
import { anchorIdHelper } from '../fields/helpers'
import { CONTACT_INFO } from '../content/siteContent'

export const ContactInfoBlock: Block = {
  slug: 'ContactInfo',
  labels: {
    singular: 'Contact Info Cards Section',
    plural: 'Contact Info Cards Sections',
  },
  fields: [
    anchorIdHelper('contact-info'),
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading (e.g. Get in Touch)',
      defaultValue: CONTACT_INFO.subheading,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: CONTACT_INFO.heading,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: CONTACT_INFO.description,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Contact Cards',
      minRows: 1,
      maxRows: 8,
      defaultValue: CONTACT_INFO.items,
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'phone',
          label: 'Card Type (sets the icon and what the link does)',
          options: [
            { label: 'Phone (tap to call)', value: 'phone' },
            { label: 'WhatsApp (opens chat)', value: 'whatsapp' },
            { label: 'Email (opens mail app)', value: 'email' },
            { label: 'Address (opens Google Maps)', value: 'address' },
            { label: 'Opening Hours', value: 'hours' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Card Title (e.g. Call Us)',
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Number / Email / Address / Hours',
        },
      ],
    },
  ],
}
export default ContactInfoBlock
