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
  anchorId?: string
  heading: string
  description: string
  image: Media | string | null
  cta1?: CTA
  cta2?: CTA
}

export const SubpageBanner: React.FC<SubpageBannerProps> = ({
  anchorId,
  heading,
  description,
  image,
  cta1,
  cta2,
}) => {
  const imgUrl = typeof image === 'object' && image?.url ? image.url : ''
  const imgAlt = typeof image === 'object' && image?.alt ? image.alt : 'Background Image'

  return (
    <section id={anchorId || 'subpage-banner'} className="relative min-h-[45vh] lg:min-h-[50vh] flex items-center justify-start py-20 lg:py-24 bg-[#FAF6EE] overflow-hidden border-t border-slate-200/50">
      
      {/* Background Image & Light Overlay */}
      {imgUrl ? (
        <div className="absolute inset-0 z-0">
          <img
            src={imgUrl}
            alt={imgAlt}
            className="w-full h-full object-cover object-center"
          />
          {/* Light theme gradient overlay: fading from light beige on the left to semi-transparent on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6EE] via-[#FAF6EE]/95 to-transparent z-10" />
        </div>
      ) : (
        /* Fallback decorative background glow */
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      )}

      {/* Content Container (Left-aligned, Light Theme text) */}
      <div className="relative max-w-[1600px] mx-auto w-full z-20 text-left px-4 sm:px-6 flex flex-col items-start">
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6 max-w-3xl animate-fade-in-right">
          {heading}
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-10 font-medium max-w-2xl whitespace-pre-line animate-fade-in-up">
          {description}
        </p>

        {/* CTA Buttons (Hover Swaps) */}
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto animate-fade-in-up">
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
    </section>
  )
}
export default SubpageBanner
