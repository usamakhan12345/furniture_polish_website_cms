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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-slate-950">
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
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/70 z-10" />
        </div>
      ) : bgUrl ? (
        <div className="absolute inset-0 z-0">
          <img
            src={bgUrl}
            alt={bgAlt}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/85 z-10" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-amber-950/20 via-slate-950 to-slate-950" />
      )}

      {/* Glow Effect */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-10" />

      {/* Content Container */}
      <div className="relative max-w-5xl mx-auto text-center z-20 flex flex-col items-center">
        {subHeading && (
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 mb-6 uppercase animate-fade-in">
            {subHeading}
          </span>
        )}

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-none mb-8 max-w-4xl drop-shadow-sm">
          {heading}
        </h1>

        {description && (
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-12 font-medium">
            {description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {ctaButton?.text ? (
            <Link
              href={getCtaHref(ctaButton)}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-amber-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center"
            >
              {ctaButton.text}
            </Link>
          ) : null}

          {secondaryCta?.text ? (
            <Link
              href={getCtaHref(secondaryCta)}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900/60 hover:bg-slate-800/80 text-white font-semibold rounded-xl border border-slate-700/60 hover:border-slate-600 transform hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md transition-all duration-200 text-center"
            >
              {secondaryCta.text}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}
