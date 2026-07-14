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

export interface ReadyToBuildProps {
  heading: string
  description?: string
  cta?: CTA
  backgroundImage?: Media | string | null
}

export const ReadyToBuild: React.FC<ReadyToBuildProps> = ({
  heading,
  description,
  cta,
  backgroundImage,
}) => {
  const bgUrl = typeof backgroundImage === 'object' && backgroundImage?.url ? backgroundImage.url : ''
  const bgAlt = typeof backgroundImage === 'object' && backgroundImage?.alt ? backgroundImage.alt : 'Background Image'

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0B0806] overflow-hidden border-t border-amber-950/5">
      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="relative rounded-3xl overflow-hidden border border-amber-950/10 p-8 sm:p-12 lg:p-16 bg-[#18110B]/30 backdrop-blur-sm shadow-2xl text-center flex flex-col items-center">
          
          {/* Card background media */}
          {bgUrl && (
            <div className="absolute inset-0 z-0">
              <img
                src={bgUrl}
                alt={bgAlt}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-[#0B0806]/85 z-10" />
            </div>
          )}

          {/* Golden radial background overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)] z-10 pointer-events-none" />

          {/* Content */}
          <div className="relative z-20 max-w-3xl animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
              {heading}
            </h2>
            {description && (
              <p className="text-lg text-slate-300 mb-10 leading-relaxed font-medium">
                {description}
              </p>
            )}
            {cta?.text && (
              <div>
                <Link
                  href={getCtaHref(cta)}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-amber-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  {cta.text}
                </Link>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}
export default ReadyToBuild
