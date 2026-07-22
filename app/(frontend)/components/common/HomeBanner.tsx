import React from 'react'
import Link from 'next/link'
import { getCtaHref } from '../../../../utilities/cta'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'

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

export interface HomeBannerProps {
  anchorId?: string
  heading: string
  subHeading?: string
  description?: string
  backgroundImage?: Media | string | null
  backgroundVideo?: Media | string | null
  ctaButton?: CTA
  secondaryCta?: CTA
}

export const HomeBanner: React.FC<HomeBannerProps> = ({
  anchorId,
  heading,
  subHeading,
  description,
  backgroundImage,
  backgroundVideo,
  ctaButton,
  secondaryCta,
}) => {
  const bgUrl = resolveMediaUrl(backgroundImage)
  const bgAlt = resolveMediaAlt(backgroundImage, 'Background Image')
  const videoUrl = resolveMediaUrl(backgroundVideo)

  return (
    <section id={anchorId || 'home'} className="relative min-h-[75vh] lg:min-h-[85vh] flex items-center justify-start overflow-hidden py-20 lg:py-28 bg-[#18110B]">
      {/* Background Video / Image Selector */}
      {videoUrl ? (
        <div className="absolute inset-0 z-0">
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#18110B] via-[#18110B]/85 to-transparent z-10" />
        </div>
      ) : bgUrl ? (
        <div className="absolute inset-0 z-0">
          <img
            src={bgUrl}
            alt={bgAlt}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#18110B] via-[#18110B]/90 to-transparent z-10" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-amber-500/5 via-[#18110B] to-[#18110B]" />
      )}

      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none z-10 animate-pulse-glow" />

      {/* Content Container (Left-aligned with minimized margins/padding) */}
      <div className="relative max-w-[1600px] mx-auto w-full z-20 text-left px-4 sm:px-6 flex flex-col items-start">
        {subHeading && (
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 mb-6 uppercase animate-fade-in-right">
            {subHeading}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 max-w-4xl drop-shadow-md animate-fade-in-up">
          {heading}
        </h1>

        {description && (
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed mb-8 font-medium animate-fade-in-up delay-100">
            {description}
          </p>
        )}

        {/* Buttons (Hover Swaps) */}
        <div className="flex flex-col sm:flex-row gap-4 items-center animate-fade-in-up delay-200 w-full sm:w-auto">
          {ctaButton?.text ? (
            <Link
              href={getCtaHref(ctaButton)}
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-transparent border border-transparent hover:border-amber-500 text-slate-950 hover:text-amber-400 font-bold rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all duration-300 text-center cursor-pointer"
            >
              {ctaButton.text}
            </Link>
          ) : null}

          {secondaryCta?.text ? (
            <Link
              href={getCtaHref(secondaryCta)}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-amber-500 border border-amber-500/50 hover:border-transparent text-amber-400 hover:text-slate-950 font-bold rounded-lg transition-all duration-300 text-center cursor-pointer"
            >
              {secondaryCta.text}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}
export default HomeBanner
