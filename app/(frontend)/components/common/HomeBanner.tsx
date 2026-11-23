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
    <section
      id={anchorId || 'home'}
      className="relative isolate min-h-[75vh] lg:min-h-[85vh] flex items-center justify-start overflow-hidden py-20 lg:py-28 bg-[#18110B]"
    >
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
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={bgUrl}
            alt={bgAlt}
            fetchPriority="high"
            className="w-full h-full object-cover object-center animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#18110B] via-[#18110B]/90 to-transparent z-10" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-amber-500/5 via-[#18110B] to-[#18110B]" />
      )}

      {/* Wood-grain texture + soft vignette */}
      <div className="absolute inset-0 z-10 wood-grain opacity-60 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.45),transparent_60%)]"
        aria-hidden="true"
      />

      {/* Floating glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none z-10 animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 right-[8%] w-[320px] h-[320px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none z-10 animate-float-slow"
        aria-hidden="true"
      />

      {/* Content Container (Left-aligned with minimized margins/padding) */}
      <div className="relative max-w-[1600px] mx-auto w-full z-20 text-left px-4 sm:px-6 flex flex-col items-start">
        {subHeading && (
          <span
            className="enter-right inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm mb-6 uppercase"
            style={enterDelay(0)}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            {subHeading}
          </span>
        )}

        <h1
          className="enter text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 max-w-4xl drop-shadow-md"
          style={enterDelay(120)}
        >
          {heading}
        </h1>

        {description && (
          <p
            className="enter text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed mb-8 font-medium"
            style={enterDelay(260)}
          >
            {description}
          </p>
        )}

        {/* Buttons (fill-sweep hover swap) */}
        <div
          className="enter flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto"
          style={enterDelay(400)}
        >
          {ctaButton?.text ? (
            <Link href={getCtaHref(ctaButton)} className="btn btn-primary w-full sm:w-auto">
              <span>{ctaButton.text}</span>
              <ArrowRight className="btn-icon w-4 h-4" aria-hidden="true" />
            </Link>
          ) : null}

          {secondaryCta?.text ? (
            <Link href={getCtaHref(secondaryCta)} className="btn btn-outline w-full sm:w-auto">
              {secondaryCta.text}
            </Link>
          ) : null}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="enter hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 text-amber-300/70"
        style={enterDelay(900)}
        aria-hidden="true"
      >
        <span className="scroll-cue" />
      </div>
    </section>
  )
}
export default HomeBanner
