import type { Block } from 'payload'
import { imageHelper } from '../fields/helpers'

export const ServicesBlock: Block = {
  slug: 'Services',
  labels: {
    singular: 'Services Section',
    plural: 'Services Sections',
  },
  fields: [
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading (e.g. :: What we do)',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Section Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Section Description Summary Text',
    },
    {
      name: 'browseAllText',
      type: 'text',
      label: 'Right-aligned Link Text (e.g. Browse All Services)',
    },
    {
      name: 'browseAllLink',
      type: 'text',
      label: 'Right-aligned Link URL (e.g. #portfolio, /services)',
    },
    {
      name: 'services',
      type: 'array',
      label: 'Capabilities / Service Cards',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Service Title (e.g. Dedicated Engineering Teams)',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Service Description Summary',
        },
        imageHelper('icon', 'Service Icon (SVG/PNG)', false),
        {
          name: 'link',
          type: 'text',
          label: 'Card Target Link URL (Optional)',
        },
      ],
    },
  ],
}
export default ServicesBlock
