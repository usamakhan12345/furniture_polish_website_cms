import type { Block } from 'payload'
import { imageHelper, anchorIdHelper } from '../fields/helpers'

export const WhoWeAreBlock: Block = {
  slug: 'WhoWeAre',
  labels: {
    singular: 'Who We Are Section',
    plural: 'Who We Are Sections',
  },
  fields: [
    anchorIdHelper('who-we-are'),
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading (e.g. :: Who we are)',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Main Heading title',
    },
    {
      name: 'description1',
      type: 'textarea',
      required: true,
      label: 'First Paragraph Description',
    },
    {
      name: 'description2',
      type: 'textarea',
      label: 'Second Paragraph Description (Optional)',
    },
    {
      name: 'card1',
      type: 'group',
      label: 'Top Image Card',
      fields: [
        imageHelper('image', 'Top Image', true),
        {
          name: 'statNumber',
          type: 'text',
          label: 'Stat Number (e.g. 50+)',
        },
        {
          name: 'statLabel',
          type: 'text',
          label: 'Stat Label (e.g. Projects shipped)',
        },
      ],
    },
    {
      name: 'card2',
      type: 'group',
      label: 'Bottom Image Card',
      fields: [
        imageHelper('image', 'Bottom Image', true),
        {
          name: 'statNumber',
          type: 'text',
          label: 'Stat Number (e.g. 10+)',
        },
        {
          name: 'statLabel',
          type: 'text',
          label: 'Stat Label (e.g. Years in business)',
        },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Highlight List Items',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Highlight Item Title (e.g. Case Studies)',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Highlight Item Description text',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Highlight Link URL (e.g. #portfolio, /cases)',
        },
      ],
    },
  ],
}
export default WhoWeAreBlock
