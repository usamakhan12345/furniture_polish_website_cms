'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, X, Image as ImageIcon } from 'lucide-react'

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
  const [selectedService, setSelectedService] = useState<ServiceCardItem | null>(null)

  // Prevent background scrolling when services details modal is active
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedService])

  return (
    <section id={anchorId || 'services'} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF6EE]/30 overflow-hidden border-t border-slate-200/50">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header Row (Flex grid aligned on desktop) */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8 px-3">
          
          <div className="text-left max-w-4xl animate-fade-in-right">
            {/* Subheading with Orange Colon */}
            {subheading && (
              <span className="inline-flex items-center text-amber-600 font-extrabold text-sm uppercase tracking-widest gap-2.5 mb-5">
                <span className="text-amber-600 font-extrabold">:</span>
                {subheading.replace(/^::\s*|^:\s*/, '')}
              </span>
            )}

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              {heading}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              {description}
            </p>
          </div>

          {/* Browse All Link (Top Right on desktop) */}
          {browseAllText && browseAllLink && (
            <div className="flex-shrink-0 animate-fade-in-up">
              <Link
                href={browseAllLink}
                className="inline-flex items-center gap-1.5 text-sm font-extrabold text-amber-600 hover:text-amber-500 transition-colors duration-200"
              >
                <span>{browseAllText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>

        {/* 3-column cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((item, idx) => {
            const iconUrl = typeof item.icon === 'object' && item.icon?.url ? item.icon.url : ''
            const iconAlt = typeof item.icon === 'object' && item.icon?.alt ? item.icon.alt : item.title

            return (
              <button
                key={item.id || idx}
                onClick={() => setSelectedService(item)}
                className="group flex flex-col bg-white border border-amber-500/10 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 wood-card-hover h-full text-left cursor-pointer w-full focus:outline-none focus:ring-1 focus:ring-amber-500/30"
              >
                {/* Icon Box */}
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mb-6">
                  {iconUrl ? (
                    <img src={iconUrl} alt={iconAlt} className="w-5 h-5 object-contain" />
                  ) : (
                    <span className="w-2.5 h-2.5 bg-amber-600 rounded-sm" />
                  )}
                </div>

                {/* Title with Right Arrow */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 tracking-tight flex items-center gap-2 group-hover:text-amber-600 transition-colors duration-200">
                  <span>{item.title}</span>
                  <ArrowRight className="w-4 h-4 text-amber-500 transform group-hover:translate-x-1.5 transition-transform" />
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
                  {item.description}
                </p>
              </button>
            )
          })}
        </div>

      </div>

      {/* Services Details Modal Overlay */}
      {selectedService && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative border border-slate-200/50 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors shadow-sm cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Showcase */}
            <div className="w-full aspect-[16/10] relative overflow-hidden bg-slate-50 border-b border-slate-100">
              {(() => {
                const imgUrl = typeof selectedService.image === 'object' && selectedService.image?.url ? selectedService.image.url : ''
                const imgAlt = typeof selectedService.image === 'object' && selectedService.image?.alt ? selectedService.image.alt : selectedService.title
                
                return imgUrl ? (
                  <img src={imgUrl} alt={imgAlt} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                    <ImageIcon className="w-12 h-12 text-slate-300" />
                    <span className="text-sm font-semibold">No Image Showcase Uploaded</span>
                  </div>
                )
              })()}
            </div>

            {/* Modal Body Content */}
            <div className="p-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                {selectedService.title}
              </h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium mb-6">
                {selectedService.description}
              </p>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Services
