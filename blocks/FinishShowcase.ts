import type { Block } from 'payload'
import { anchorIdHelper } from '../fields/helpers'
import { FINISHES } from '../content/siteContent'

export const FinishShowcaseBlock: Block = {
  slug: 'FinishShowcase',
  labels: {
    singular: 'Finish Showcase Section',
    plural: 'Finish Showcase Sections',
  },
  fields: [
    anchorIdHelper('finishes'),
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading (e.g. Finishes)',
      defaultValue: FINISHES.subheading,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: FINISHES.heading,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: FINISHES.description,
    },
    {
      name: 'finishes',
      type: 'array',
      label: 'Finishes',
      minRows: 1,
      maxRows: 9,
      defaultValue: FINISHES.finishes,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Finish Name',
        },
        {
          name: 'sheenLevel',
          type: 'number',
          required: true,
          min: 1,
          max: 5,
          defaultValue: 3,
          label: 'Sheen Level (1 = matte, 5 = high gloss)',
        },
        {
          name: 'bestFor',
          type: 'text',
          label: 'Best For (e.g. Dining & study tables)',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'colorFrom',
          type: 'text',
          label: 'Swatch Colour: Light Tone (hex)',
          defaultValue: '#A6642B',
          admin: { placeholder: '#A6642B' },
        },
        {
          name: 'colorTo',
          type: 'text',
          label: 'Swatch Colour: Dark Tone (hex)',
          defaultValue: '#5A3216',
          admin: { placeholder: '#5A3216' },
        },
      ],
    },
  ],
}
export default FinishShowcaseBlock
