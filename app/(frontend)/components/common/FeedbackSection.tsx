'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, Quote, X, Send, Loader2, Star, PenLine } from 'lucide-react'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'
import { Reveal } from '../ui/Reveal'
import { Modal } from '../ui/Modal'
import { SectionEyebrow } from '../ui/SectionEyebrow'
import { SuccessCheck } from '../ui/SuccessCheck'
import { useLoopCarousel } from '../ui/useLoopCarousel'

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

const MAX_DOTS = 10
const EMPTY_FORM = { name: '', company: '', title: '', rating: 5, feedback: '' }

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  anchorId,
  heading,
  subheading,
  description,
  testimonials,
}) => {
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>(testimonials || [])

  const count = allTestimonials.length
  const { copies, active, trackStyle, handlers, next, prev, goTo } = useLoopCarousel(count, {
    autoPlayMs: 7000,
  })

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [formData, setFormData] = useState(EMPTY_FORM)

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

  if (!allTestimonials || count === 0) return null

  // Repeated copies make the loop seamless (see useLoopCarousel)
  const displayTestimonials = Array.from({ length: copies }).flatMap(() => allTestimonials)

  const closeModal = () => {
    setIsModalOpen(false)
    // Reset after the exit animation so the form doesn't flash while closing
    window.setTimeout(() => {
      setSubmitStatus('idle')
      setHoverRating(null)
    }, 250)
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
        // The review is saved as "pending" and only joins the carousel once an admin accepts it
        // in the CMS, so it is deliberately not added to the list here.
        setSubmitStatus('success')
        setFormData(EMPTY_FORM)
      } else {
        setSubmitStatus('error')
      }
    } catch (err) {
      console.error('Feedback submission error:', err)
      setSubmitStatus('error')
    }
  }

  const shownRating = hoverRating ?? formData.rating

  return (
    <section
      id={anchorId || 'feedback'}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF6EE] overflow-hidden border-t border-slate-200/50"
    >
      {/* Decorative Glow background blur */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />
      {/* Giant decorative quote */}
      <Quote
        className="absolute -top-6 left-[6%] h-56 w-56 text-amber-500/[0.06] fill-amber-500/[0.06] pointer-events-none animate-float-slow"
        aria-hidden="true"
      />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header Section */}
        <Reveal className="text-center mb-16 max-w-3xl mx-auto relative">
          {subheading && (
            <SectionEyebrow centered className="mb-4">
              {subheading}
            </SectionEyebrow>
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
            aria-haspopup="dialog"
            className="btn btn-primary btn-sm"
          >
            <PenLine className="btn-icon w-4 h-4" aria-hidden="true" />
            <span>Write a Review</span>
          </button>
        </Reveal>

        {/* Carousel Content Row */}
        <Reveal direction="fade" delay={100}>
          <div className="relative px-4 sm:px-8 md:px-12">
            {/* Viewport (vertical padding gives hover lift + shadow room inside the clipping box) */}
            <div className="overflow-hidden touch-pan-y pt-4 pb-12 -mt-4 -mb-12" {...handlers}>
              <div
                className="flex [--per-view:1] md:[--per-view:2] lg:[--per-view:3] will-change-transform"
                style={trackStyle}
              >
                {displayTestimonials.map((t, idx) => {
                  const avatarUrl = resolveMediaUrl(t.image)
                  const avatarAlt = resolveMediaAlt(t.image, t.name)

                  return (
                    <div
                      key={`${t.id || idx}-${idx}`}
                      className="w-[calc(100%/var(--per-view))] flex-shrink-0 px-3"
                    >
                      {/* Testimonial Card */}
                      <div className="group flex flex-col bg-white border border-amber-500/20 p-8 rounded-2xl shadow-sm wood-card-hover h-full min-h-[320px]">
                        {/* Rating & Quote Box Row */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="text-amber-500 flex-shrink-0 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6">
                            <Quote className="w-8 h-8 fill-amber-500" />
                          </div>
                          {/* Render stars rating representation */}
                          <div className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
                            {Array.from({ length: 5 }).map((_, sIdx) => (
                              <Star
                                key={sIdx}
                                style={{ transitionDelay: `${sIdx * 45}ms` }}
                                className={`w-4 h-4 transition-transform duration-500 ease-out group-hover:scale-125 ${
                                  sIdx < t.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Review title block if present */}
                        {t.title && (
                          <h4 className="text-slate-900 font-extrabold text-base mb-2 italic">
                            &ldquo;{t.title}&rdquo;
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
                              loading="lazy"
                              className="w-11 h-11 rounded-full object-cover border border-amber-500/10 ring-2 ring-transparent group-hover:ring-amber-500/40 transition-all duration-500"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 font-bold text-sm transition-colors duration-500 group-hover:bg-amber-500 group-hover:text-slate-950">
                              {t.name.charAt(0)}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 leading-tight">{t.name}</span>
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
              onClick={prev}
              className="group absolute top-1/2 -left-2 sm:-left-4 -translate-y-1/2 z-20 p-3 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-950 hover:bg-amber-500 hover:border-amber-500 shadow-md hover:shadow-lg hover:shadow-amber-500/25 active:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer"
              aria-label="Previous Feedback"
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>

            {/* Right Arrow Button (Absolute Center Floating) */}
            <button
              type="button"
              onClick={next}
              className="group absolute top-1/2 -right-2 sm:-right-4 -translate-y-1/2 z-20 p-3 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-950 hover:bg-amber-500 hover:border-amber-500 shadow-md hover:shadow-lg hover:shadow-amber-500/25 active:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer"
              aria-label="Next Feedback"
            >
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Pagination */}
          {count > 1 &&
            (count <= MAX_DOTS ? (
              <div className="mt-10 flex items-center justify-center gap-1.5">
                {allTestimonials.map((t, idx) => (
                  <button
                    key={`${t.id || idx}-dot`}
                    type="button"
                    aria-current={idx === active ? 'true' : undefined}
                    aria-label={`Go to review ${idx + 1}`}
                    onClick={() => goTo(idx)}
                    className={`h-2 rounded-full transition-all duration-500 ease-out cursor-pointer ${
                      idx === active ? 'w-8 bg-amber-500' : 'w-2 bg-slate-300 hover:bg-amber-300'
                    }`}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-10 text-center text-xs font-bold tracking-[0.25em] text-slate-400 tabular-nums" aria-hidden="true">
                {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </p>
            ))}
        </Reveal>
      </div>

      {/* Review Submission Form Modal */}
      <Modal open={isModalOpen} onClose={closeModal} label="Write a review" maxWidth="max-w-xl" className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900">Write a Review</h3>
          <button
            type="button"
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 hover:rotate-90 transition-all duration-300 cursor-pointer"
            aria-label="Close review form"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {submitStatus === 'success' ? (
          <div
            className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-center animate-fade-in my-8 flex flex-col items-center"
            role="status"
          >
            <SuccessCheck className="mb-4" />
            <p className="font-bold text-lg mb-2">Review Submitted!</p>
            <p className="text-sm font-medium">
              Thank you! Your review is under review. It will appear here once our team approves it.
            </p>
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-primary btn-sm mt-6"
            >
              <span>Done</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            {submitStatus === 'error' && (
              <div
                role="alert"
                className="animate-shake p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-bold text-center"
              >
                Something went wrong. Please check your connection and try again.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="field-group flex flex-col">
                <label htmlFor="client-name" className="field-label">Your Name</label>
                <input
                  type="text"
                  id="client-name"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sajid Ali"
                  className="field py-2.5 text-sm"
                />
              </div>

              <div className="field-group flex flex-col">
                <label htmlFor="client-company" className="field-label">Designation / Company</label>
                <input
                  type="text"
                  id="client-company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Homeowner"
                  className="field py-2.5 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="field-group flex flex-col">
                <label htmlFor="review-title" className="field-label">Review Headline</label>
                <input
                  type="text"
                  id="review-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Highly Recommended!"
                  className="field py-2.5 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <span id="rating-label" className="field-label">Rating</span>
                {/* Interactive Star Picker (hover previews, click commits) */}
                <div
                  className="flex gap-1.5 items-center py-1"
                  role="radiogroup"
                  aria-labelledby="rating-label"
                  onMouseLeave={() => setHoverRating(null)}
                >
                  {Array.from({ length: 5 }).map((_, sIdx) => {
                    const starValue = sIdx + 1
                    const filled = starValue <= shownRating
                    return (
                      <button
                        key={sIdx}
                        type="button"
                        role="radio"
                        aria-checked={starValue === formData.rating}
                        onClick={() => setFormData({ ...formData, rating: starValue })}
                        onMouseEnter={() => setHoverRating(starValue)}
                        className="p-0.5 hover:scale-125 active:scale-90 transition-transform duration-200 ease-out cursor-pointer"
                        aria-label={`Rate ${starValue} ${starValue === 1 ? 'star' : 'stars'}`}
                      >
                        <Star
                          // Re-keying on commit replays the pop animation for the chosen star
                          key={starValue === formData.rating ? `picked-${starValue}` : 'idle'}
                          className={`w-6 h-6 transition-colors duration-200 ${
                            filled ? 'text-amber-500 fill-amber-500' : 'text-slate-200'
                          } ${starValue === formData.rating ? 'animate-pop-in' : ''}`}
                        />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="field-group flex flex-col">
              <label htmlFor="review-content" className="field-label">Your Feedback</label>
              <textarea
                id="review-content"
                required
                rows={4}
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                placeholder="Describe your wood polishing project experience and output..."
                className="field py-2.5 text-sm resize-none"
              />
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 font-bold rounded-xl text-sm transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                aria-busy={submitStatus === 'loading'}
                className="btn btn-primary btn-sm disabled:opacity-60 disabled:pointer-events-none"
              >
                {submitStatus === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="btn-icon w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </section>
  )
}

export default FeedbackSection
