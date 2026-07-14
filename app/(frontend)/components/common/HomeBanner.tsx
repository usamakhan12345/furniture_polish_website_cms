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

export interface HomeBannerProps {
  heading: string
  subHeading?: string
  description?: string
  backgroundImage?: Media | string | null
  backgroundVideo?: Media | string | null
  ctaButton?: CTA
  secondaryCta?: CTA
}

export const HomeBanner: React.FC<HomeBannerProps> = ({
  heading,
  subHeading,
  description,
  backgroundImage,
  backgroundVideo,
  ctaButton,
  secondaryCta,
}) => {
  const bgUrl = typeof backgroundImage === 'object' && backgroundImage?.url ? backgroundImage.url : ''
  const bgAlt = typeof backgroundImage === 'object' && backgroundImage?.alt ? backgroundImage.alt : 'Background Image'
  const videoUrl = typeof backgroundVideo === 'object' && backgroundVideo?.url ? backgroundVideo.url : ''

  return (
    <section className="relative min-h-[95vh] flex items-center justify-start overflow-hidden py-32 bg-[#0B0806]">
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0806] via-[#0B0806]/85 to-transparent z-10" />
        </div>
      ) : bgUrl ? (
        <div className="absolute inset-0 z-0">
          <img
            src={bgUrl}
            alt={bgAlt}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0806] via-[#0B0806]/90 to-transparent z-10" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-amber-950/20 via-[#0B0806] to-[#0B0806]" />
      )}

      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none z-10 animate-pulse-glow" />

      {/* Content Container (Left-aligned) */}
      <div className="relative max-w-7xl mx-auto w-full z-20 text-left px-4 sm:px-6 lg:px-8 flex flex-col items-start">
        {subHeading && (
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 mb-6 uppercase animate-fade-in-right">
            {subHeading}
          </span>
        )}

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-8 max-w-3xl drop-shadow-md animate-fade-in-up">
          {heading}
        </h1>

        {description && (
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed mb-12 font-medium animate-fade-in-up delay-100">
            {description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 items-center animate-fade-in-up delay-200 w-full sm:w-auto">
          {ctaButton?.text ? (
            <Link
              href={getCtaHref(ctaButton)}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold rounded-lg shadow-lg hover:shadow-amber-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center"
            >
              {ctaButton.text}
            </Link>
          ) : null}

          {secondaryCta?.text ? (
            <Link
              href={getCtaHref(secondaryCta)}
              className="w-full sm:w-auto px-8 py-4 bg-[#18110B]/60 hover:bg-[#18110B]/85 text-white font-semibold rounded-lg border border-amber-900/20 hover:border-amber-900/40 transform hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md transition-all duration-200 text-center"
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
