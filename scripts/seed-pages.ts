/**
 * Creates the inner pages (Contact, Experience, About) from real website content.
 *
 *   Dry run (reads only):  DRY_RUN=1 npx tsx --env-file=.env scripts/seed-pages.ts
 *   Create the pages:               npx tsx --env-file=.env scripts/seed-pages.ts
 *
 * - Text comes from `content/siteContent.ts` and from the existing home page (stats, FAQs,
 *   testimonials, projects), so nothing here is invented.
 * - Photos are looked up by filename in the media library; nothing is uploaded.
 * - Safe to re-run: a page whose slug already exists is skipped, never overwritten. To rebuild a
 *   page, delete it in the CMS first and run this again.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  BUSINESS,
  CONTACT_FORM,
  CONTACT_INFO,
  FINISHES,
  JOURNEY,
  MAP,
  PORTFOLIO,
  PROCESS,
  STORY,
  TEAM,
  VALUES,
  WOODS,
} from '../content/siteContent'

const DRY_RUN = !!process.env.DRY_RUN

// Photos that already exist in the media library (looked up by filename)
const PHOTOS = {
  contactBanner: 'home_banner_image-5.jpg',
  experienceBanner: 'clay-banks-Bpaie4LlJSY-unsplash.jpg',
  aboutBanner: 'ryan-riggins-9v7UJS92HYc-unsplash.jpg',
  woods: 'erik-mclean-5nc3d38P26I-unsplash.jpg',
  story: 'clay-banks-Fr62lAJFnII-unsplash.jpg',
}

const cta = (text: string, link: string) => ({ text, isExternal: true, link })

/** Drops Payload's generated row ids so cloned rows are saved as new rows. */
const stripIds = <T,>(value: T): T => {
  if (Array.isArray(value)) return value.map(stripIds) as unknown as T
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      if (key === 'id' || key === '_id') continue
      out[key] = stripIds(val)
    }
    return out as T
  }
  return value
}

