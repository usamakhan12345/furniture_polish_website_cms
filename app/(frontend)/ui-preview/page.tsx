// TEMPORARY visual-test harness — delete before committing.
import React from 'react'
import { BlockRenderer } from '../components/common/BlockRenderer'
import { Header } from '../components/common/Header'
import { Footer } from '../components/common/Footer'

const wood = (hue: number, label: string) => {
  const grain = Array.from({ length: 28 })
    .map((_, i) => `<path d='M0 ${i * 30 + 8} C 300 ${i * 30 - 14}, 900 ${i * 30 + 30}, 1200 ${i * 30 + 6}' stroke='rgba(255,255,255,${0.04 + (i % 3) * 0.02})' stroke-width='${1 + (i % 4)}' fill='none'/>`)
    .join('')
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${hue},55%,40%)'/><stop offset='1' stop-color='hsl(${hue + 12},60%,16%)'/></linearGradient></defs><rect width='1200' height='800' fill='url(#g)'/>${grain}<text x='60' y='740' font-family='sans-serif' font-size='54' font-weight='700' fill='rgba(255,255,255,0.55)'>${label}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const cta = (text: string, link = '#contact') => ({ text, isExternal: true, link })

const blocks = [
  {
    blockType: 'HomeBanner',
    heading: 'Bring the Glow Back to Your Wooden Furniture',
    subHeading: 'Premium Wood Polishing',
    description: 'Expert French polish, varnishing and restoration that makes every table, door and cabinet look brand new.',
    backgroundImage: wood(28, 'Hero'),
    ctaButton: cta('Get a Free Quote'),
    secondaryCta: cta('View Our Work', '#portfolio'),
  },
  {
    blockType: 'WhoWeAre',
    subheading: ':: Who We Are',
    heading: 'Craftsmen who treat every grain with respect',
    description1: 'For over a decade we have restored heirlooms and finished custom pieces for homes across the city.',
    description2: 'Our team blends traditional hand-finishing with modern, low-odour coatings.',
    card1: { image: wood(30, 'Workshop'), statNumber: '12+', statLabel: 'Years of experience' },
    card2: { image: wood(24, 'Finish'), statNumber: '1,200', statLabel: 'Projects completed' },
    highlights: [
      { title: 'French polish', description: 'Hand-rubbed shellac for a deep, warm lustre.', link: '#services' },
      { title: 'Full restoration', description: 'Strip, repair, stain and seal.', link: '#services' },
      { title: 'Eco finishes', description: 'Water-based, low-VOC coatings.' },
    ],
  },
  {
    blockType: 'FeaturedPost',
    heading: 'A 1920s dining table, reborn',
    content: 'Water rings, deep scratches and decades of wear — gone. See how we brought this heirloom back to life in five days.',
    image: wood(20, 'Dining Table'),
    cta: cta('Read the case study', '#portfolio'),
  },
  {
    blockType: 'StatsSection',
    subheading: 'By the numbers',
    heading: 'Results you can see and touch',
    description: 'We measure our work in smiles, finishes and repeat customers.',
    cta1: cta('Book a visit'),
    cta2: cta('Our process', '#services'),
    stats: [
      { number: '500+', label: 'Happy clients' },
      { number: '98%', label: 'Repeat customers' },
      { number: '1,200', label: 'Pieces restored' },
      { number: '24/7', label: 'WhatsApp support' },
    ],
  },
  {
    blockType: 'WorkSlider',
    heading: 'Recent restorations',
    slides: [1, 2, 3, 4, 5].map((n) => ({
      id: `s${n}`,
      image: wood(18 + n * 9, `Project ${n}`),
      title: `Restoration project ${n}`,
      description: 'Full strip and re-polish with a hand-rubbed satin finish that highlights the natural grain of the timber.',
      cta: cta('View project', '#contact'),
    })),
  },
  {
    blockType: 'WhyChooseUs',
    subheading: 'Why choose us',
    heading: 'Quality you can feel',
    description: 'We obsess over details so you never have to.',
    image: wood(34, 'Showcase'),
    features: [
      { title: 'Skilled artisans', description: 'Every finisher has 8+ years on the bench.' },
      { title: 'Free on-site quote', description: 'We visit, assess and price in 24 hours.' },
      { title: 'Warranty included', description: 'Two-year guarantee on every finish.' },
      { title: 'Clean & careful', description: 'Dust-controlled workspace, always.' },
    ],
  },
  {
    blockType: 'KeyImpacts',
    heading: 'The difference we make',
    description: 'Four outcomes our customers notice first.',
    impacts: [
      { title: 'Lasting protection', description: 'Finishes that resist heat, water and wear.' },
      { title: 'Richer colour', description: 'Grain pops with depth and warmth.' },
      { title: 'Higher value', description: 'Restored pieces hold their worth.' },
      { title: 'Healthier homes', description: 'Low-odour, low-VOC products.' },
    ],
  },
  {
    blockType: 'Services',
    subheading: 'Our services',
    heading: 'Everything wood needs',
    description: 'From a single chair to a full house.',
    browseAllText: 'Browse all services',
    browseAllLink: '#contact',
    services: ['French polish', 'Varnishing', 'Staining', 'Restoration', 'Lacquer', 'Door finishing'].map((t, i) => ({
      id: `sv${i}`,
      title: t,
      description: `Professional ${t.toLowerCase()} for tables, doors, cabinets and more, finished to a showroom standard.`,
      image: wood(20 + i * 8, t),
    })),
  },
  {
    blockType: 'ProjectGallery',
    subheading: 'Gallery',
    heading: 'Our latest finishes',
    description: 'A glimpse of recent work from the workshop.',
    mainImage: wood(26, 'Featured'),
    gridImages: [1, 2, 3, 4].map((n) => ({ id: `g${n}`, image: wood(16 + n * 11, `Gallery ${n}`) })),
  },
  {
    blockType: 'FAQSection',
    heading: 'Frequently asked questions',
    description: 'Quick answers before you get in touch.',
    questions: [
      { question: 'How long does a polish take?', answer: 'Most single pieces take 2–4 days depending on condition and finish.' },
      { question: 'Do you work on-site?', answer: 'Yes. Fixed items such as doors and panelling are finished at your home.\n\nLarger restorations are done in our workshop and delivered back to you.' },
      { question: 'Is the finish safe for kids?', answer: 'We use low-VOC, water-based products that are safe once cured.' },
    ],
  },
  {
    blockType: 'FeedbackSection',
    subheading: 'Testimonials',
    heading: 'What our clients say',
    description: 'Real words from real homes.',
    testimonials: [1, 2, 3, 4].map((n) => ({
      id: `t${n}`,
      name: ['Sajid Ali', 'Ayesha Khan', 'Bilal Ahmed', 'Sara Malik'][n - 1],
      company: 'Homeowner',
      title: 'Highly recommended',
      rating: n === 3 ? 4 : 5,
      feedback: 'They restored my grandfather’s desk and it looks incredible. Professional, on time and tidy.',
    })),
  },
  {
    blockType: 'ReadyToBuild',
    heading: 'Ready to restore your furniture?',
    description: 'Tell us about your project and get a free quote within 24 hours.',
    cta: cta('Request a quote'),
  },
  {
    blockType: 'ContactSection',
    heading: 'Let’s talk about your project',
    description: 'Call, message or drop us a note — we reply fast.',
    location: '12 Workshop Lane, Lahore',
    mapUrl: 'https://maps.google.com/maps?q=Lahore&output=embed',
  },
]

const headerData = {
  navigationMenu: [
    { label: 'Home', link: '/ui-preview' },
    { label: 'Services', link: '#services', subMenu: [{ label: 'French polish', link: '#services' }, { label: 'Restoration', link: '#services' }] },
    { label: 'Portfolio', link: '#portfolio' },
    { label: 'Contact', link: '#contact' },
  ],
  ctaButton: { text: 'Free Quote', isExternal: true, link: '#contact' },
}

const footerData = {
  companyInformation: 'Premium furniture polishing, varnishing, and wood restoration.',
  socialLinks: [
    { platform: 'facebook' as const, link: 'https://example.com' },
    { platform: 'instagram' as const, link: 'https://example.com' },
  ],
  navigationGroups: [
    { title: 'Company', links: [{ label: 'About', isExternal: true, link: '#' }, { label: 'Portfolio', isExternal: true, link: '#portfolio' }] },
  ],
  contactInformation: { email: 'hello@example.com', phone: '0300 1234567', officeHours: 'Mon–Sat, 9–6', address: '12 Workshop Lane, Lahore' },
}

export default function UiPreview() {
  return (
    <>
      <Header data={headerData} />
      <BlockRenderer blocks={blocks} />
      <Footer data={footerData} />
    </>
  )
}
