'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'

interface Media {
  url?: string
  alt?: string
}

interface Testimonial {
  id?: string
  name: string
  company?: string
  title?: string
  image?: Media | string | null
  rating: number
  feedback: string
}

export interface FeedbackSectionProps {
  heading: string
  subheading?: string
  description?: string
  testimonials: Testimonial[]
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  heading,
  subheading,
  description,
  testimonials,
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

  if (!testimonials || testimonials.length === 0) return null

  // Triple testimonials to support seamless infinite looping scrolling
  const displayTestimonials = [...testimonials, ...testimonials, ...testimonials]

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF6EE] overflow-hidden border-t border-slate-200/50">
      {/* Decorative Glow background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header (Centered) */}
        <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-in-up">
          {subheading && (
            <span className="text-amber-600 font-bold text-sm tracking-wider uppercase mb-2 block">
              {subheading}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {heading}
          </h2>
          {description && (
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
              {description}
            </p>
          )}
        </div>

        {/* Carousel Content Row */}
        <div className="relative px-4 sm:px-8 md:px-12">
          
          {/* Viewport */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${(current + testimonials.length) * (100 / itemsPerView)}%)`,
              }}
            >
              {displayTestimonials.map((t, idx) => {
                const avatarUrl = typeof t.image === 'object' && t.image?.url ? t.image.url : ''
                const avatarAlt = typeof t.image === 'object' && t.image?.alt ? t.image.alt : t.name

                return (
                  <div
                    key={`${t.id || idx}-${idx}`}
                    className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                  >
                    {/* Testimonial Card */}
                    <div className="flex flex-col bg-white border border-amber-500/20 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 wood-card-hover h-full min-h-[300px]">
                      
                      {/* Quote Icon (Amber) */}
                      <div className="text-amber-500 mb-6 flex-shrink-0">
                        <Quote className="w-8 h-8 fill-amber-500" />
                      </div>

                      {/* Review Text */}
                      <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 font-medium">
                        {t.feedback}
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-100">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt={avatarAlt}
                            className="w-11 h-11 rounded-full object-cover border border-amber-500/10"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 font-bold text-sm">
                            {t.name.charAt(0)}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 leading-tight">
                            {t.name}
                          </span>
                          {t.company && (
                            <span className="text-xs font-bold text-amber-600 uppercase mt-0.5 tracking-wide">
                              {t.company}
                            </span>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Left Arrow Button (Absolute Center Floating) */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute top-1/2 -left-2 sm:-left-4 -translate-y-1/2 z-20 p-3 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-amber-600 hover:border-amber-500 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
            aria-label="Previous Feedback"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button (Absolute Center Floating) */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute top-1/2 -right-2 sm:-right-4 -translate-y-1/2 z-20 p-3 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-amber-600 hover:border-amber-500 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
            aria-label="Next Feedback"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

        </div>

      </div>
    </section>
  )
}
export default FeedbackSection
