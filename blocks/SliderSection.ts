import type { Block } from 'payload'
import { imageHelper, ctaHelper } from '../fields/helpers'

export const SliderSectionBlock: Block = {
  slug: 'SliderSection',
  labels: {
    singular: 'Slider Section',
    plural: 'Slider Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        imageHelper('image', 'Slide Image', true),
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        ctaHelper('cta', 'CTA Button'),
      ],
    },
  ],
}
