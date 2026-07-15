import React from 'react'
import Link from 'next/link'
import { getCtaHref } from '../../../../utilities/cta'

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

export interface SubpageBannerProps {
  heading: string
  description: string
  image: Media | string | null
  cta1?: CTA
  cta2?: CTA
}

export const SubpageBanner: React.FC<SubpageBannerProps> = ({
  heading,
  description,
  image,
  cta1,
  cta2,
}) => {
  const imgUrl = typeof image === 'object' && image?.url ? image.url : ''
  const imgAlt = typeof image === 'object' && image?.alt ? image.alt : 'Showcase Graphic'

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FAF6EE] via-[#FDFBF7] to-[#F5EBE0] overflow-hidden border-t border-slate-200/50">
      {/* Decorative radial background glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Text & CTA Buttons */}
        <div className="lg:col-span-7 flex flex-col justify-center animate-fade-in-right">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6 max-w-2xl">
            {heading}
          </h1>

          <p className="text-slate-600 text-lg sm:text-xl leading-relaxed mb-10 font-medium max-w-xl whitespace-pre-line">
            {description}
          </p>

          {/* CTA Buttons (Hover Swaps) */}
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
            {cta1?.text && (
              <Link
                href={getCtaHref(cta1)}
                className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-transparent border border-transparent hover:border-amber-600 text-slate-950 hover:text-amber-700 font-bold rounded-lg shadow-md hover:shadow-amber-500/10 transition-all duration-300 text-center"
              >
                {cta1.text}
              </Link>
            )}

            {cta2?.text && (
              <Link
                href={getCtaHref(cta2)}
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-slate-950 border border-slate-950 hover:border-transparent text-slate-950 hover:text-white font-bold rounded-lg transition-all duration-300 text-center"
              >
                {cta2.text}
              </Link>
            )}
          </div>
        </div>

        {/* Right Column: Illustration Image */}
        <div className="lg:col-span-5 animate-fade-in-up">
          {imgUrl ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden group">
              <img
                src={imgUrl}
                alt={imgAlt}
                className="w-full h-full object-contain transform group-hover:scale-[1.01] transition-transform duration-700 ease-out"
              />
            </div>
          ) : (
            <div className="aspect-[4/3] w-full bg-[#FAF6EE]/50 border border-slate-200/40 rounded-3xl flex items-center justify-center text-slate-400">
              No Illustration Selected
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
export default SubpageBanner
