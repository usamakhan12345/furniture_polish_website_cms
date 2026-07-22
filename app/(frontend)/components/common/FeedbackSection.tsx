'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, Quote, X, Send, Loader2, Star } from 'lucide-react'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'

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
  anchorId?: string
  heading: string
  subheading?: string
  description?: string
  testimonials: Testimonial[]
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  anchorId,
  heading,
  subheading,
  description,
  testimonials,
}) => {
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>(testimonials || [])
  const [current, setCurrent] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    title: '',
    rating: 5,
    feedback: '',
  })

  // 1. Fetch dynamic client feedbacks from the database on mount
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch('/api/feedback')
        if (res.ok) {
          const data = await res.json()
          if (data.docs && data.docs.length > 0) {
            const mapped: Testimonial[] = data.docs.map((d: any) => ({
              id: d.id,
              name: d.name,
              company: d.company,
              title: d.title,
              rating: d.rating,
              feedback: d.feedback,
              image: null, // Dynamic uploads initially have no avatar
            }))
            // Merge static predefined testimonials with dynamic database testimonials
            setAllTestimonials([...testimonials, ...mapped])
          }
        }
      } catch (err) {
        console.error('Error fetching feedbacks from API:', err)
      }
    }
    fetchFeedbacks()
  }, [testimonials])

  // Track resizing to configure layout grid columns count
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

  // Prevent background scrolling when submission modal is active
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  if (!allTestimonials || allTestimonials.length === 0) return null

  // Triple testimonials list to enable infinite wrap scrolling
  const displayTestimonials = [...allTestimonials, ...allTestimonials, ...allTestimonials]

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length)
  }

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % allTestimonials.length)
  }

  // Handle new feedback form submissions
  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('loading')

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        const newTestimonial: Testimonial = {
          id: result.doc.id,
          name: result.doc.name,
          company: result.doc.company,
          title: result.doc.title,
          rating: result.doc.rating,
          feedback: result.doc.feedback,
          image: null,
        }

        // Append the new review immediately to the state array (run-time updates)
        setAllTestimonials((prev) => [...prev, newTestimonial])
        setSubmitStatus('success')
        
        // Reset states after temporary visual success delay
        setTimeout(() => {
          setIsModalOpen(false)
          setSubmitStatus('idle')
          setFormData({ name: '', company: '', title: '', rating: 5, feedback: '' })
        }, 1500)

      } else {
        setSubmitStatus('error')
      }
    } catch (err) {
      console.error('Feedback submission error:', err)
      setSubmitStatus('error')
    }
  }

  return (
    <section id={anchorId || 'feedback'} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF6EE] overflow-hidden border-t border-slate-200/50">
      {/* Decorative Glow background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto relative">
          {subheading && (
            <span className="text-amber-600 font-bold text-sm tracking-wider uppercase mb-2 block animate-fade-in-right">
              {subheading}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {heading}
          </h2>
          {description && (
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium mb-6">
              {description}
            </p>
          )}

          {/* Trigger Button: Share Feedback */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer text-sm"
          >
            <span>Write a Review</span>
          </button>
        </div>

        {/* Carousel Content Row */}
        <div className="relative px-4 sm:px-8 md:px-12">
          
          {/* Viewport */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${(current + allTestimonials.length) * (100 / itemsPerView)}%)`,
              }}
            >
              {displayTestimonials.map((t, idx) => {
                const avatarUrl = resolveMediaUrl(t.image)
                const avatarAlt = resolveMediaAlt(t.image, t.name)

                return (
                  <div
                    key={`${t.id || idx}-${idx}`}
                    className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                  >
                    {/* Testimonial Card */}
                    <div className="flex flex-col bg-white border border-amber-500/20 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 wood-card-hover h-full min-h-[320px]">
                      
                      {/* Rating & Quote Box Row */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-amber-500 flex-shrink-0">
                          <Quote className="w-8 h-8 fill-amber-500" />
                        </div>
                        {/* Render stars rating representation */}
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, sIdx) => (
                            <Star
                              key={sIdx}
                              className={`w-4 h-4 ${
                                sIdx < t.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Review title block if present */}
                      {t.title && (
                        <h4 className="text-slate-900 font-extrabold text-base mb-2 italic">
                          "{t.title}"
                        </h4>
                      )}

                      {/* Review Text */}
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-8 font-medium">
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
            className="absolute top-1/2 -left-2 sm:-left-4 -translate-y-1/2 z-20 p-3 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-amber-600 hover:border-amber-500 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer"
            aria-label="Previous Feedback"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button (Absolute Center Floating) */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute top-1/2 -right-2 sm:-right-4 -translate-y-1/2 z-20 p-3 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-amber-600 hover:border-amber-500 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center cursor-pointer"
            aria-label="Next Feedback"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

        </div>

      </div>

      {/* Review Submission Form Modal Overlay */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl overflow-hidden max-w-xl w-full shadow-2xl relative border border-slate-200/50 p-8 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Write a Review</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {submitStatus === 'success' ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-center animate-fade-in my-8">
                <p className="font-bold text-lg mb-2">Review Submitted!</p>
                <p className="text-sm font-medium">Thank you! Your feedback will appear instantly in the carousel.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                {submitStatus === 'error' && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-bold text-center">
                    Something went wrong. Please check your connection and try again.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="client-name" className="text-amber-600 text-xs font-bold uppercase mb-1.5">Your Name</label>
                    <input
                      type="text"
                      id="client-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sajid Ali"
                      className="bg-[#FDFBF9] border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-400 text-sm"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="client-company" className="text-amber-600 text-xs font-bold uppercase mb-1.5">Designation / Company</label>
                    <input
                      type="text"
                      id="client-company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Homeowner"
                      className="bg-[#FDFBF9] border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-400 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="review-title" className="text-amber-600 text-xs font-bold uppercase mb-1.5">Review Headline</label>
                    <input
                      type="text"
                      id="review-title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Highly Recommended!"
                      className="bg-[#FDFBF9] border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-400 text-sm"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-amber-600 text-xs font-bold uppercase mb-2">Rating</label>
                    {/* Interactive Star Picker */}
                    <div className="flex gap-2.5 items-center py-1">
                      {Array.from({ length: 5 }).map((_, sIdx) => {
                        const starValue = sIdx + 1
                        return (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={() => setFormData({ ...formData, rating: starValue })}
                            className="text-slate-300 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                            aria-label={`Rate ${starValue} Stars`}
                          >
                            <Star
                              className={`w-6 h-6 ${
                                starValue <= formData.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-200'
                              }`}
                            />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="review-content" className="text-amber-600 text-xs font-bold uppercase mb-1.5">Your Feedback</label>
                  <textarea
                    id="review-content"
                    required
                    rows={4}
                    value={formData.feedback}
                    onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    placeholder="Describe your wood polishing project experience and output..."
                    className="bg-[#FDFBF9] border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-400 text-sm resize-none"
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 font-bold rounded-xl text-sm cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-md disabled:opacity-50 active:scale-95 transition-all text-sm cursor-pointer"
                  >
                    {submitStatus === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Review</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default FeedbackSection
