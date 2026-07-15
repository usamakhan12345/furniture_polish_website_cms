import React from 'react'

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
    <section id={anchorId || 'key-impacts'} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16 animate-fade-in-right max-w-4xl text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {heading}
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            {description}
          </p>
        </div>

        {/* 4-column cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts?.map((item, idx) => {
            const iconUrl = typeof item.icon === 'object' && item.icon?.url ? item.icon.url : ''
            const iconAlt = typeof item.icon === 'object' && item.icon?.alt ? item.icon.alt : item.title

            return (
              <div
                key={item.id || idx}
                className="flex flex-col bg-white border border-amber-500/20 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 wood-card-hover h-full"
              >
                {/* Icon Placeholder or Uploaded Image */}
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mb-6">
                  {iconUrl ? (
                    <img src={iconUrl} alt={iconAlt} className="w-5 h-5 object-contain" />
                  ) : (
                    <span className="w-2.5 h-2.5 bg-amber-600 rounded-sm" />
                  )}
                </div>

                {/* Card Title */}
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-3 tracking-tight">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
export default KeyImpacts
