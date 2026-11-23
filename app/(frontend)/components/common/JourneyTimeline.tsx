import React from 'react'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { stagger } from '../ui/motion'

interface TimelineItem {
  id?: string
  label: string
  title: string
  description: string
}

export interface JourneyTimelineProps {
  anchorId?: string
  subheading?: string
  heading: string
  description?: string
  items?: TimelineItem[]
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  anchorId,
  subheading,
  heading,
  description,
  items,
}) => {
  if (!items || items.length === 0) return null

  return (
    <section
      id={anchorId || 'journey'}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FAF6EE] via-[#FDFBF7] to-[#F5EBE0] overflow-hidden border-t border-amber-950/5"
    >
      {/* Decorative ring + glow */}
      <div
        className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full border border-amber-500/10 pointer-events-none animate-float-slow"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />

      <div className="relative max-w-[1600px] mx-auto">
        <SectionHeader align="center" subheading={subheading} heading={heading} description={description} />

        <ol className="relative mx-auto max-w-5xl">
          {/* Spine: left edge on mobile, centred on desktop */}
          <span
            className="absolute left-[15px] lg:left-1/2 top-3 bottom-3 w-px -translate-x-1/2 bg-gradient-to-b from-amber-500/70 via-amber-500/30 to-transparent"
            aria-hidden="true"
          />

          {items.map((item, idx) => {
            const onLeft = idx % 2 === 0
            return (
              <li
                key={item.id || idx}
                className="relative pl-12 lg:pl-0 pb-10 last:pb-0 lg:grid lg:grid-cols-2 lg:gap-x-20"
              >
                {/* Node on the spine */}
                <span
                  className="absolute left-[15px] lg:left-1/2 top-9 -translate-x-1/2 h-3.5 w-3.5 rounded-full animate-ring-pulse"
                  aria-hidden="true"
                >
                  <span className="block h-full w-full rounded-full bg-amber-500 ring-4 ring-[#FAF6EE]" />
                </span>

                <Reveal
                  direction={onLeft ? 'left' : 'right'}
                  delay={stagger(idx % 3, 80)}
                  className={onLeft ? 'lg:col-start-1' : 'lg:col-start-2'}
                >
                  <div className="group bg-white border border-amber-500/20 rounded-2xl p-6 sm:p-8 shadow-sm wood-card-hover">
                    <span className="block text-2xl sm:text-3xl font-black text-amber-600 tracking-tight mb-2">
                      {item.label}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-3 tracking-tight transition-colors duration-300 group-hover:text-amber-700">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
export default JourneyTimeline
