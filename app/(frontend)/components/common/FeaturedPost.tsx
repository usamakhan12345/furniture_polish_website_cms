import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCtaHref } from '../../../../utilities/cta'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'
import { Reveal } from '../ui/Reveal'
import { SectionEyebrow } from '../ui/SectionEyebrow'

interface Media {
  url?: string
  alt?: string
}

interface CTA {
  text: string
  isExternal?: boolean | null
  link?: string | null
  page?: string | { slug: string } | null
}

export interface FeaturedPostProps {
  anchorId?: string
  heading: string
  content: string
  image: Media | string | null
  cta?: CTA
}

/**
 * "Topic: the hook" headlines read better as two tiers, so a single colon splits the heading
 * into a gold lead-in and a white second line. Anything else renders as one plain heading.
 */
const splitHeading = (heading: string) => {
  const colon = heading.indexOf(':')
  const isTwoPart = colon > 0 && colon < heading.length - 1 && heading.indexOf(':', colon + 1) === -1
  if (!isTwoPart) return { lead: heading, hook: '' }
  return { lead: heading.slice(0, colon + 1), hook: heading.slice(colon + 1).trim() }
}

export const FeaturedPost: React.FC<FeaturedPostProps> = ({
  anchorId,
  heading,
  content,
  image,
  cta,
}) => {
  const imgUrl = resolveMediaUrl(image)
  const imgAlt = resolveMediaAlt(image, 'Featured Post Image')
  const { lead, hook } = splitHeading(heading)

  return (
    <section
      id={anchorId || 'featured-post'}
      className="relative isolate overflow-hidden py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1E1209] via-[#2A170B] to-[#150C06] border-t border-amber-500/20"
    >
      {/* Surface: faint grain + one warm amber glow behind the photo, nothing else competing */}
      <div className="absolute inset-0 -z-10 wood-grain opacity-40 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_78%_50%,rgba(245,158,11,0.20),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -left-24 -top-24 -z-10 h-[320px] w-[320px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none animate-float-slow"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
        {/* Text Column */}
        <Reveal direction="left" className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
          <SectionEyebrow tone="gold" className="mb-5">
            Featured Restoration
          </SectionEyebrow>

          <h2 className="text-balance text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-7">
            <span className={hook ? 'text-amber-400' : 'text-white'}>{lead}</span>
            {hook && <span className="mt-2 block text-white">{hook}</span>}
          </h2>

          <p className="max-w-xl border-l-2 border-amber-500/50 pl-5 text-lg leading-relaxed text-stone-300 font-medium whitespace-pre-line mb-10">
            {content}
          </p>

          {cta?.text && (
            <div>
              <Link href={getCtaHref(cta)} className="btn btn-primary">
                <span className="capitalize">{cta.text}</span>
                <ArrowRight className="btn-icon w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          )}
        </Reveal>

        {/* Image Column */}
        <Reveal direction="scale" delay={150} className="lg:col-span-6 order-1 lg:order-2">
          {imgUrl ? (
            <div className="group relative">
              {/* Soft amber glow that lifts the photo off the background */}
              <div
                className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-amber-500/30 via-amber-600/10 to-transparent blur-2xl opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              {/* Offset outline frame that shifts on hover */}
              <div
                className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 rounded-3xl border-2 border-amber-500/30 transition-transform duration-500 ease-out group-hover:translate-x-5 group-hover:translate-y-5 sm:group-hover:translate-x-7 sm:group-hover:translate-y-7"
                aria-hidden="true"
              />
              {/* Corner bracket mirroring the frame on the opposite corner */}
              <div
                className="absolute -left-3 -top-3 z-30 h-14 w-14 rounded-tl-3xl border-l-[3px] border-t-[3px] border-amber-400 transition-all duration-500 ease-out group-hover:-left-4 group-hover:-top-4 pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#150C06] ring-1 ring-white/15 shadow-[0_35px_70px_-25px_rgba(0,0,0,0.85)]">
                <img
                  src={imgUrl}
                  alt={imgAlt}
                  loading="lazy"
                  decoding="async"
                  className="parallax-img w-full h-full object-cover object-center transform group-hover:scale-[1.04] transition-transform duration-700 ease-out z-10"
                />
                {/* Soft inner edge so the photo sits cleanly on the dark surface */}
                <div
                  className="absolute inset-0 z-20 rounded-3xl ring-1 ring-inset ring-white/15 pointer-events-none"
                  aria-hidden="true"
                />
                {/* Light sweep on hover */}
                <div
                  className="absolute inset-y-0 -left-1/3 z-30 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full opacity-0 group-hover:translate-x-[420%] group-hover:opacity-100 transition-all duration-1000 ease-out motion-reduce:hidden pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          ) : (
            <div className="aspect-[4/3] w-full bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center text-stone-400">
              No Image Available
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
export default FeaturedPost
