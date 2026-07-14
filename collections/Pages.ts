import type { CollectionConfig } from 'payload'
import { HomeBannerBlock } from '../blocks/HomeBanner'
import { FeaturedPostBlock } from '../blocks/FeaturedPost'
import { StatsSectionBlock } from '../blocks/StatsSection'
import { WorkSliderBlock } from '../blocks/WorkSlider'
import { FAQSectionBlock } from '../blocks/FAQSection'
import { FeedbackSectionBlock } from '../blocks/FeedbackSection'
import { ReadyToBuildBlock } from '../blocks/ReadyToBuild'
import { ContactSectionBlock } from '../blocks/ContactSection'
import { imageHelper } from '../fields/helpers'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Meta Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
        },
        imageHelper('image', 'Meta Image (OG/Twitter)', false),
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HomeBannerBlock,
        FeaturedPostBlock,
        StatsSectionBlock,
        WorkSliderBlock,
        FAQSectionBlock,
        FeedbackSectionBlock,
        ReadyToBuildBlock,
        ContactSectionBlock,
      ],
    },
  ],
}
