'use client'

import React, { useState, useEffect } from 'react'
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
  anchorId?: string
  heading: string
  slides: SlideItem[]
}

export const WorkSlider: React.FC<WorkSliderProps> = ({
  anchorId,
  heading,
  slides,
}) => {
  const [current, setCurrent] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3)
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2)
      } else {
        setItemsPerView(1)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!slides || slides.length === 0) return null

  // Triple slides to enable infinite scroll wrap-around
  const displaySlides = [...slides, ...slides, ...slides]

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  return (
    <section id={anchorId || 'portfolio'} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#F5EBE0]/30 overflow-hidden border-t border-slate-200/50">
      {/* Wood Glow decoration */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 gap-6 px-3">
          <div>
            <span className="text-amber-600 font-bold text-sm tracking-wider uppercase mb-2 block animate-fade-in-right">
              Our Craftsmanship Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight animate-fade-in-up">
              {heading}
            </h2>
          </div>
          
          <div className="flex items-center gap-3 animate-fade-in-up">
            <button
              type="button"
              onClick={handlePrev}
              className="p-3.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-500/30 transition-all duration-200 shadow-sm cursor-pointer"
              aria-label="Previous Slide"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-3.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-500/30 transition-all duration-200 shadow-sm cursor-pointer"
              aria-label="Next Slide"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${(current + slides.length) * (100 / itemsPerView)}%)`,
            }}
          >
            {displaySlides.map((slide, idx) => {
              const imgUrl = typeof slide.image === 'object' && slide.image?.url ? slide.image.url : ''
              const imgAlt = typeof slide.image === 'object' && slide.image?.alt ? slide.image.alt : slide.title
              const ctaUrl = slide.cta ? getCtaHref(slide.cta) : ''

              return (
                <div
                  key={`${slide.id || idx}-${idx}`}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                >
                  <div className="flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 wood-card-hover h-full">
                    {/* Card Image (Height minimized to aspect-[2/1]) */}
                    <div className="aspect-[2/1] w-full overflow-hidden relative group border-b border-slate-100">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent z-10" />
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={imgAlt}
                          className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                          No image uploaded
                        </div>
                      )}
                    </div>

                    {/* Card Body (Increased headings & description font sizes) */}
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">
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
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-500 transition-colors duration-200"
                          >
                            <span>{slide.cta.text}</span>
                            <ArrowRight className="w-4 h-4" />
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

      </div>
    </section>
  )
}
export default WorkSlider