async function main() {
  const payload = await getPayload({ config })

  const mediaId = async (filename: string): Promise<string> => {
    const res = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
      depth: 0,
      select: { filename: true },
      overrideAccess: true,
    })
    const doc = res.docs[0]
    if (!doc) throw new Error(`Media file not found in the library: ${filename}`)
    return String(doc.id)
  }

  // ---- Real content already on the home page ------------------------------------------------
  const homeRes = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const home = homeRes.docs[0] as any
  if (!home) throw new Error('The "home" page was not found, so there is no real content to reuse.')

  const homeBlock = (type: string): any => {
    const block = (home.layout || []).find((b: any) => b.blockType === type)
    if (!block) throw new Error(`The home page has no ${type} block to reuse.`)
    return block
  }
  const homeReady = homeBlock('ReadyToBuild')
  const homeStats = homeBlock('StatsSection')
  const homeFaq = homeBlock('FAQSection')
  const homeFeedback = homeBlock('FeedbackSection')
  const homeSlider = homeBlock('WorkSlider')

  // ---- Photos --------------------------------------------------------------------------------
  const photo = {
    contactBanner: await mediaId(PHOTOS.contactBanner),
    experienceBanner: await mediaId(PHOTOS.experienceBanner),
    aboutBanner: await mediaId(PHOTOS.aboutBanner),
    woods: await mediaId(PHOTOS.woods),
    story: await mediaId(PHOTOS.story),
  }

  // ---- Blocks reused across pages ------------------------------------------------------------
  const readyToBuild = {
    blockType: 'ReadyToBuild',
    heading: homeReady.heading,
    description: homeReady.description,
    backgroundImage: homeReady.backgroundImage,
    cta: cta('Book a Free Inspection', '/contact'),
  }

  const statsBlock = (secondLink: string, secondText: string) => ({
    blockType: 'StatsSection',
    anchorId: 'stats',
    subheading: homeStats.subheading,
    heading: homeStats.heading,
    description: homeStats.description,
    cta1: cta('Book Free Inspection', '/contact'),
    cta2: cta(secondText, secondLink),
    stats: stripIds(homeStats.stats),
  })

  // The home FAQ lists "on-site or workshop?" twice (the second answer is cut off), so keep one
  const faqBlock = {
    blockType: 'FAQSection',
    anchorId: 'faq',
    heading: 'Frequently Asked Questions',
    description: 'Quick answers to the questions we hear most about polishing, timing and care.',
    questions: stripIds(
      (homeFaq.questions || []).filter((q: any) => !/inside my house/i.test(q.question || '')),
    ),
  }

  // Home testimonials, minus the "testing card" placeholder headlines. One 1-star rating sits on a
  // glowing review, which is clearly a data-entry slip, so it is shown as 5 stars here.
  const feedbackBlock = {
    blockType: 'FeedbackSection',
    anchorId: 'testimonials',
    heading: homeFeedback.heading,
    subheading: homeFeedback.subheading || '',
    description: homeFeedback.description,
    testimonials: stripIds(homeFeedback.testimonials || []).map((t: any) => ({
      ...t,
      title: /test/i.test(t.title || '') ? '' : t.title,
      rating: t.rating < 3 && /excellent|recommended/i.test(t.feedback || '') ? 5 : t.rating,
    })),
  }

  // Projects: titles, descriptions and photos come straight from the home page's WorkSlider
  const portfolioBlock = {
    blockType: 'PortfolioGrid',
    anchorId: 'portfolio-grid',
    subheading: PORTFOLIO.subheading,
    heading: PORTFOLIO.heading,
    description: PORTFOLIO.description,
    allLabel: PORTFOLIO.allLabel,
    projects: (homeSlider.slides || []).map((slide: any, i: number) => ({
      image: slide.image,
      title: String(slide.title || '').replace(/:\s*$/, ''),
      category: PORTFOLIO.categories[i] || 'More Projects',
      description: slide.description,
    })),
  }

  const withPoints = (points: readonly string[]) => points.map((text) => ({ text }))
  const whatsappDigits = BUSINESS.whatsapp.replace(/\D/g, '').replace(/^0/, '92')

  // ---- Pages ---------------------------------------------------------------------------------
  const pages = [
    {
      slug: 'contact',
      title: 'Contact',
      seo: {
        title: 'Contact Us',
        description: `Call, WhatsApp or visit ${BUSINESS.name} in North Karachi for a free inspection and a clear quote on your wood polishing project.`,
      },
      layout: [
        {
          blockType: 'SubpageBanner',
          anchorId: 'contact-banner',
          heading: 'Contact Us',
          description:
            'Have a sofa set, dining table or outdoor deck that needs its shine back? Call us, message us on WhatsApp or visit the workshop for a free inspection and a clear quote.',
          image: photo.contactBanner,
          cta1: cta('Call Now', `tel:${BUSINESS.phone}`),
          cta2: cta('WhatsApp Us', `https://wa.me/${whatsappDigits}`),
        },
        { blockType: 'ContactInfo', anchorId: 'contact-info', ...CONTACT_INFO },
        {
          blockType: 'ContactForm',
          anchorId: 'contact-form',
          ...CONTACT_FORM,
          services: CONTACT_FORM.services.map((name) => ({ name })),
        },
        { blockType: 'MapSection', anchorId: 'location', ...MAP },
        faqBlock,
      ],
    },
    {
      slug: 'experience',
      title: 'Experience',
      seo: {
        title: 'Our Experience',
        description:
          'Since 1991 we have restored thousands of wooden sofas, tables, doors and decks in Karachi. See our process, the finishes we offer and the projects we are proud of.',
      },
      layout: [
        {
          blockType: 'SubpageBanner',
          anchorId: 'experience-banner',
          heading: 'Our Experience',
          description:
            'Since 1991 we have restored thousands of wooden sofas, tables, doors and decks across Karachi. See how we work, the finishes we offer and the projects we are proud of.',
          image: photo.experienceBanner,
          cta1: cta('See Our Process', '#process'),
          cta2: cta('Book Free Inspection', '/contact'),
        },
        statsBlock('#portfolio-grid', 'View Our Projects'),
        {
          blockType: 'ContentSplit',
          anchorId: 'woods',
          ...WOODS,
          points: withPoints(WOODS.points),
          image: photo.woods,
          imageSide: 'left',
          tone: 'white',
        },
        { blockType: 'JourneyTimeline', anchorId: 'journey', ...JOURNEY },
        {
          blockType: 'ProcessSteps',
          anchorId: 'process',
          ...PROCESS,
          cta: cta('Book a Free Inspection', '/contact'),
        },
        { blockType: 'FinishShowcase', anchorId: 'finishes', ...FINISHES },
        portfolioBlock,
        feedbackBlock,
        readyToBuild,
      ],
    },
    {
      slug: 'about',
      title: 'About',
      seo: {
        title: 'About Us',
        description: `${BUSINESS.name} has been restoring beauty to wooden furniture in Karachi since ${BUSINESS.since}. Meet the craftsmen and the values behind every finish.`,
      },
      layout: [
        {
          blockType: 'SubpageBanner',
          anchorId: 'about-banner',
          heading: 'About Us',
          description: `Premium wood polishing, varnishing and furniture restoration since ${BUSINESS.since}. Meet the craftsmen behind the finish and the values that keep our customers coming back.`,
          image: photo.aboutBanner,
          cta1: cta('Our Experience', '/experience'),
          cta2: cta('Contact Us', '/contact'),
        },
        {
          blockType: 'ContentSplit',
          anchorId: 'story',
          ...STORY,
          points: withPoints(STORY.points),
          image: photo.story,
          imageSide: 'right',
          tone: 'white',
        },
        {
          blockType: 'CoreValues',
          anchorId: 'values',
          ...VALUES,
          cta: cta('Get a Free Quote', '/contact'),
        },
        { blockType: 'TeamSection', anchorId: 'team', ...TEAM },
        statsBlock('/experience', 'See Our Experience'),
        feedbackBlock,
        readyToBuild,
      ],
    },
  ]

  // ---- Create (skip existing) ----------------------------------------------------------------
  for (const page of pages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
      depth: 0,
      select: { slug: true },
      overrideAccess: true,
    })

    const blocks = page.layout.map((b: any) => b.blockType).join(' > ')

    if (existing.docs.length > 0) {
      console.log(`SKIP    /${page.slug}  (already exists, left untouched)`)
      continue
    }
    if (DRY_RUN) {
      console.log(`WOULD CREATE /${page.slug}: ${blocks}`)
      continue
    }

    await payload.create({
      collection: 'pages',
      data: page as any,
      overrideAccess: true,
      // One page is a single insert; skipping the transaction avoids "Transaction aborted" on slow links
      disableTransaction: true,
    })
    console.log(`CREATED /${page.slug}: ${blocks}`)
  }

  console.log(DRY_RUN ? 'Dry run finished, nothing was written.' : 'Done.')
  process.exit(0)
}

main().catch((err) => {
  console.error('FAILED:', err?.message || err)
  process.exit(1)
})
