import type { Block } from 'payload'
import { imageHelper } from '../fields/helpers'

export const ProjectGalleryBlock: Block = {
  slug: 'ProjectGallery',
  labels: {
    singular: 'Project Gallery Section',
    plural: 'Project Gallery Sections',
  },
  fields: [
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading (e.g. :: Project gallery)',
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
      label: 'Section Description Text',
    },
    imageHelper('mainImage', 'Featured Large Image (Left Side)', true),
    {
      name: 'gridImages',
      type: 'array',
      label: 'Right Side Grid Images (Exactly 4 Items)',
      minRows: 4,
      maxRows: 4,
      fields: [
        imageHelper('image', 'Grid Image', true),
      ],
    },
  ],
}
export default ProjectGalleryBlock
