import type { Block } from 'payload'
import { ctaHelper, anchorIdHelper } from '../fields/helpers'
import { VALUES } from '../content/siteContent'

/** Icon choices shown in the CMS; the frontend maps each value to a lucide icon. */
export const VALUE_ICON_OPTIONS = [
  { label: 'Wallet (pricing)', value: 'wallet' },
  { label: 'Award (experience)', value: 'award' },
  { label: 'Leaf (eco-friendly)', value: 'leaf' },
  { label: 'Sparkles (quality)', value: 'sparkles' },
  { label: 'Truck (on-site service)', value: 'truck' },
  { label: 'Shield (guarantee)', value: 'shield-check' },
  { label: 'Hammer (craftsmanship)', value: 'hammer' },
  { label: 'Clock (on time)', value: 'clock' },
  { label: 'Handshake (trust)', value: 'heart-handshake' },
  { label: 'Paintbrush (finishing)', value: 'paintbrush' },
]

export const CoreValuesBlock: Block = {
  slug: 'CoreValues',
  labels: {
    singular: 'Core Values Section',
    plural: 'Core Values Sections',
  },
  fields: [
    anchorIdHelper('values'),
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading (e.g. What We Stand For)',
      defaultValue: VALUES.subheading,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: VALUES.heading,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: VALUES.description,
    },
    ctaHelper('cta', 'Button (Optional)', undefined, false),
    {
      name: 'items',
      type: 'array',
      label: 'Values',
      minRows: 2,
      maxRows: 8,
      defaultValue: VALUES.items,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'sparkles',
          options: VALUE_ICON_OPTIONS,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
export default CoreValuesBlock
