import type { Block } from 'payload'
import { anchorIdHelper } from '../fields/helpers'
import { JOURNEY } from '../content/siteContent'

export const JourneyTimelineBlock: Block = {
  slug: 'JourneyTimeline',
  labels: {
    singular: 'Journey Timeline Section',
    plural: 'Journey Timeline Sections',
  },
  fields: [
    anchorIdHelper('journey'),
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading (e.g. Our Journey)',
      defaultValue: JOURNEY.subheading,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: JOURNEY.heading,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: JOURNEY.description,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Timeline Milestones',
      minRows: 1,
      defaultValue: JOURNEY.items,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Year or Label (e.g. 1991, Today)',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Milestone Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Milestone Description',
        },
      ],
    },
  ],
}
export default JourneyTimelineBlock
