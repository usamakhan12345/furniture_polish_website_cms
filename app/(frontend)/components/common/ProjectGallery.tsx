'use client'

import React, { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, X, ZoomIn } from 'lucide-react'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'
import { Reveal } from '../ui/Reveal'
import { Modal } from '../ui/Modal'
import { SectionEyebrow } from '../ui/SectionEyebrow'
import { stagger } from '../ui/motion'

interface Media {
  url?: string
  alt?: string
}

interface GridImageItem {
  id?: string
  image: Media | string | null
}

export interface ProjectGalleryProps {
  anchorId?: string
  subheading?: string
  heading: string
  description: string
  mainImage: Media | string | null
  gridImages?: GridImageItem[]
}

interface GalleryTile {
  /** Position in the bento layout: 0 = featured, 1-4 = grid. */
  tile: number
  url: string
  alt: string
}

const ZoomBadge: React.FC = () => (
  <>
    <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/55 via-slate-950/5 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <span
      className="absolute bottom-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-amber-700 shadow-lg translate-y-3 scale-75 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100"
      aria-hidden="true"
    >
      <ZoomIn className="h-5 w-5" />
    </span>
  </>
)

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  anchorId,
  subheading,
  heading,
  description,
  mainImage,
  gridImages,
}) => {
  const mainImgUrl = resolveMediaUrl(mainImage)
  const mainImgAlt = resolveMediaAlt(mainImage, 'Featured Project')

  // Lightbox state: `index` is kept after closing so the image stays during the exit animation.
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const tiles: GalleryTile[] = [
    { tile: 0, url: mainImgUrl, alt: mainImgAlt },
    ...Array.from({ length: 4 }).map((_, idx) => ({
      tile: idx + 1,
      url: resolveMediaUrl(gridImages?.[idx]?.image),
      alt: resolveMediaAlt(gridImages?.[idx]?.image, `Gallery Image ${idx + 1}`),
    })),
  ]
  const gallery = tiles.filter((t) => t.url)
  const current = gallery[Math.min(index, gallery.length - 1)]

  const openTile = (tile: number) => {
    const found = gallery.findIndex((g) => g.tile === tile)
    if (found === -1) return
    setIndex(found)
    setOpen(true)
  }

  const step = (delta: number) =>
    setIndex((i) => (gallery.length ? (i + delta + gallery.length) % gallery.length : 0))

  // Arrow keys navigate while the lightbox is open
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, gallery.length])

  return (
    <section
      id={anchorId || 'project-gallery'}
      className="relative py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50"
    >
      {/* Decorative background glow */}
      <div
        className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none animate-float-slow"
        aria-hidden="true"
      />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header */}
        <Reveal direction="left" className="mb-12 max-w-4xl text-left px-2">
          {subheading && <SectionEyebrow className="mb-5">{subheading}</SectionEyebrow>}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {heading}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">{description}</p>
        </Reveal>

        {/* Unified Gallery Grid */}
        {/*
          Bento grid. On desktop the grid itself has a fixed aspect ratio and two equal rows, so
          every tile fills its cell and the featured image can never stretch the layout.
          Images are absolutely positioned so their natural size never feeds into the row heights.
          On smaller screens each tile gets its own aspect ratio instead.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:aspect-[5/2] gap-4 sm:gap-5 lg:gap-6">
          {/* Large Featured Image Card (2 cols x 2 rows on desktop, full width below that) */}
          <Reveal direction="left" className="sm:col-span-2 lg:row-span-2 min-h-0">
            {mainImgUrl ? (
              <button
                type="button"
                onClick={() => openTile(0)}
                aria-label={`View larger: ${mainImgAlt}`}
                className="group relative block w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-full rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-slate-200/60 cursor-zoom-in transition-shadow duration-500"
              >
                <img
                  src={mainImgUrl}
                  alt={mainImgAlt}
                  loading="lazy"
                  decoding="async"
                  className="parallax-img absolute inset-0 w-full h-full object-cover transform group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />
                <ZoomBadge />
              </button>
            ) : (
              <div className="w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-full rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                No Featured Wood Restoration Image
              </div>
            )}
          </Reveal>

          {/* Smaller Grid Images */}
          {tiles.slice(1).map((t, idx) => (
            <Reveal
              key={gridImages?.[idx]?.id || idx}
              direction="scale"
              delay={stagger(idx, 110, 100)}
              className="min-h-0"
            >
              {t.url ? (
                <button
                  type="button"
                  onClick={() => openTile(t.tile)}
                  aria-label={`View larger: ${t.alt}`}
                  className="group relative block w-full aspect-[3/2] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/50 bg-slate-50 cursor-zoom-in transition-shadow duration-500"
                >
                  <img
                    src={t.url}
                    alt={t.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                  />
                  <ZoomBadge />
                </button>
              ) : (
                <div className="relative w-full aspect-[3/2] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden border border-slate-200/50 bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                  Showcase Photo {idx + 1}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        label="Project gallery image viewer"
        maxWidth="max-w-5xl"
        surface="bg-[#0B0806] border-white/10"
      >
        {current && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur hover:rotate-90 transition-all duration-300 cursor-pointer"
              aria-label="Close image viewer"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              key={current.url}
              src={current.url}
              alt={current.alt}
              className="animate-fade-in mx-auto max-h-[80vh] w-full object-contain"
            />

            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-amber-500 text-white hover:text-slate-950 backdrop-blur transition-all duration-300 hover:-translate-x-0.5 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-amber-500 text-white hover:text-slate-950 backdrop-blur transition-all duration-300 hover:translate-x-0.5 cursor-pointer"
                  aria-label="Next image"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
                <span
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs font-bold tracking-widest text-white/90 tabular-nums backdrop-blur"
                  aria-live="polite"
                >
                  {Math.min(index, gallery.length - 1) + 1} / {gallery.length}
                </span>
              </>
            )}
          </div>
        )}
      </Modal>
    </section>
  )
}

export default ProjectGallery
