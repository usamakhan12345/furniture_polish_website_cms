import React from 'react'
import { HomeBanner } from './HomeBanner'
import { FeaturedPost } from './FeaturedPost'
import { StatsSection } from './StatsSection'
import { WorkSlider } from './WorkSlider'
import { FAQSection } from './FAQSection'
import { FeedbackSection } from './FeedbackSection'
import { ReadyToBuild } from './ReadyToBuild'
import { ContactSection } from './ContactSection'

const blockComponents: Record<string, React.ComponentType<any>> = {
  HomeBanner,
  FeaturedPost,
  StatsSection,
  WorkSlider,
  FAQSection,
  FeedbackSection,
  ReadyToBuild,
  ContactSection,
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
