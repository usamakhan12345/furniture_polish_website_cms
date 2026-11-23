import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'
import { Reveal } from '../ui/Reveal'
import { CountUp } from '../ui/CountUp'
import { SectionEyebrow } from '../ui/SectionEyebrow'
import { stagger } from '../ui/motion'

interface Media {
  url?: string
  alt?: string
}

interface StatCard {
  image: Media | string | null
  statNumber?: string
  statLabel?: string
}

interface HighlightItem {
  id?: string
  title: string
  description: string
  link?: string
}

export interface WhoWeAreProps {
  anchorId?: string
  subheading?: string
  heading: string
  description1: string
  description2?: string
  card1?: StatCard
  card2?: StatCard
  highlights?: HighlightItem[]
}

const StatBadge: React.FC<{ stat?: StatCard; position: string; floatClass: string }> = ({
  stat,
  position,
  floatClass,
}) => {
  if (!stat?.statNumber && !stat?.statLabel) return null

  return (
    <div
      className={`absolute ${position} z-20 bg-[#18110B]/95 backdrop-blur-sm border border-amber-500/20 text-white rounded-2xl p-4 sm:p-5 shadow-2xl max-w-[190px] ${floatClass}`}
    >
      {stat.statNumber && (
        <span className="text-2xl sm:text-3xl font-black text-amber-500 mb-1 block tabular-nums">
          <CountUp value={stat.statNumber} />
        </span>
      )}
      {stat.statLabel && (
        <span className="text-xs font-bold text-slate-300 leading-snug block">{stat.statLabel}</span>
      )}
    </div>
  )
}

export const WhoWeAre: React.FC<WhoWeAreProps> = ({
  anchorId,
  subheading,
  heading,
  description1,
  description2,
  card1,
  card2,
  highlights,
}) => {
  const c1ImgUrl = resolveMediaUrl(card1?.image)
  const c1ImgAlt = resolveMediaAlt(card1?.image, 'Card 1 Image')

  const c2ImgUrl = resolveMediaUrl(card2?.image)
  const c2ImgAlt = resolveMediaAlt(card2?.image, 'Card 2 Image')

  return (
    <section
      id={anchorId || 'who-we-are'}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50"
    >
      {/* Decorative Glow background blur */}
      <div
        className="absolute top-1/3 right-0 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none animate-float-slow"
        aria-hidden="true"
      />

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column: Stacked Image Cards with Floating Badges */}
        <div className="lg:col-span-5 space-y-8">
          {/* Card 1 */}
          <Reveal direction="left" className="lg:mr-10">
            <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-slate-50 aspect-[4/3] group">
              {c1ImgUrl ? (
                <img
                  src={c1ImgUrl}
                  alt={c1ImgAlt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  No Image Selected
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#18110B]/30 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <StatBadge stat={card1} position="top-4 right-4" floatClass="animate-float" />
            </div>
          </Reveal>

          {/* Card 2 */}
          <Reveal direction="left" delay={150} className="lg:ml-10">
            <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-slate-50 aspect-[4/3] group">
              {c2ImgUrl ? (
                <img
                  src={c2ImgUrl}
                  alt={c2ImgAlt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  No Image Selected
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#18110B]/30 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <StatBadge stat={card2} position="bottom-4 left-4" floatClass="animate-float-slow" />
            </div>
          </Reveal>
        </div>

        {/* Right Column: Text Information & Highlights */}
        <div className="lg:col-span-7 flex flex-col">
          <Reveal>
            {subheading && <SectionEyebrow className="mb-5">{subheading}</SectionEyebrow>}

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              {heading}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-slate-600 text-lg lg:text-xl leading-relaxed mb-6 font-medium whitespace-pre-line">
              {description1}
            </p>

            {description2 && (
              <p className="text-slate-600 text-base lg:text-lg leading-relaxed mb-10 font-medium whitespace-pre-line">
                {description2}
              </p>
            )}
          </Reveal>

          {/* Highlights List (Divider-separated lines) */}
          <div className="border-t border-slate-200 mt-4">
            {highlights?.map((item, idx) => {
              const index = String(idx + 1).padStart(2, '0')

              const highlightContent = (
                <>
                  <span
                    className="hidden sm:block w-10 flex-shrink-0 text-sm font-black tracking-widest text-amber-500/60 group-hover:text-amber-600 transition-colors duration-300 tabular-nums"
                    aria-hidden="true"
                  >
                    {index}
                  </span>
                  <div className="flex-grow pr-6">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </>
              )

              const rowClass =
                'group relative flex items-center justify-between py-6 border-b border-slate-200/60 text-left'

              // Gradient rule that draws across the row on hover
              const rule = (
                <span
                  className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-amber-600 to-amber-300 transition-transform duration-500 ease-out group-hover:scale-x-100"
                  aria-hidden="true"
                />
              )

              return (
                <Reveal key={item.id || idx} delay={stagger(idx, 100, 150)}>
                  {item.link ? (
                    <Link href={item.link} className={`${rowClass} transition-[padding] duration-300 hover:pl-2`}>
                      {highlightContent}
                      <span className="p-2.5 rounded-full border border-slate-200 group-hover:border-transparent group-hover:bg-amber-500 text-slate-400 group-hover:text-slate-950 transition-all duration-300 flex-shrink-0 self-center">
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-0.5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </span>
                      {rule}
                    </Link>
                  ) : (
                    <div className={rowClass}>
                      {highlightContent}
                      {rule}
                    </div>
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
export default WhoWeAre
