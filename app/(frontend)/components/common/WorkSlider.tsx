'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getCtaHref } from '../../../../utilities/cta'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'
import { Reveal } from '../ui/Reveal'
import { useLoopCarousel } from '../ui/useLoopCarousel'

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

interface SlideItem {
  id?: string
  image: Media | string | null
  title: string
  description?: string
  cta?: CTA
}

export interface WorkSliderProps {
  anchorId?: string
  heading: string
  slides: SlideItem[]
}

const MAX_DOTS = 10

export const WorkSlider: React.FC<WorkSliderProps> = ({ anchorId, heading, slides }) => {
  const count = slides?.length ?? 0
  const { copies, active, trackStyle, handlers, next, prev, goTo } = useLoopCarousel(count, {
    autoPlayMs: 6000,
  })

  if (!slides || count === 0) return null

  // Repeated copies make the loop seamless (see useLoopCarousel)
  const displaySlides = Array.from({ length: copies }).flatMap(() => slides)

  return (
    <section
      id={anchorId || 'portfolio'}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#F5EBE0]/30 overflow-hidden border-t border-slate-200/50"
    >
      {/* Wood Glow decoration */}
      <div
        className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 gap-6 px-3">
          <Reveal direction="left">
            <span className="eyebrow mb-3">Our Craftsmanship Portfolio</span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              {heading}
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <div className="flex items-center gap-3">
              {count > 1 && count <= MAX_DOTS && (
                <div className="hidden md:flex items-center gap-1.5 mr-3">
                  {slides.map((slide, idx) => (
                    <button
                      key={`${slide.id || idx}-dot`}
                      type="button"
                      aria-current={idx === active ? 'true' : undefined}
                      aria-label={`Go to slide ${idx + 1}`}
                      onClick={() => goTo(idx)}
                      className={`h-2 rounded-full transition-all duration-500 ease-out cursor-pointer ${
                        idx === active ? 'w-8 bg-amber-500' : 'w-2 bg-slate-300 hover:bg-amber-300'
                      }`}
                    />
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={prev}
                className="group p-3.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-950 hover:bg-amber-500 hover:border-amber-500 active:scale-95 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="group p-3.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-950 hover:bg-amber-500 hover:border-amber-500 active:scale-95 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer"
                aria-label="Next Slide"
              >
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Viewport */}
        <Reveal direction="fade" delay={100}>
          {/* Vertical padding gives the cards' hover lift and shadow room inside the clipping viewport */}
          <div className="overflow-hidden touch-pan-y pt-4 pb-12 -mt-4 -mb-12" {...handlers}>
            <div
              className="flex [--per-view:1] md:[--per-view:2] lg:[--per-view:3] will-change-transform"
              style={trackStyle}
            >
              {displaySlides.map((slide, idx) => {
                const imgUrl = resolveMediaUrl(slide.image)
                const imgAlt = resolveMediaAlt(slide.image, slide.title)
                const ctaUrl = slide.cta ? getCtaHref(slide.cta) : ''

                return (
                  <div
                    key={`${slide.id || idx}-${idx}`}
                    className="w-[calc(100%/var(--per-view))] flex-shrink-0 px-3"
                  >
                    <div className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm wood-card-hover h-full">
                      {/* Card Image */}
                      <div className="aspect-[2/1] w-full overflow-hidden relative border-b border-slate-100">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={imgAlt}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            className="w-full h-full object-cover transform group-hover:scale-[1.07] transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                            No image uploaded
                          </div>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 tracking-tight group-hover:text-amber-700 transition-colors duration-300">
                          {slide.title}
                        </h3>
                        {slide.description && (
                          <p className="text-slate-700 text-sm sm:text-base mb-6 leading-relaxed font-medium line-clamp-3">
                            {slide.description}
                          </p>
                        )}
                        {slide.cta?.text && ctaUrl && ctaUrl !== '#' && (
                          <div className="mt-auto pt-2">
                            <Link
                              href={ctaUrl}
                              className="group/cta inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-500 transition-colors duration-200"
                            >
                              <span className="link-underline pb-0.5">{slide.cta.text}</span>
                              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1.5" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* Counter for long lists / small screens */}
        {count > 1 && (
          <p className="mt-8 text-center text-xs font-bold tracking-[0.25em] text-slate-400 tabular-nums md:hidden" aria-hidden="true">
            {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </p>
        )}
      </div>
    </section>
  )
}
export default WorkSlider
