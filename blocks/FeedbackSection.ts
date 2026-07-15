import type { Block } from 'payload'
import { imageHelper, anchorIdHelper } from '../fields/helpers'

export const FeedbackSectionBlock: Block = {
  slug: 'FeedbackSection',
  labels: {
    singular: 'Feedback Section',
    plural: 'Feedback Sections',
  },
  fields: [
    anchorIdHelper('feedback'),
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Section Heading (e.g. What Our Client Says.)',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading (Optional)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Subheading Description Paragraph text',
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
          label: 'Client Designation / Company (e.g. CEO)',
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
export default FeedbackSectionBlock
