import type { Block } from 'payload'
import { imageHelper } from '../fields/helpers'

export const KeyImpactsBlock: Block = {
  slug: 'KeyImpacts',
  labels: {
    singular: 'Key Impacts Section',
    plural: 'Key Impacts Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Section Heading (e.g. Key Impacts)',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Section Description Subparagraph',
    },
    {
      name: 'impacts',
      type: 'array',
      label: 'Impact Cards',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Card Title (e.g. Sovereign Data)',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Card Description text',
        },
        imageHelper('icon', 'Card Icon (Upload SVG/PNG)', false),
      ],
    },
  ],
}
export default KeyImpactsBlock
