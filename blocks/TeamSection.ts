import type { Block } from 'payload'
import { imageHelper, anchorIdHelper } from '../fields/helpers'
import { TEAM } from '../content/siteContent'

export const TeamSectionBlock: Block = {
  slug: 'TeamSection',
  labels: {
    singular: 'Team / Craftsmen Section',
    plural: 'Team / Craftsmen Sections',
  },
  fields: [
    anchorIdHelper('team'),
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading (e.g. Our Craftsmen)',
      defaultValue: TEAM.subheading,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: TEAM.heading,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: TEAM.description,
    },
    {
      name: 'members',
      type: 'array',
      label: 'Team Members or Crews',
      minRows: 1,
      defaultValue: TEAM.members,
      fields: [
        imageHelper('image', 'Photo (Optional)', false),
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Name (a person or a crew, e.g. Master Polishers)',
        },
        {
          name: 'role',
          type: 'text',
          label: 'Role / Speciality',
        },
        {
          name: 'experience',
          type: 'text',
          label: 'Experience Badge (Optional, e.g. 35+ years)',
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'Short Description',
        },
      ],
    },
  ],
}
export default TeamSectionBlock
