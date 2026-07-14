'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
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

interface SlideItem {
  id?: string
  image: Media | string | null
  title: string
  description?: string
  cta?: CTA
}

export interface WorkSliderProps {
  heading: string
  slides: SlideItem[]
}

export const WorkSlider: React.FC<WorkSliderProps> = ({
  heading,
  slides,
}) => {
  const [current, setCurrent] = useState(0)

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? Math.ceil(slides.length / 2) - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrent((prev) => (prev === Math.ceil(slides.length / 2) - 1 ? 0 : prev + 1))
  }

  if (!slides || slides.length === 0) return null

  const itemsPerPage = 2

  return (
    <section id="portfolio" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0806] overflow-hidden border-t border-amber-950/5">
      {/* Wood Glow decoration */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-16 gap-6">
          <div>
            <span className="text-amber-400 font-bold text-sm tracking-wider uppercase mb-2 block animate-fade-in-right">
              Our Craftsmanship Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight animate-fade-in-up">
              {heading}
            </h2>
          </div>
          
          {slides.length > itemsPerPage && (
            <div className="flex items-center gap-3 animate-fade-in-up">
              <button
                type="button"
                onClick={handlePrev}
                className="p-3.5 rounded-xl bg-[#18110B] border border-amber-950/10 text-slate-400 hover:text-white hover:border-amber-500/30 transition-all duration-200"
                aria-label="Previous Slide"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-3.5 rounded-xl bg-[#18110B] border border-amber-950/10 text-slate-400 hover:text-white hover:border-amber-500/30 transition-all duration-200"
                aria-label="Next Slide"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Viewport */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{ transform: `translateX(calc(-${current * 100}% - ${current * 24}px))` }}
          >
            {slides.map((slide, idx) => {
              const imgUrl = typeof slide.image === 'object' && slide.image?.url ? slide.image.url : ''
              const imgAlt = typeof slide.image === 'object' && slide.image?.alt ? slide.image.alt : slide.title
              const ctaUrl = slide.cta ? getCtaHref(slide.cta) : ''

              return (
                <div
                  key={slide.id || idx}
                  className="w-full md:w-[calc(50%-12px)] flex-shrink-0 flex flex-col bg-[#18110B] border border-amber-950/10 rounded-2xl overflow-hidden shadow-xl wood-card-hover"
                >
                  {/* Card Image */}
                  <div className="aspect-[16/10] w-full overflow-hidden relative group border-b border-amber-950/10">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent z-10" />
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={imgAlt}
                        className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-600">
                        No image uploaded
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {slide.title}
                    </h3>
                    {slide.description && (
                      <p className="text-slate-400 mb-6 line-clamp-3 leading-relaxed text-sm font-medium">
                        {slide.description}
                      </p>
                    )}
                    {slide.cta?.text && ctaUrl && ctaUrl !== '#' && (
                      <div className="mt-auto pt-4">
                        <Link
                          href={ctaUrl}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors duration-200"
                        >
                          <span>{slide.cta.text}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
export default WorkSlider
