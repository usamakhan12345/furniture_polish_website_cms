import type { UploadField, GroupField } from 'payload'

/**
 * Reusable helper field for images.
 * Uses Payload's upload field type to show rich thumbnail previews and direct file uploading.
 */
export const imageHelper = (
  name: string = 'image',
  label: string = 'Image',
  required: boolean = true,
  overrides?: Partial<UploadField>
): UploadField => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
  required,
  ...overrides,
} as UploadField)

/**
 * Reusable helper field for Call to Action buttons.
 * Conditionally shows External Link or Internal Page depending on the checkbox.
 */
export const ctaHelper = (
  name: string = 'cta',
  label: string = 'Call to Action',
  overrides?: Partial<GroupField>
): GroupField => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
      label: 'Button Text',
    },
    {
      name: 'isExternal',
      type: 'checkbox',
      label: 'Is External Link?',
      defaultValue: false,
    },
    {
      name: 'link',
      type: 'text',
      label: 'External Link or Section ID',
      admin: {
        condition: (data, siblingData) => siblingData?.isExternal === true,
        placeholder: 'e.g., https://example.com or #services (for smooth scrolling)',
      },
    },
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Internal Page Link',
      admin: {
        condition: (data, siblingData) => siblingData?.isExternal !== true,
      },
    },
  ],
  ...overrides,
} as GroupField)

import type { TextField } from 'payload'

export const anchorIdHelper = (defaultPlaceholder: string = 'section-id'): TextField => ({
  name: 'anchorId',
  type: 'text',
  label: 'Section Anchor ID (for links)',
  admin: {
    description: `Specify an HTML ID (without #) to link directly to this section (e.g. ${defaultPlaceholder}). If left blank, it defaults to ${defaultPlaceholder}.`,
    placeholder: defaultPlaceholder,
  },
})
