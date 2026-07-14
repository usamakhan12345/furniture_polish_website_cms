import type { Block } from 'payload'
import { imageHelper } from '../fields/helpers'

export const FeedbackSectionBlock: Block = {
  slug: 'FeedbackSection',
  labels: {
    singular: 'Feedback Section',
    plural: 'Feedback Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'testimonials',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'company',
          type: 'text',
          label: 'Client Designation / Company',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Review Card Sub-heading (e.g. Highly Recommended)',
        },
        imageHelper('image', 'Client Avatar', false),
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
        },
      ],
    },
  ],
}
