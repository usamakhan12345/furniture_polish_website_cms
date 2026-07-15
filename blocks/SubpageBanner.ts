import type { Block } from 'payload'
import { imageHelper, ctaHelper } from '../fields/helpers'

export const SubpageBannerBlock: Block = {
  slug: 'SubpageBanner',
  labels: {
    singular: 'Subpage Banner Section',
    plural: 'Subpage Banner Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Banner Title Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Banner Description Subparagraph',
    },
    imageHelper('image', 'Right Showcase Illustration Image', true),
    ctaHelper('cta1', 'Primary CTA Button (Filled)'),
    ctaHelper('cta2', 'Secondary CTA Button (Outlined)'),
  ],
}
export default SubpageBannerBlock
