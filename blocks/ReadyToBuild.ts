import type { Block } from 'payload'
import { imageHelper, ctaHelper } from '../fields/helpers'

export const ReadyToBuildBlock: Block = {
  slug: 'ReadyToBuild',
  labels: {
    singular: 'Ready to Build Banner',
    plural: 'Ready to Build Banners',
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
