import type { Block } from 'payload'
import { ctaHelper, anchorIdHelper } from '../fields/helpers'

export const StatsSectionBlock: Block = {
  slug: 'StatsSection',
  labels: {
    singular: 'Stats Section',
    plural: 'Stats Sections',
  },
  fields: [
    anchorIdHelper('stats'),
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading (e.g. :: What we do)',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    ctaHelper('cta1', 'Primary Button (Lets Contact)'),
    ctaHelper('cta2', 'Secondary Button (View Work)'),
    {
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          label: 'Stat Number (e.g. 30+, 10+)',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Stat Label (e.g. Global clients)',
        },
      ],
    },
  ],
}
