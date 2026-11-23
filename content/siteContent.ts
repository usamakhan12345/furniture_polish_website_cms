/**
 * Real content for the new page sections, taken from the existing website (home page, footer,
 * FAQ and service copy): the business facts, services, finishes and process the site already
 * describes. Nothing here is invented: where a line is new it is a rewording of something the
 * site already says.
 *
 * Used in two places:
 *  - as the editor defaults of the new Payload blocks (so a freshly added block is pre-filled), and
 *  - by `scripts/seed-pages.ts` to build the Contact / Experience / About pages.
 */

export const BUSINESS = {
  name: 'Polish Master',
  since: 1991,
  phone: '0312-0129875',
  whatsapp: '0303-2584068',
  email: 'usamakhank8910@gmail.com',
  address: 'Shop #4, Nagan Chowrangi, Sector 11 E, North Karachi, Karachi, Pakistan',
  hours: 'Monday - Sunday : 9:00 AM - 7:00 PM',
} as const

export const JOURNEY = {
  subheading: 'Our Journey',
  heading: '35 Years of Bringing the Glow Back to Wood',
  description:
    'From a small Karachi workshop to thousands of restored pieces, this is how our craft has grown since 1991.',
  items: [
    {
      label: '1991',
      title: 'Our Workshop Opens in Karachi',
      description:
        'We began restoring beauty to tired wooden fixtures, with honest hand-finished work and fair prices from day one.',
    },
    {
      label: 'Hand-Rubbed Heritage',
      title: 'Mastering French Polish & Natural Oils',
      description:
        'Traditional hand rubbing with shellac, natural mineral oils and beeswax became the foundation of every finish we deliver, from family heirlooms to everyday dining sets.',
    },
    {
      label: 'Indoor & Outdoor',
      title: 'Beyond the Living Room',
      description:
        'We took our craft outdoors too: weatherproofing decks, gates and garden furniture with UV-resistant varnish, and protecting doors and kitchen cabinets with moisture-resistant lacquer.',
    },
    {
      label: 'Modern Finishes',
      title: 'Premium Coatings, Safer for Your Home',
      description:
        'Alongside heritage techniques we adopted polyurethane, lacquer and low-odor, non-toxic coatings that are safe for homes with children and pets.',
    },
    {
      label: 'Today',
      title: '35+ Years and Thousands of Restored Pieces',
      description:
        'With 2,800+ wooden sofas and chairs and 1,500+ dining and tea tables restored, we are the city’s most trusted wood polishing specialists, backed by a 100% satisfaction guarantee.',
    },
  ],
}

export const PROCESS = {
  subheading: 'How We Work',
  heading: 'Our Six-Step Wood Restoration Process',
  description:
    'Every piece, from a single dining chair to a full outdoor deck, goes through the same careful routine so the finish looks beautiful and lasts.',
  steps: [
    {
      title: 'Free Inspection & Quote',
      description:
        'We assess the wood type and the damage, then give you a clear quote with no hidden costs.',
      duration: 'Free',
    },
    {
      title: 'Deep Cleaning & Repair',
      description:
        'Dust, grease and old wax come off, and scratches, loose joints and cracks are repaired before any finish goes on.',
      duration: '',
    },
    {
      title: 'Sanding & Stain Removal',
      description:
        'Heat rings, cup stains and worn-out coatings are sanded away to bring back clean, bare wood and open the grain.',
      duration: '',
    },
    {
      title: 'Colour & Finish Selection',
      description:
        'We help you choose between glossy, satin or matte and match the stain to your décor, from a dark cherry glow to a natural teak tone.',
      duration: '',
    },
    {
      title: 'Polish & Protective Coats',
      description:
        'Hand-rubbed polish, polyurethane, lacquer or UV varnish is applied in thin layers, with proper drying time between each coat.',
      duration: 'Layer by layer',
    },
    {
      title: 'Final Curing & Handover',
      description:
        'We inspect every surface with you, leave your home clean with zero mess, and share care tips to keep the shine.',
      duration: '2–7 days overall',
    },
  ],
  footnote:
    'Small pieces such as tables or sofas usually take 2 to 3 days. Larger projects such as bedroom sets or outdoor decks can take 4 to 7 days, so every layer dries properly.',
}

