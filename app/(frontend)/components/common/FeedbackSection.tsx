import React from 'react'
import { Star } from 'lucide-react'

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
  testimonials: Testimonial[]
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  heading,
  subheading,
  testimonials,
}) => {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0806] overflow-hidden border-t border-amber-950/5">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          {subheading && (
            <span className="text-amber-400 font-bold text-sm tracking-wider uppercase mb-2 block">
              {subheading}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {heading}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => {
            const avatarUrl = typeof t.image === 'object' && t.image?.url ? t.image.url : ''
            const avatarAlt = typeof t.image === 'object' && t.image?.alt ? t.image.alt : t.name

            return (
              <div
                key={t.id || idx}
                className="flex flex-col bg-[#18110B] border border-amber-950/10 p-8 rounded-2xl shadow-xl wood-card-hover"
              >
                {/* Stars Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-800'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Heading */}
                {t.title && (
                  <h3 className="text-lg font-extrabold text-white mb-3">
                    "{t.title}"
                  </h3>
                )}

                {/* Review Text */}
                <p className="text-slate-300 text-sm leading-relaxed mb-8 font-medium italic">
                  "{t.feedback}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 mt-auto">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={avatarAlt}
                      className="w-12 h-12 rounded-full object-cover border border-amber-950/10"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">
                      {t.name}
                    </span>
                    {t.company && (
                      <span className="text-xs font-semibold text-slate-400">
                        {t.company}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
export default FeedbackSection
