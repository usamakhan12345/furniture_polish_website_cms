import type { Block } from 'payload'
import { imageHelper, anchorIdHelper } from '../fields/helpers'
import { PORTFOLIO } from '../content/siteContent'

export const PortfolioGridBlock: Block = {
  slug: 'PortfolioGrid',
  labels: {
    singular: 'Portfolio Grid Section',
    plural: 'Portfolio Grid Sections',
  },
  fields: [
    anchorIdHelper('portfolio-grid'),
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading (e.g. Our Work)',
      defaultValue: PORTFOLIO.subheading,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: PORTFOLIO.heading,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: PORTFOLIO.description,
    },
    {
      name: 'allLabel',
      type: 'text',
      label: 'Label of the "show everything" filter',
      defaultValue: PORTFOLIO.allLabel,
    },
    {
      name: 'projects',
      type: 'array',
      label: 'Projects',
      minRows: 1,
      fields: [
        imageHelper('image', 'Project Photo', true),
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'category',
          type: 'text',
          required: true,
          label: 'Category (becomes a filter button, e.g. Outdoor Decks)',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Project Description',
        },
      ],
    },
  ],
}
export default PortfolioGridBlock