export const VALUES = {
  subheading: 'What We Stand For',
  heading: 'Craftsmanship You Can Trust, Prices You Can Afford',
  description:
    'We treat your valuable wooden items with care, combining heritage techniques with modern finishes to deliver beautiful results within your budget.',
  items: [
    {
      icon: 'wallet',
      title: 'Reasonable Pricing',
      description:
        'Top-tier polishing and finishing results without premium markups. Clear quotes with no hidden costs.',
    },
    {
      icon: 'award',
      title: '35+ Years of Experience',
      description:
        'Deep understanding of teak, mahogany, oak, walnut, sheesham and all other natural hardwoods and softwoods.',
    },
    {
      icon: 'leaf',
      title: 'Safe, Low-Odor Coatings',
      description:
        'Eco-friendly, non-toxic finishes for all indoor items. Once cured they are safe for homes with pets and children.',
    },
    {
      icon: 'sparkles',
      title: 'High-Quality Polish',
      description:
        'Premium polyurethane coatings, lacquer, shellac and natural beeswax for rich sheen and long-term protection.',
    },
    {
      icon: 'truck',
      title: 'On-Site or Workshop',
      description:
        'Large items such as doors, cabinets, wardrobes and decks are polished on-site under dust-protective sheets. Smaller pieces can come to our workshop.',
    },
    {
      icon: 'shield-check',
      title: '100% Satisfaction Guarantee',
      description:
        'Every project is backed by our quality guarantee, and we are not finished until you love the result.',
    },
  ],
}

export const TEAM = {
  subheading: 'Our Craftsmen',
  heading: 'The Hands Behind Every Finish',
  description:
    'Three specialist crews work together on each project, so every stage of the job is handled by people who do it every day.',
  members: [
    {
      name: 'Master Polishers',
      role: 'Hand-Rubbing & French Polish',
      experience: '35+ years of hands-on experience',
      bio: 'Our senior craftsmen carry the traditional skills that built our name: shellac, natural oils and beeswax applied by hand for a deep, even glow.',
    },
    {
      name: 'Restoration & Repair Crew',
      role: 'Surface Preparation',
      experience: '',
      bio: 'Cleaning, scratch and joint-crack repair, sanding and stain removal: the careful groundwork that makes every finish last.',
    },
    {
      name: 'On-Site & Outdoor Team',
      role: 'Decks, Doors & Cabinets',
      experience: '',
      bio: 'A dust-controlled on-site team for doors, kitchen cabinets, wardrobes, outdoor decks and gates, working with drop sheets so your home stays clean.',
    },
  ],
}

export const CONTACT_INFO = {
  subheading: 'Contact Details',
  heading: 'We’re One Call or Message Away',
  description:
    'Call, message us on WhatsApp or visit the workshop. We’re open every day of the week.',
  items: [
    { type: 'phone', label: 'Call Us', value: BUSINESS.phone },
    { type: 'whatsapp', label: 'WhatsApp', value: BUSINESS.whatsapp },
    { type: 'email', label: 'Email Us', value: BUSINESS.email },
    { type: 'address', label: 'Visit Our Workshop', value: BUSINESS.address },
    { type: 'hours', label: 'Opening Hours', value: BUSINESS.hours },
  ],
}

export const CONTACT_FORM = {
  subheading: 'Free Inspection',
  heading: 'Tell Us About Your Project',
  description:
    'Share a few details about your furniture and what you would like done. We will get back to you with a free inspection and a clear quote.',
  steps: [
    {
      title: 'We review your message',
      description:
        'Tell us the type of furniture, the wood and the damage, and we will let you know what is possible.',
    },
    {
      title: 'Free inspection',
      description:
        'We look at the piece on-site or at our workshop and agree the finish with you.',
    },
    {
      title: 'Clear quote, no hidden costs',
      description: 'You know the price before any work starts, so there are no surprises.',
    },
  ],
  services: [
    'Sofa & Chair Refinishing',
    'Dining & Study Table Polish',
    'Bedroom Set Restoration',
    'Outdoor Deck & Gate Weatherproofing',
    'Kitchen Cabinets & Doors',
    'Antique & Vintage Restoration',
  ],
  successMessage: 'Thank you! Your message has been sent successfully. We will get back to you shortly.',
  phone: BUSINESS.phone,
}

