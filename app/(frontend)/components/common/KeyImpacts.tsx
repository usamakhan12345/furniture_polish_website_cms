import React from 'react'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'
import { Reveal } from '../ui/Reveal'
import { stagger } from '../ui/motion'

interface Media {
  url?: string
  alt?: string
}

interface ImpactCardItem {
  id?: string
  title: string
  description: string
  icon?: Media | string | null
}

export interface KeyImpactsProps {
  anchorId?: string
  heading: string
  description: string
  impacts?: ImpactCardItem[]
}

export const KeyImpacts: React.FC<KeyImpactsProps> = ({
  anchorId,
  heading,
  description,
  impacts,
}) => {
  return (
    <section
      id={anchorId || 'key-impacts'}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50"
    >
      {/* Decorative background blur */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none animate-float-slow"
        aria-hidden="true"
      />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header */}
        <Reveal direction="left" className="mb-16 max-w-4xl text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {heading}
          </h2>
          <span
            className="line-x mb-5 block h-1 w-20 rounded-full bg-gradient-to-r from-amber-600 to-amber-300"
            aria-hidden="true"
          />
          <p className="text-slate-600 text-lg leading-relaxed font-medium">{description}</p>
        </Reveal>

        {/* 4-column cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts?.map((item, idx) => {
            const iconUrl = resolveMediaUrl(item.icon)
            const iconAlt = resolveMediaAlt(item.icon, item.title)

            return (
              <Reveal key={item.id || idx} delay={stagger(idx % 4, 110)} className="h-full">
                <div className="group relative flex flex-col bg-white border border-amber-500/20 p-8 rounded-2xl shadow-sm wood-card-hover h-full">
                  {/* Oversized index numeral */}
                  <span
                    className="pointer-events-none absolute right-5 top-3 select-none text-6xl font-black text-amber-500/[0.07] transition-all duration-500 group-hover:text-amber-500/20 group-hover:-translate-y-1"
                    aria-hidden="true"
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Icon Placeholder or Uploaded Image */}
                  <div className="relative w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mb-6 transition-all duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6 group-hover:border-amber-500/50 group-hover:shadow-lg group-hover:shadow-amber-500/20">
                    {iconUrl ? (
                      <img src={iconUrl} alt={iconAlt} loading="lazy" className="w-6 h-6 object-contain" />
                    ) : (
                      <span className="w-3 h-3 bg-amber-600 rounded-sm" />
                    )}
                  </div>

                  {/* Card Title */}
                  <h3 className="relative text-lg sm:text-xl font-extrabold text-slate-900 mb-3 tracking-tight transition-colors duration-300 group-hover:text-amber-700">
                    {item.title}
                  </h3>

                  {/* Card Description */}
                  <p className="relative text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default KeyImpacts
