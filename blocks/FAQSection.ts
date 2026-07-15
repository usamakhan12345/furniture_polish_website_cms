import type { Block } from 'payload'
import { anchorIdHelper } from '../fields/helpers'

export const FAQSectionBlock: Block = {
  slug: 'FAQSection',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    anchorIdHelper('faq'),
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
      name: 'questions',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
