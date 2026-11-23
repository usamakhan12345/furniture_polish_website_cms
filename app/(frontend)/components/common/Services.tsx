'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, X, Image as ImageIcon } from 'lucide-react'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'
import { Reveal } from '../ui/Reveal'
import { Modal } from '../ui/Modal'
import { SectionEyebrow } from '../ui/SectionEyebrow'
import { stagger } from '../ui/motion'

interface Media {
  url?: string
  alt?: string
}

interface ServiceCardItem {
  id?: string
  title: string
  description: string
  icon?: Media | string | null
  image?: Media | string | null // Modal image showcase from CMS
  link?: string
}

export interface ServicesProps {
  anchorId?: string
  subheading?: string
  heading: string
  description: string
  browseAllText?: string
  browseAllLink?: string
  services?: ServiceCardItem[]
}

export const Services: React.FC<ServicesProps> = ({
  anchorId,
  subheading,
  heading,
  description,
  browseAllText,
  browseAllLink,
  services,
}) => {
  // `active` is kept after closing so the content stays put during the exit animation.
  const [active, setActive] = useState<ServiceCardItem | null>(null)
  const [open, setOpen] = useState(false)

  const openService = (item: ServiceCardItem) => {
    setActive(item)
    setOpen(true)
  }

  const activeImgUrl = resolveMediaUrl(active?.image)
  const activeImgAlt = resolveMediaAlt(active?.image, active?.title || 'Service')

  return (
    <section
      id={anchorId || 'services'}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF6EE]/30 overflow-hidden border-t border-slate-200/50"
    >
      {/* Decorative background glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none animate-float-slow"
        aria-hidden="true"
      />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header Row (Flex grid aligned on desktop) */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8 px-3">
          <Reveal direction="left" className="text-left max-w-4xl">
            {subheading && <SectionEyebrow className="mb-5">{subheading}</SectionEyebrow>}

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              {heading}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">{description}</p>
          </Reveal>

          {/* Browse All Link (Top Right on desktop) */}
          {browseAllText && browseAllLink && (
            <Reveal delay={150} className="flex-shrink-0">
              <Link
                href={browseAllLink}
                className="group inline-flex items-center gap-2 text-sm font-extrabold text-amber-600 hover:text-amber-500 transition-colors duration-200"
              >
                <span className="link-underline pb-0.5">{browseAllText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </Reveal>
          )}
        </div>

        {/* 3-column cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((item, idx) => {
            const iconUrl = resolveMediaUrl(item.icon)
            const iconAlt = resolveMediaAlt(item.icon, item.title)

            return (
              <Reveal key={item.id || idx} delay={stagger(idx % 3, 110)} className="h-full">
                <button
                  type="button"
                  onClick={() => openService(item)}
                  aria-haspopup="dialog"
                  className="group relative flex flex-col bg-white border border-amber-500/10 p-8 rounded-2xl shadow-sm wood-card-hover h-full text-left cursor-pointer w-full focus-visible:ring-2 focus-visible:ring-amber-500/50"
                >
                  {/* Oversized index numeral */}
                  <span
                    className="pointer-events-none absolute right-6 top-4 select-none text-6xl font-black text-amber-500/[0.07] transition-all duration-500 group-hover:text-amber-500/20 group-hover:-translate-y-1"
                    aria-hidden="true"
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Icon Box */}
                  <div className="relative w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mb-6 transition-all duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6 group-hover:border-amber-500/50 group-hover:shadow-lg group-hover:shadow-amber-500/20">
                    {iconUrl ? (
                      <img src={iconUrl} alt={iconAlt} loading="lazy" className="w-6 h-6 object-contain" />
                    ) : (
                      <span className="w-3 h-3 bg-amber-600 rounded-sm" />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="relative text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 tracking-tight group-hover:text-amber-600 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="relative text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium mb-6">
                    {item.description}
                  </p>

                  {/* Affordance: reveals that the card opens details */}
                  <span className="relative mt-auto inline-flex items-center gap-2 text-sm font-extrabold text-amber-600">
                    <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      View details
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </span>
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* Services Details Modal */}
      <Modal open={open} onClose={() => setOpen(false)} label={active?.title || 'Service details'}>
        {active && (
          <>
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/90 backdrop-blur hover:bg-slate-100 text-slate-500 hover:text-slate-900 hover:rotate-90 transition-all duration-300 shadow-md cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Showcase */}
            <div className="w-full aspect-[16/10] relative overflow-hidden bg-slate-50 border-b border-slate-100">
              {activeImgUrl ? (
                <>
                  <img src={activeImgUrl} alt={activeImgAlt} className="w-full h-full object-cover animate-ken-burns" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                  <ImageIcon className="w-12 h-12 text-slate-300" />
                  <span className="text-sm font-semibold">No Image Showcase Uploaded</span>
                </div>
              )}
            </div>

            {/* Modal Body Content */}
            <div className="p-8">
              <span className="mb-4 block h-1 w-12 rounded-full bg-gradient-to-r from-amber-600 to-amber-300" aria-hidden="true" />
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                {active.title}
              </h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium mb-8">
                {active.description}
              </p>

              <div className="flex justify-end">
                <button type="button" onClick={() => setOpen(false)} className="btn btn-primary">
                  Close Details
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </section>
  )
}

export default Services
