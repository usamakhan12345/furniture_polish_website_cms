import type { Block } from 'payload'
import { imageHelper, ctaHelper } from '../fields/helpers'

export const CallToActionSectionBlock: Block = {
  slug: 'CallToActionSection',
  labels: {
    singular: 'Call To Action',
    plural: 'Call To Actions',
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
    imageHelper('backgroundImage', 'Background Image', false),
    ctaHelper('cta', 'CTA Button'),
  ],
}
