import type { GlobalConfig } from 'payload'
import { imageHelper, ctaHelper } from '../fields/helpers'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    imageHelper('logo', 'Logo', true),
    {
      name: 'navigationMenu',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g. /about or https://...',
          },
        },
      ],
    },
    ctaHelper('ctaButton', 'CTA Button'),
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'GitHub', value: 'github' },
          ],
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
