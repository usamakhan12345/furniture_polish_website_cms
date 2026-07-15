import type { GlobalConfig } from 'payload'
import { imageHelper } from '../fields/helpers'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    imageHelper('logo', 'Default Logo', false),
    imageHelper('footerLogo', 'Footer Specific Logo (Optional)', false),
    {
      name: 'navigationLinks',
      type: 'array',
      label: 'Standard Navigation Links (Fallback)',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'isExternal',
          type: 'checkbox',
          label: 'Is External / Section Anchor?',
          defaultValue: false,
        },
        {
          name: 'link',
          type: 'text',
          label: 'External URL or Anchor ID (e.g. #portfolio)',
          admin: {
            condition: (data, siblingData) => siblingData?.isExternal === true,
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
    },
    {
      name: 'navigationGroups',
      type: 'array',
      label: 'Grouped Navigation Columns (Multi-Column Layout)',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Column Title (e.g. Services, Quick Links)',
        },
        {
          name: 'links',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'isExternal',
              type: 'checkbox',
              label: 'Is External / Section Anchor?',
              defaultValue: false,
            },
            {
              name: 'link',
              type: 'text',
              label: 'External URL or Anchor ID (e.g. #portfolio)',
              admin: {
                condition: (data, siblingData) => siblingData?.isExternal === true,
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
        },
      ],
    },
    {
      name: 'companyInformation',
      type: 'textarea',
    },
    {
      name: 'copyright',
      type: 'text',
    },
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
    {
      name: 'contactInformation',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'text',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp Number (e.g. +92 300 1234567)',
        },
        {
          name: 'officeHours',
          type: 'text',
          label: 'Office Working Hours (e.g. Mon - Sat: 9 AM - 6 PM)',
        },
        {
          name: 'address',
          type: 'textarea',
        },
      ],
    },
  ],
}
export default Footer