export const MAP = {
  subheading: 'Find Us',
  heading: 'Visit Our Workshop in North Karachi',
  description: 'Drop by to discuss your project in person or to book a free inspection.',
  address: BUSINESS.address,
  hours: BUSINESS.hours,
  phone: BUSINESS.phone,
  directionsLabel: 'Get Directions',
}

export const FINISHES = {
  subheading: 'Finishes',
  heading: 'Finishes & Polishes We Offer',
  description:
    'Glossy, satin or matte, hand-rubbed or sprayed: we help you choose the finish that matches your furniture and your décor.',
  finishes: [
    {
      name: 'High-Gloss Polish',
      sheenLevel: 5,
      bestFor: 'Dining sets, doors, show pieces',
      description:
        'Reflects light for a bright, glass-like shine that makes dark grains such as rosewood and mahogany glow.',
      colorFrom: '#8A3416',
      colorTo: '#2B0F05',
    },
    {
      name: 'French Polish (Shellac)',
      sheenLevel: 4,
      bestFor: 'Antiques & family heirlooms',
      description:
        'Traditional hand-rubbed shellac that revives old pieces without erasing their original character.',
      colorFrom: '#C2762C',
      colorTo: '#6B3410',
    },
    {
      name: 'Satin Polyurethane',
      sheenLevel: 3,
      bestFor: 'Dining & study tables',
      description:
        'A soft, medium sheen with a heavy-duty heat- and water-resistant coat. Very popular for everyday tables.',
      colorFrom: '#A6642B',
      colorTo: '#5A3216',
    },
    {
      name: 'UV Weatherproof Varnish',
      sheenLevel: 3,
      bestFor: 'Decks, gates & outdoor furniture',
      description:
        'Water-repelling, UV-resistant coats that stop sunlight bleaching and moisture swelling outdoors.',
      colorFrom: '#9A6B3F',
      colorTo: '#4E3219',
    },
    {
      name: 'Natural Oil & Beeswax',
      sheenLevel: 2,
      bestFor: 'Teak headboards & bedroom sets',
      description:
        'Mineral oils and beeswax for a rich, silky, low-sheen finish that suits modern interiors.',
      colorFrom: '#CDA06B',
      colorTo: '#8A5F34',
    },
    {
      name: 'Matte Finish',
      sheenLevel: 1,
      bestFor: 'Wardrobes & modern interiors',
      description: 'No shine at all: it shows the wood in its most raw, organic look.',
      colorFrom: '#B58B5E',
      colorTo: '#7A5A3B',
    },
  ],
}

export const WOODS = {
  subheading: 'Wood Expertise',
  heading: 'Every Wood, Every Finish',
  body: 'Over our 35+ years of operations, we have worked on all types of hardwoods and softwoods. Each species takes stain, oil and lacquer differently, so we match the method to the wood, not the other way around.',
  points: ['Teak', 'Mahogany', 'Oak', 'Walnut', 'Sheesham', 'Rosewood', 'Cedar'],
  badge: { number: '35+ Years', label: 'Of master experience' },
}

export const STORY = {
  subheading: 'Our Story',
  heading: 'Restoring Beauty to Wood Since 1991',
  body: 'Since 1991, we have been restoring beauty to tired wooden fixtures. Whether it is an antique mahogany dining table, a vintage sofa frame, or outdoor patio decking exposed to the elements, our team uses premium polishes, oils and waxes to ensure a high-gloss or satin finish that lasts.',
  points: [
    'Indoor furniture care, dust-free',
    'Outdoor deck & gate protection',
    'Hand rubbing & spray finishes',
    'Clear quotes, reasonable prices',
  ],
  badge: { number: '100%', label: 'Premium quality guarantee' },
}

export const PORTFOLIO = {
  subheading: 'Our Work',
  heading: 'Projects We’re Proud Of',
  description:
    'A selection of recent restorations across sofas, tables, decks, bedrooms and doors. Select a category to filter, or open any project for the details.',
  allLabel: 'All Projects',
  // Titles/descriptions are read from the home page's WorkSlider at seed time; these are the
  // categories assigned to them, in order.
  categories: [
    'Sofas & Chairs',
    'Dining & Tables',
    'Outdoor Decks',
    'Bedroom Sets',
    'Doors & Cabinets',
  ],
}
