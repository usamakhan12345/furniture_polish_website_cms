import React from 'react'
import { HomeBanner } from './HomeBanner'
import { WhoWeAre } from './WhoWeAre'
import { FeaturedPost } from './FeaturedPost'
import { StatsSection } from './StatsSection'
import { WorkSlider } from './WorkSlider'
import { WhyChooseUs } from './WhyChooseUs'
import { KeyImpacts } from './KeyImpacts'
import { Services } from './Services'
import { SubpageBanner } from './SubpageBanner'
import { ProjectGallery } from './ProjectGallery'
import { FAQSection } from './FAQSection'
import { FeedbackSection } from './FeedbackSection'
import { ReadyToBuild } from './ReadyToBuild'
import { ContactSection } from './ContactSection'
import { ContentSplit } from './ContentSplit'
import { JourneyTimeline } from './JourneyTimeline'
import { ProcessSteps } from './ProcessSteps'
import { CoreValues } from './CoreValues'
import { TeamSection } from './TeamSection'
import { FinishShowcase } from './FinishShowcase'
import { PortfolioGrid } from './PortfolioGrid'
import { ContactInfo } from './ContactInfo'
import { ContactForm } from './ContactForm'
import { MapSection } from './MapSection'

const blockComponents: Record<string, React.ComponentType<any>> = {
  HomeBanner,
  WhoWeAre,
  FeaturedPost,
  StatsSection,
  WorkSlider,
  WhyChooseUs,
  KeyImpacts,
  Services,
  SubpageBanner,
  ProjectGallery,
  FAQSection,
  FeedbackSection,
  ReadyToBuild,
  ContactSection,
  ContentSplit,
  JourneyTimeline,
  ProcessSteps,
  CoreValues,
  TeamSection,
  FinishShowcase,
  PortfolioGrid,
  ContactInfo,
  ContactForm,
  MapSection,
}

export interface BlockRendererProps {
  blocks?: any[] | null
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) return null

  return (
    <>
      {blocks.map((block, index) => {
        const { blockType, ...blockProps } = block
        const Component = blockComponents[blockType]

        if (!Component) {
          console.warn(`Block type "${blockType}" not registered in BlockRenderer.`)
          return null
        }

        return <Component key={`${blockType}-${index}`} {...blockProps} />
      })}
    </>
  )
}
export default BlockRenderer
