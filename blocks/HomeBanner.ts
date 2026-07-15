import type { Block } from 'payload'
import { imageHelper, ctaHelper, anchorIdHelper } from '../fields/helpers'

export const HomeBannerBlock: Block = {
  slug: 'HomeBanner',
  labels: {
    singular: 'Home Banner',
    plural: 'Home Banners',
  },
  fields: [
    anchorIdHelper('home'),
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subHeading',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    imageHelper('backgroundImage', 'Background Image', false),
    imageHelper('backgroundVideo', 'Background Video (Loops, overrides image)', false),
    ctaHelper('ctaButton', 'Primary CTA Button'),
    ctaHelper('secondaryCta', 'Secondary CTA Button'),
  ],
}
