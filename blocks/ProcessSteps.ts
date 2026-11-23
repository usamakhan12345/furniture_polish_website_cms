import type { Block } from 'payload'
import { ctaHelper, anchorIdHelper } from '../fields/helpers'
import { PROCESS } from '../content/siteContent'

export const ProcessStepsBlock: Block = {
  slug: 'ProcessSteps',
  labels: {
    singular: 'Process Steps Section',
    plural: 'Process Steps Sections',
  },
  fields: [
    anchorIdHelper('process'),
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading (e.g. How We Work)',
      defaultValue: PROCESS.subheading,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: PROCESS.heading,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: PROCESS.description,
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Process Steps (numbered automatically)',
      minRows: 1,
      maxRows: 8,
      defaultValue: PROCESS.steps,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Step Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Step Description',
        },
        {
          name: 'duration',
          type: 'text',
          label: 'Small Tag (Optional, e.g. Free, 2–7 days)',
        },
      ],
    },
    {
      name: 'footnote',
      type: 'textarea',
      label: 'Footnote under the steps (Optional)',
      defaultValue: PROCESS.footnote,
    },
    ctaHelper('cta', 'Button (Optional)', undefined, false),
  ],
}
export default ProcessStepsBlock
