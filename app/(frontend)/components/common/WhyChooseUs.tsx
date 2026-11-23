import React from 'react'
import { Check } from 'lucide-react'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'
import { Reveal } from '../ui/Reveal'
import { SectionEyebrow } from '../ui/SectionEyebrow'
import { stagger } from '../ui/motion'

interface Media {
  url?: string
  alt?: string
}

interface FeatureItem {
  id?: string
  title: string
  description: string
}

export interface WhyChooseUsProps {
  anchorId?: string
  subheading?: string
  heading: string
  description: string
  image: Media | string | null
  features?: FeatureItem[]
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  anchorId,
  subheading,
  heading,
  description,
  image,
  features,
}) => {
  const imgUrl = resolveMediaUrl(image)
  const imgAlt = resolveMediaAlt(image, 'Showcase Image')

  return (
    <section
      id={anchorId || 'why-choose-us'}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50"
    >
      {/* Decorative background glow */}
      <div
        className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none animate-float-slow"
        aria-hidden="true"
      />

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Text & 2x2 Feature Grid */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <Reveal direction="left">
            {subheading && <SectionEyebrow className="mb-5">{subheading}</SectionEyebrow>}

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              {heading}
            </h2>

            <p className="text-slate-600 text-lg lg:text-xl leading-relaxed mb-12 font-medium whitespace-pre-line max-w-3xl">
              {description}
            </p>
          </Reveal>

          {/* 2x2 Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 border-t border-slate-100 pt-10">
            {features?.map((feat, idx) => (
              <Reveal key={feat.id || idx} delay={stagger(idx, 110)} className="group flex gap-4">
                <span
                  className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 transition-all duration-500 ease-out group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:rotate-[-8deg] group-hover:scale-110"
                  aria-hidden="true"
                >
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900 mb-2.5 tracking-tight transition-colors duration-300 group-hover:text-amber-600">
                    {feat.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
                    {feat.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right Column: Showcase Image */}
        <Reveal direction="scale" delay={150} className="lg:col-span-5">
          {imgUrl ? (
            <div className="group relative">
              {/* Offset frame that shifts on hover */}
              <div
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border-2 border-amber-500/30 transition-transform duration-500 ease-out group-hover:translate-x-6 group-hover:translate-y-6"
                aria-hidden="true"
              />
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xl transition-shadow duration-500 group-hover:shadow-2xl">
                {/* Overlay wood varnish style border */}
                <div className="absolute inset-0 border-[6px] border-amber-500/5 group-hover:border-amber-500/15 z-20 transition-colors duration-500 pointer-events-none rounded-3xl" />
                <img
                  src={imgUrl}
                  alt={imgAlt}
                  loading="lazy"
                  decoding="async"
                  className="parallax-img w-full h-full object-cover object-center transform group-hover:scale-[1.04] transition-transform duration-700 ease-out z-10"
                />
              </div>
            </div>
          ) : (
            <div className="aspect-square w-full bg-slate-100 border border-slate-200 rounded-3xl flex items-center justify-center text-slate-400">
              No Image Available
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
export default WhyChooseUs
