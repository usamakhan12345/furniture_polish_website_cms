import type { Block } from 'payload'
import { imageHelper, ctaHelper } from '../fields/helpers'

export const WorkSliderBlock: Block = {
  slug: 'WorkSlider',
  labels: {
    singular: 'Work Slider',
    plural: 'Work Sliders',
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
        imageHelper('image', 'Card Image', true),
        {
          name: 'title',
          type: 'text',
          required: true,
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
