import type { Block } from 'payload'
import { imageHelper, ctaHelper, anchorIdHelper } from '../fields/helpers'

export const FeaturedPostBlock: Block = {
  slug: 'FeaturedPost',
  labels: {
    singular: 'Featured Post',
    plural: 'Featured Posts',
  },
  fields: [
    anchorIdHelper('featured-post'),
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    imageHelper('image', 'Post Image', true),
    ctaHelper('cta', 'CTA Button'),
  ],
}
