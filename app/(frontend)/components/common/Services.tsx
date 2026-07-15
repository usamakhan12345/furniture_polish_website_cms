import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Media {
  url?: string
  alt?: string
}

interface ServiceCardItem {
  id?: string
  title: string
  description: string
  icon?: Media | string | null
  link?: string
}

export interface ServicesProps {
  anchorId?: string
  subheading?: string
  heading: string
  description: string
  browseAllText?: string
  browseAllLink?: string
  services?: ServiceCardItem[]
}

export const Services: React.FC<ServicesProps> = ({
  anchorId,
  subheading,
  heading,
  description,
  browseAllText,
  browseAllLink,
  services,
}) => {
  return (
    <section id={anchorId || 'services'} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF6EE]/30 overflow-hidden border-t border-slate-200/50">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header Row (Flex grid aligned on desktop) */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8 px-3">
          
          <div className="text-left max-w-4xl animate-fade-in-right">
            {/* Subheading with Orange Colon */}
            {subheading && (
              <span className="inline-flex items-center text-amber-600 font-extrabold text-sm uppercase tracking-widest gap-2.5 mb-5">
                <span className="text-amber-600 font-extrabold">:</span>
                {subheading.replace(/^::\s*|^:\s*/, '')}
              </span>
            )}

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              {heading}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              {description}
            </p>
          </div>

          {/* Browse All Link (Top Right on desktop) */}
          {browseAllText && browseAllLink && (
            <div className="flex-shrink-0 animate-fade-in-up">
              <Link
                href={browseAllLink}
                className="inline-flex items-center gap-1.5 text-sm font-extrabold text-amber-600 hover:text-amber-500 transition-colors duration-200"
              >
                <span>{browseAllText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>

        {/* 3-column cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((item, idx) => {
            const iconUrl = typeof item.icon === 'object' && item.icon?.url ? item.icon.url : ''
            const iconAlt = typeof item.icon === 'object' && item.icon?.alt ? item.icon.alt : item.title

            const cardContent = (
              <div className="flex flex-col bg-white border border-amber-500/10 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 wood-card-hover h-full text-left">
                {/* Icon Box */}
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mb-6">
                  {iconUrl ? (
                    <img src={iconUrl} alt={iconAlt} className="w-5 h-5 object-contain" />
                  ) : (
                    <span className="w-2.5 h-2.5 bg-amber-600 rounded-sm" />
                  )}
                </div>

                {/* Title with Right Arrow */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 tracking-tight flex items-center gap-2 group-hover:text-amber-600 transition-colors duration-200">
                  <span>{item.title}</span>
                  <ArrowRight className="w-4 h-4 text-amber-500 transform group-hover:translate-x-1.5 transition-transform" />
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            )

            return item.link ? (
              <Link
                key={item.id || idx}
                href={item.link}
                className="group h-full block"
              >
                {cardContent}
              </Link>
            ) : (
              <div key={item.id || idx} className="h-full block">
                {cardContent}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
export default Services
