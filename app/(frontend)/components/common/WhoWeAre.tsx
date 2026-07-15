import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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
  subheading?: string
  heading: string
  description1: string
  description2?: string
  card1?: StatCard
  card2?: StatCard
  highlights?: HighlightItem[]
}

export const WhoWeAre: React.FC<WhoWeAreProps> = ({
  subheading,
  heading,
  description1,
  description2,
  card1,
  card2,
  highlights,
}) => {
  const c1ImgUrl = typeof card1?.image === 'object' && card1?.image?.url ? card1.image.url : ''
  const c1ImgAlt = typeof card1?.image === 'object' && card1?.image?.alt ? card1.image.alt : 'Card 1 Image'

  const c2ImgUrl = typeof card2?.image === 'object' && card2?.image?.url ? card2.image.url : ''
  const c2ImgAlt = typeof card2?.image === 'object' && card2?.image?.alt ? card2.image.alt : 'Card 2 Image'

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50">
      {/* Decorative Glow background blur */}
      <div className="absolute top-1/3 right-0 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Stacked Image Cards with Floating Badges */}
        <div className="lg:col-span-5 space-y-8 animate-fade-in-right">
          
          {/* Card 1 */}
          <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-slate-50 aspect-[4/3] group">
            {c1ImgUrl ? (
              <img
                src={c1ImgUrl}
                alt={c1ImgAlt}
                className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                No Image Selected
              </div>
            )}
            
            {/* Floating Stat Card */}
            {(card1?.statNumber || card1?.statLabel) && (
              <div className="absolute top-4 right-4 bg-[#18110B] border border-amber-950/20 text-white rounded-2xl p-4 sm:p-5 shadow-xl max-w-[190px] animate-fade-in-up">
                {card1.statNumber && (
                  <span className="text-2xl sm:text-3xl font-black text-amber-500 mb-1 block">
                    {card1.statNumber}
                  </span>
                )}
                {card1.statLabel && (
                  <span className="text-xs font-bold text-slate-300 leading-snug block">
                    {card1.statLabel}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Card 2 */}
          <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-slate-50 aspect-[4/3] group">
            {c2ImgUrl ? (
              <img
                src={c2ImgUrl}
                alt={c2ImgAlt}
                className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                No Image Selected
              </div>
            )}

            {/* Floating Stat Card */}
            {(card2?.statNumber || card2?.statLabel) && (
              <div className="absolute bottom-4 left-4 bg-[#18110B] border border-amber-950/20 text-white rounded-2xl p-4 sm:p-5 shadow-xl max-w-[190px] animate-fade-in-up">
                {card2.statNumber && (
                  <span className="text-2xl sm:text-3xl font-black text-amber-500 mb-1 block">
                    {card2.statNumber}
                  </span>
                )}
                {card2.statLabel && (
                  <span className="text-xs font-bold text-slate-300 leading-snug block">
                    {card2.statLabel}
                  </span>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Text Information & Highlights */}
        <div className="lg:col-span-7 flex flex-col animate-fade-in-up">
          
          {/* Subheading with Orange Colon */}
          {subheading && (
            <span className="inline-flex items-center text-amber-600 font-extrabold text-sm uppercase tracking-widest gap-2.5 mb-5">
              <span className="text-amber-600 font-extrabold">:</span>
              {subheading.replace(/^::\s*|^:\s*/, '')}
            </span>
          )}

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {heading}
          </h2>

          <p className="text-slate-600 text-lg lg:text-xl leading-relaxed mb-6 font-medium whitespace-pre-line">
            {description1}
          </p>

          {description2 && (
            <p className="text-slate-600 text-base lg:text-lg leading-relaxed mb-10 font-medium whitespace-pre-line">
              {description2}
            </p>
          )}

          {/* Highlights List (Divider-separated lines) */}
          <div className="border-t border-slate-200 mt-4">
            {highlights?.map((item, idx) => {
              const highlightContent = (
                <div className="flex-grow pr-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              )

              return item.link ? (
                <Link
                  key={item.id || idx}
                  href={item.link}
                  className="flex items-center justify-between py-6 border-b border-slate-200/60 group transition-all duration-300 text-left"
                >
                  {highlightContent}
                  <span className="p-2 rounded-full border border-transparent group-hover:border-amber-500/20 text-slate-400 group-hover:text-amber-600 transition-all duration-300 flex-shrink-0 self-center">
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ) : (
                <div
                  key={item.id || idx}
                  className="flex items-center justify-between py-6 border-b border-slate-200/60"
                >
                  {highlightContent}
                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
export default WhoWeAre
