import React from 'react'
import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionEyebrow } from '../ui/SectionEyebrow'

export interface MapSectionProps {
  anchorId?: string
  subheading?: string
  heading: string
  description?: string
  address: string
  hours?: string
  phone?: string
  directionsLabel?: string
  embedUrl?: string
}

/** Accepts a pasted <iframe> snippet, a Google "embed" link, or nothing (falls back to the address). */
const resolveEmbed = (embedUrl: string | undefined, address: string): string => {
  const value = (embedUrl || '').trim()
  if (value) {
    const iframeSrc = value.match(/src="([^"]+)"/)
    if (iframeSrc) return iframeSrc[1]
    if (/^https:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.google\.[a-z.]+)/i.test(value) && /embed|output=embed/.test(value)) {
      return value
    }
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
}

export const MapSection: React.FC<MapSectionProps> = ({
  anchorId,
  subheading,
  heading,
  description,
  address,
  hours,
  phone,
  directionsLabel,
  embedUrl,
}) => {
  const src = resolveEmbed(embedUrl, address)
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`

  return (
    <section
      id={anchorId || 'location'}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50"
    >
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[380px] h-[380px] bg-amber-500/5 rounded-full blur-[110px] pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />

      <div className="relative max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
        {/* Details */}
        <Reveal direction="left" className="lg:col-span-5 flex flex-col justify-center">
          {subheading && <SectionEyebrow className="mb-5">{subheading}</SectionEyebrow>}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
            {heading}
          </h2>
          {description && (
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium mb-8">{description}</p>
          )}

          <ul className="mb-10 space-y-5">
            <li className="flex gap-4">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-500">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500 mb-1">Address</h3>
                <p className="text-slate-800 font-bold leading-snug whitespace-pre-line">{address}</p>
              </div>
            </li>
            {hours && (
              <li className="flex gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-500">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500 mb-1">Opening Hours</h3>
                  <p className="text-slate-800 font-bold leading-snug">{hours}</p>
                </div>
              </li>
            )}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Navigation className="btn-icon w-4 h-4" aria-hidden="true" />
              <span>{directionsLabel || 'Get Directions'}</span>
            </a>
            {phone && (
              <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="btn btn-outline-dark">
                <Phone className="btn-icon w-4 h-4" aria-hidden="true" />
                <span>{phone}</span>
              </a>
            )}
          </div>
        </Reveal>

        {/* Map */}
        <Reveal direction="scale" delay={150} className="lg:col-span-7">
          <div className="group relative h-full">
            {/* Offset frame that shifts on hover */}
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-3xl border-2 border-amber-500/30 transition-transform duration-500 ease-out group-hover:translate-x-5 group-hover:translate-y-5"
              aria-hidden="true"
            />
            <div className="relative h-full min-h-[340px] aspect-[4/3] lg:aspect-auto overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl">
              {/* Skeleton shows until the map paints over it */}
              <div className="absolute inset-0 animate-pulse bg-slate-200/70" aria-hidden="true" />
              <iframe
                src={src}
                title={`Map showing ${address}`}
                className="relative h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
export default MapSection
