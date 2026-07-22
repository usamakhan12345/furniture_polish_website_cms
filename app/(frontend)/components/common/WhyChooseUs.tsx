import React from 'react'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'

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
    <section id={anchorId || 'why-choose-us'} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Text & 2x2 Feature Grid */}
        <div className="lg:col-span-7 flex flex-col justify-center animate-fade-in-right">
          
          {/* Subheading with Orange Colon */}
          {subheading && (
            <span className="inline-flex items-center text-amber-600 font-extrabold text-sm uppercase tracking-widest gap-2.5 mb-5">
              <span className="text-amber-600 font-extrabold">:</span>
              {subheading.replace(/^::\s*|^:\s*/, '')}
            </span>
          )}

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {heading}
          </h2>

          <p className="text-slate-600 text-lg lg:text-xl leading-relaxed mb-12 font-medium whitespace-pre-line max-w-3xl">
            {description}
          </p>

          {/* 2x2 Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 border-t border-slate-100 pt-10">
            {features?.map((feat, idx) => (
              <div key={feat.id || idx} className="flex flex-col">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900 mb-2.5 tracking-tight">
                  {feat.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Showcase Image */}
        <div className="lg:col-span-5 animate-fade-in-up">
          {imgUrl ? (
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 group shadow-lg transition-all duration-300 hover:border-amber-500/20">
              {/* Overlay wood varnish style border */}
              <div className="absolute inset-0 border-[6px] border-amber-500/5 group-hover:border-amber-500/10 z-20 transition-colors duration-300 pointer-events-none rounded-3xl" />
              <img
                src={imgUrl}
                alt={imgAlt}
                className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 ease-out z-10"
              />
            </div>
          ) : (
            <div className="aspect-square w-full bg-slate-100 border border-slate-200 rounded-3xl flex items-center justify-center text-slate-400">
              No Image Available
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
export default WhyChooseUs
