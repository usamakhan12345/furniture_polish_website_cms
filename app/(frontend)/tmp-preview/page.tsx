// TEMPORARY visual-check harness for the new inner-page sections — deleted right after verification.
import React from 'react'
import { BlockRenderer } from '../components/common/BlockRenderer'
import {
  CONTACT_FORM,
  CONTACT_INFO,
  FINISHES,
  JOURNEY,
  MAP,
  PROCESS,
  TEAM,
  VALUES,
  WOODS,
} from '../../../content/siteContent'

const photo = (hue: number, label: string) => {
  const planks = Array.from({ length: 14 })
    .map(
      (_, i) =>
        `<rect x='0' y='${i * 64}' width='1200' height='62' fill='hsl(${hue + (i % 3) * 3},${45 + (i % 4) * 4}%,${26 + (i % 5) * 3}%)'/>`,
    )
    .join('')
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='900' viewBox='0 0 1200 900'>${planks}<text x='50' y='850' font-family='sans-serif' font-size='46' font-weight='700' fill='rgba(255,255,255,0.6)'>${label}</text></svg>`
  return { url: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`, alt: label }
}

const cta = (text: string, link: string) => ({ text, isExternal: true, link })

const projects = [
  ['Sofas & Chairs', 'Vintage Sofa Set Restoration', 22],
  ['Dining & Tables', 'Solid Oak Dining Table Polish', 28],
  ['Outdoor Decks', 'Outdoor Cedar Deck Weatherproofing', 34],
  ['Bedroom Sets', 'Teak Bedroom Headboard Polish', 18],
  ['Doors & Cabinets', 'Traditional Main Entrance Door Finish', 12],
].map(([category, title, hue]) => ({
  category,
  title,
  description:
    'Complete deep cleaning, repair of joint cracks, and hand-rubbed finish. Brought back the authentic dark cherry glow.',
  image: photo(hue as number, title as string),
}))

const parts: Record<string, any[]> = {
  '1': [
    { blockType: 'ContentSplit', ...WOODS, points: WOODS.points.map((text) => ({ text })), image: photo(24, 'Woods'), imageSide: 'left', tone: 'cream' },
    { blockType: 'JourneyTimeline', ...JOURNEY },
    { blockType: 'ProcessSteps', ...PROCESS, cta: cta('Book a Free Inspection', '/contact') },
  ],
  '4': [{ blockType: 'ProcessSteps', ...PROCESS, cta: cta('Book a Free Inspection', '/contact') }],
  '2': [
    { blockType: 'CoreValues', ...VALUES, cta: cta('Get a Free Quote', '/contact') },
    { blockType: 'TeamSection', ...TEAM },
    { blockType: 'FinishShowcase', ...FINISHES },
  ],
  '3': [
    { blockType: 'PortfolioGrid', subheading: 'Our Work', heading: 'Projects We’re Proud Of', description: 'Select a category to filter.', allLabel: 'All Projects', projects },
    { blockType: 'ContactInfo', ...CONTACT_INFO },
    { blockType: 'ContactForm', ...CONTACT_FORM, services: CONTACT_FORM.services.map((name) => ({ name })) },
    { blockType: 'MapSection', ...MAP },
  ],
  '5': [
    { blockType: 'ContactInfo', ...CONTACT_INFO },
    { blockType: 'ContactForm', ...CONTACT_FORM, services: CONTACT_FORM.services.map((name) => ({ name })) },
  ],
}

export default async function Page({ searchParams }: { searchParams: Promise<{ part?: string }> }) {
  const { part = '1' } = await searchParams
  return (
    <main>
      <BlockRenderer blocks={parts[part] || parts['1']} />
    </main>
  )
}
