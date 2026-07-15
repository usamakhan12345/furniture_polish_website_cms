import type { Block } from 'payload'
import { imageHelper, anchorIdHelper } from '../fields/helpers'

export const WhyChooseUsBlock: Block = {
  slug: 'WhyChooseUs',
  labels: {
    singular: 'Why Choose Us Section',
    plural: 'Why Choose Us Sections',
  },
  fields: [
    anchorIdHelper('why-choose-us'),
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading (e.g. :: Software Engineering)',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Main Section Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Section Paragraph Description',
    },
    imageHelper('image', 'Showcase Side Image', true),
    {
      name: 'features',
      type: 'array',
      label: 'Key Features Grid Items',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Feature Title (e.g. Speed to Market)',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Feature Description Text',
        },
      ],
    },
  ],
}
export default WhyChooseUsBlock
