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
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Text Column */}
        <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
          <span className="text-amber-400 font-bold text-sm tracking-wider uppercase mb-3 block">
            Featured Restoration
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {heading}
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-10 font-medium whitespace-pre-line">
            {content}
          </p>

          {cta?.text && (
            <div>
              <Link
                href={getCtaHref(cta)}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold rounded-xl shadow-lg transition-all duration-200"
              >
                {cta.text}
              </Link>
            </div>
          )}
        </div>

        {/* Image Column */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          {imgUrl ? (
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 group shadow-2xl">
              {/* Wooden Border Overlay */}
              <div className="absolute inset-0 border-[6px] border-amber-500/10 group-hover:border-amber-500/20 z-20 transition-colors duration-300 pointer-events-none rounded-3xl" />
              <img
                src={imgUrl}
                alt={imgAlt}
                className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-700 ease-out z-10"
              />
            </div>
          ) : (
            <div className="aspect-[4/3] w-full bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center text-slate-500">
              No Image Available
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
export default FeaturedPost
