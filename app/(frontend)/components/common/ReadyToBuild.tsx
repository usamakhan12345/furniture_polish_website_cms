import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCtaHref } from '../../../../utilities/cta'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'
import { Reveal } from '../ui/Reveal'

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
  const bgUrl = resolveMediaUrl(backgroundImage)
  const bgAlt = resolveMediaAlt(backgroundImage, 'Background Image')

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50">
      <div className="max-w-[1600px] mx-auto relative z-10">
        <Reveal direction="scale">
          {/* Animated gradient border: the wrapper's padding is the visible 'stroke' */}
          <div className="border-spin rounded-3xl p-[1.5px] shadow-sm">
            <div className="relative isolate overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-[#FBF6EE] p-8 sm:p-12 lg:p-16 text-center flex flex-col items-center">
              {/* Card background media */}
              {bgUrl && (
                <div className="absolute inset-0 -z-10">
                  <img
                    src={bgUrl}
                    alt={bgAlt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-[#FAF6EE]/90" />
                </div>
              )}

              {/* Golden radial background overlay + drifting orbs */}
              <div
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.07)_0%,transparent_70%)] pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute -top-16 -left-16 w-[240px] h-[240px] rounded-full bg-amber-400/15 blur-[80px] -z-10 pointer-events-none animate-float-slow"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-20 -right-12 w-[280px] h-[280px] rounded-full bg-orange-400/15 blur-[90px] -z-10 pointer-events-none animate-float"
                aria-hidden="true"
              />

              {/* Content */}
              <div className="relative max-w-3xl">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                  {heading}
                </h2>
                {description && (
                  <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">{description}</p>
                )}
                {cta?.text && (
                  <span className="inline-block rounded-xl animate-ring-pulse">
                    <Link href={getCtaHref(cta)} className="btn btn-primary">
                      <span>{cta.text}</span>
                      <ArrowRight className="btn-icon w-4 h-4" aria-hidden="true" />
                    </Link>
                  </span>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
export default ReadyToBuild
