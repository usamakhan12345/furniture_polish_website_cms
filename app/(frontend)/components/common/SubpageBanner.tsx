import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCtaHref } from '../../../../utilities/cta'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'
import { enterDelay } from '../ui/motion'

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
  const imgUrl = resolveMediaUrl(image)
  const imgAlt = resolveMediaAlt(image, 'Background Image')

  return (
    <section
      id={anchorId || 'subpage-banner'}
      className="relative isolate min-h-[45vh] lg:min-h-[50vh] flex items-center justify-start py-20 lg:py-24 bg-[#FAF6EE] overflow-hidden border-t border-slate-200/50"
    >
      {/* Background Image & Light Overlay */}
      {imgUrl ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={imgUrl}
            alt={imgAlt}
            fetchPriority="high"
            className="w-full h-full object-cover object-center animate-ken-burns"
          />
          {/* Light theme gradient overlay: fading from light beige on the left to semi-transparent on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6EE] via-[#FAF6EE]/95 to-transparent z-10" />
        </div>
      ) : null}

      {/* Decorative glows (always on, so the banner never looks flat) */}
      <div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-10 animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 right-[10%] w-[260px] h-[260px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none z-10 animate-float-slow"
        aria-hidden="true"
      />

      {/* Content Container (Left-aligned, Light Theme text) */}
      <div className="relative max-w-[1600px] mx-auto w-full z-20 text-left px-4 sm:px-6 flex flex-col items-start">
        <span
          className="enter-right mb-6 block h-1 w-16 rounded-full bg-gradient-to-r from-amber-600 to-amber-300"
          style={enterDelay(0)}
          aria-hidden="true"
        />

        <h1
          className="enter text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6 max-w-3xl"
          style={enterDelay(100)}
        >
          {heading}
        </h1>

        <p
          className="enter text-slate-600 text-base sm:text-lg leading-relaxed mb-10 font-medium max-w-2xl whitespace-pre-line"
          style={enterDelay(240)}
        >
          {description}
        </p>

        {/* CTA Buttons (fill-sweep hover swap) */}
        <div
          className="enter flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto"
          style={enterDelay(380)}
        >
          {cta1?.text && (
            <Link href={getCtaHref(cta1)} className="btn btn-primary w-full sm:w-auto">
              <span>{cta1.text}</span>
              <ArrowRight className="btn-icon w-4 h-4" aria-hidden="true" />
            </Link>
          )}

          {cta2?.text && (
            <Link href={getCtaHref(cta2)} className="btn btn-outline-dark w-full sm:w-auto">
              {cta2.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
export default SubpageBanner
