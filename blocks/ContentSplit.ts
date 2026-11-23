import type { Block } from 'payload'
import { imageHelper, ctaHelper, anchorIdHelper } from '../fields/helpers'
import { WOODS } from '../content/siteContent'

export const ContentSplitBlock: Block = {
  slug: 'ContentSplit',
  labels: {
    singular: 'Text + Image Section',
    plural: 'Text + Image Sections',
  },
  fields: [
    anchorIdHelper('content'),
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading (e.g. Our Story)',
      defaultValue: WOODS.subheading,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: WOODS.heading,
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      label: 'Paragraph Text',
      defaultValue: WOODS.body,
    },
    {
      name: 'points',
      type: 'array',
      label: 'Checklist Points (Optional)',
      defaultValue: WOODS.points.map((text) => ({ text })),
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    imageHelper('image', 'Image', true),
    {
      name: 'imageSide',
      type: 'select',
      defaultValue: 'right',
      label: 'Image Position',
      options: [
        { label: 'Image on the right', value: 'right' },
        { label: 'Image on the left', value: 'left' },
      ],
    },
    {
      name: 'tone',
      type: 'select',
      defaultValue: 'white',
      label: 'Background',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Warm cream', value: 'cream' },
      ],
    },
    {
      name: 'badge',
      type: 'group',
      label: 'Floating Badge on the Image (Optional)',
      fields: [
        {
          name: 'number',
          type: 'text',
          label: 'Badge Number (e.g. 35+ Years)',
          defaultValue: WOODS.badge.number,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Badge Label (e.g. Of master experience)',
          defaultValue: WOODS.badge.label,
        },
      ],
    },
    ctaHelper('cta', 'Button (Optional)', undefined, false),
  ],
}
export default ContentSplitBlock
