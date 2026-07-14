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

export interface FeaturedPostProps {
  heading: string
  content: string
  image: Media | string | null
  cta?: CTA
}

export const FeaturedPost: React.FC<FeaturedPostProps> = ({
  heading,
  content,
  image,
  cta,
}) => {
  const imgUrl = typeof image === 'object' && image?.url ? image.url : ''
  const imgAlt = typeof image === 'object' && image?.alt ? image.alt : 'Featured Post Image'

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-700 overflow-hidden border-t border-amber-500/10">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Text Column */}
        <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1 animate-fade-in-right">
          <span className="text-amber-100 font-bold text-sm tracking-wider uppercase mb-3 block">
            Featured Restoration
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {heading}
          </h2>
          <p className="text-white text-lg leading-relaxed mb-10 font-medium whitespace-pre-line">
            {content}
          </p>

          {cta?.text && (
            <div>
              <Link
                href={getCtaHref(cta)}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-slate-950 hover:bg-transparent border border-transparent hover:border-white text-white hover:text-white font-bold rounded-lg shadow-md transition-all duration-300"
              >
                {cta.text}
              </Link>
            </div>
          )}
        </div>

        {/* Image Column */}
        <div className="lg:col-span-6 order-1 lg:order-2 animate-fade-in-up">
          {imgUrl ? (
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/20 bg-slate-900 group shadow-2xl transition-all duration-300 hover:border-white/40">
              {/* Wooden Border Overlay */}
              <div className="absolute inset-0 border-[6px] border-white/10 group-hover:border-white/20 z-20 transition-colors duration-300 pointer-events-none rounded-3xl" />
              <img
                src={imgUrl}
                alt={imgAlt}
                className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-700 ease-out z-10"
              />
            </div>
          ) : (
            <div className="aspect-[4/3] w-full bg-slate-900 border border-white/10 rounded-3xl flex items-center justify-center text-slate-500">
              No Image Available
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
export default FeaturedPost
