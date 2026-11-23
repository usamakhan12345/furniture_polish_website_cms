import type { Block } from 'payload'
import { anchorIdHelper } from '../fields/helpers'
import { CONTACT_FORM } from '../content/siteContent'

export const ContactFormBlock: Block = {
  slug: 'ContactForm',
  labels: {
    singular: 'Contact Form Section',
    plural: 'Contact Form Sections',
  },
  fields: [
    anchorIdHelper('contact-form'),
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading (e.g. Free Inspection)',
      defaultValue: CONTACT_FORM.subheading,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: CONTACT_FORM.heading,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: CONTACT_FORM.description,
    },
    {
      name: 'steps',
      type: 'array',
      label: '"What happens next" Steps (shown next to the form)',
      maxRows: 5,
      defaultValue: CONTACT_FORM.steps,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number for the "Prefer to talk?" line (Optional)',
      defaultValue: CONTACT_FORM.phone,
    },
    {
      name: 'services',
      type: 'array',
      label: 'Service Options (adds a "Service needed" dropdown; leave empty to hide it)',
      defaultValue: CONTACT_FORM.services.map((name) => ({ name })),
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'successMessage',
      type: 'textarea',
      required: true,
      defaultValue: CONTACT_FORM.successMessage,
    },
  ],
}
export default ContactFormBlock
