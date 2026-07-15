import type { CollectionConfig } from 'payload'
import { HomeBannerBlock } from '../blocks/HomeBanner'
import { WhoWeAreBlock } from '../blocks/WhoWeAre'
import { FeaturedPostBlock } from '../blocks/FeaturedPost'
import { StatsSectionBlock } from '../blocks/StatsSection'
import { WorkSliderBlock } from '../blocks/WorkSlider'
import { WhyChooseUsBlock } from '../blocks/WhyChooseUs'
import { KeyImpactsBlock } from '../blocks/KeyImpacts'
import { ServicesBlock } from '../blocks/Services'
import { SubpageBannerBlock } from '../blocks/SubpageBanner'
import { ProjectGalleryBlock } from '../blocks/ProjectGallery'
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
        WhoWeAreBlock,
        FeaturedPostBlock,
        StatsSectionBlock,
        WorkSliderBlock,
        WhyChooseUsBlock,
        KeyImpactsBlock,
        ServicesBlock,
        SubpageBannerBlock,
        ProjectGalleryBlock,
        FAQSectionBlock,
        FeedbackSectionBlock,
        ReadyToBuildBlock,
        ContactSectionBlock,
      ],
    },
  ],
}
