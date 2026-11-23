import React from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { getCtaHref } from '../../../../utilities/cta'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'
import { Reveal } from '../ui/Reveal'
import { SectionEyebrow } from '../ui/SectionEyebrow'
import { stagger } from '../ui/motion'

interface Media {
  url?: string
  alt?: string
}

interface CTA {
  text?: string | null
  isExternal?: boolean | null
  link?: string | null
  page?: string | { slug: string } | null
}

interface PointItem {
  id?: string
  text: string
}

export interface ContentSplitProps {
  anchorId?: string
  subheading?: string
  heading: string
  body: string
  points?: PointItem[]
  image: Media | string | null
  imageSide?: 'left' | 'right'
  tone?: 'white' | 'cream'
  badge?: { number?: string | null; label?: string | null }
  cta?: CTA
}

export const ContentSplit: React.FC<ContentSplitProps> = ({
  anchorId,
  subheading,
  heading,
  body,
  points,
  image,
  imageSide = 'right',
  tone = 'white',
  badge,
  cta,
}) => {
  const imgUrl = resolveMediaUrl(image)
  const imgAlt = resolveMediaAlt(image, heading)
  const imageFirst = imageSide === 'left'
  const cream = tone === 'cream'

  // Short single-word points (wood species) read best as pills; longer ones as a checklist
  const items = points?.filter((p) => p?.text) ?? []
  const asPills = items.length > 0 && items.every((p) => p.text.length <= 18)

  return (
    <section
      id={anchorId || 'content'}
      className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${
        cream
          ? 'bg-gradient-to-br from-[#FAF6EE] via-[#FDFBF7] to-[#F5EBE0] border-t border-amber-950/5'
          : 'bg-white border-t border-slate-200/50'
      }`}
    >
      <div
        className={`absolute top-1/3 w-[320px] h-[320px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none animate-float-slow ${
          imageFirst ? 'right-0' : 'left-0'
        }`}
        aria-hidden="true"
      />

      <div className="relative max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
        {/* Text */}
        <Reveal
          direction={imageFirst ? 'right' : 'left'}
          className={`lg:col-span-6 flex flex-col justify-center ${imageFirst ? 'lg:order-2' : 'lg:order-1'}`}
        >
          {subheading && <SectionEyebrow className="mb-5">{subheading}</SectionEyebrow>}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {heading}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium whitespace-pre-line mb-8 max-w-2xl">
            {body}
          </p>

          {items.length > 0 &&
            (asPills ? (
              <ul className="mb-10 flex flex-wrap gap-3">
                {items.map((point, idx) => (
                  <li
                    key={point.id || idx}
                    className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/5 px-4 py-2 text-sm font-bold text-slate-800 transition-all duration-300 hover:border-amber-500/60 hover:bg-amber-500/15 hover:-translate-y-0.5"
                  >
                    <Check className="h-4 w-4 text-amber-600" strokeWidth={3} aria-hidden="true" />
                    {point.text}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {items.map((point, idx) => (
                  <li key={point.id || idx} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-600"
                      aria-hidden="true"
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-sm sm:text-base font-bold leading-snug text-slate-800">{point.text}</span>
                  </li>
                ))}
              </ul>
            ))}

          {cta?.text && (
            <div>
              <Link href={getCtaHref(cta as any)} className="btn btn-primary">
                <span>{cta.text}</span>
                <ArrowRight className="btn-icon w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          )}
        </Reveal>

        {/* Image */}
        <Reveal
          direction="scale"
          delay={150}
          className={`lg:col-span-6 ${imageFirst ? 'lg:order-1' : 'lg:order-2'}`}
        >
          {imgUrl ? (
            <div className="group relative">
              <div
                className={`absolute inset-0 translate-y-4 rounded-3xl border-2 border-amber-500/30 transition-transform duration-500 ease-out group-hover:translate-y-6 ${
                  imageFirst
                    ? '-translate-x-4 group-hover:-translate-x-6'
                    : 'translate-x-4 group-hover:translate-x-6'
                }`}
                aria-hidden="true"
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-xl transition-shadow duration-500 group-hover:shadow-2xl">
                <img
                  src={imgUrl}
                  alt={imgAlt}
                  loading="lazy"
                  decoding="async"
                  className="parallax-img h-full w-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/5 pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Floating badge */}
              {badge?.number && (
                <div
                  className={`absolute -bottom-6 z-10 rounded-2xl border border-amber-500/20 bg-white px-6 py-4 shadow-xl transition-transform duration-500 ease-out group-hover:-translate-y-1 ${
                    imageFirst ? '-right-2 sm:-right-6' : '-left-2 sm:-left-6'
                  }`}
                >
                  <span className="block text-2xl sm:text-3xl font-black tracking-tight text-amber-600 leading-none">
                    {badge.number}
                  </span>
                  {badge.label && (
                    <span className="mt-1.5 block text-xs sm:text-sm font-bold text-slate-600">{badge.label}</span>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-[4/3] w-full rounded-3xl border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400">
              No Image Available
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
export default ContentSplit
