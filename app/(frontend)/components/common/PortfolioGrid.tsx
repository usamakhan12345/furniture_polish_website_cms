'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, X, ZoomIn } from 'lucide-react'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'
import { Reveal } from '../ui/Reveal'
import { Modal } from '../ui/Modal'
import { SectionHeader } from '../ui/SectionHeader'

interface Media {
  url?: string
  alt?: string
}

interface ProjectItem {
  id?: string
  image: Media | string | null
  title: string
  category: string
  description?: string | null
}

export interface PortfolioGridProps {
  anchorId?: string
  subheading?: string
  heading: string
  description?: string
  allLabel?: string
  projects?: ProjectItem[]
}

const ALL = '__all__'

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  anchorId,
  subheading,
  heading,
  description,
  allLabel,
  projects,
}) => {
  const [active, setActive] = useState<string>(ALL)
  const [open, setOpen] = useState(false)
  // Position inside the *filtered* list; kept after closing so the image stays during the exit animation
  const [index, setIndex] = useState(0)

  const list = useMemo(() => (projects ?? []).filter((p) => resolveMediaUrl(p.image)), [projects])
  const categories = useMemo(() => Array.from(new Set(list.map((p) => p.category).filter(Boolean))), [list])
  const visible = useMemo(
    () => (active === ALL ? list : list.filter((p) => p.category === active)),
    [list, active],
  )
  const current = visible[Math.min(index, Math.max(visible.length - 1, 0))]

  const step = (delta: number) =>
    setIndex((i) => (visible.length ? (i + delta + visible.length) % visible.length : 0))

  // Arrow keys navigate while the viewer is open
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, visible.length])

  if (list.length === 0) return null

  return (
    <section
      id={anchorId || 'portfolio-grid'}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50"
    >
      <div
        className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none animate-float-slow"
        aria-hidden="true"
      />

      <div className="relative max-w-[1600px] mx-auto">
        <SectionHeader
          align="center"
          subheading={subheading}
          heading={heading}
          description={description}
          className="!mb-10"
        />

        {/* Category filter */}
        {categories.length > 1 && (
          <Reveal direction="fade" className="mb-12">
            <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Filter projects by category">
              {[ALL, ...categories].map((category) => {
                const selected = active === category
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActive(category)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-bold transition-all duration-300 cursor-pointer ${
                      selected
                        ? 'border-amber-500 bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-amber-500/50 hover:text-amber-700'
                    }`}
                  >
                    {category === ALL ? allLabel || 'All Projects' : category}
                  </button>
                )
              })}
            </div>
          </Reveal>
        )}

        {/* Grid (re-keyed per filter so the cards replay their entrance) */}
        <Reveal direction="fade" delay={100}>
          <div key={active} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((project, idx) => {
              const imgUrl = resolveMediaUrl(project.image)
              const imgAlt = resolveMediaAlt(project.image, project.title)

              return (
                <button
                  key={project.id || `${project.title}-${idx}`}
                  type="button"
                  onClick={() => {
                    setIndex(idx)
                    setOpen(true)
                  }}
                  aria-label={`View project: ${project.title}`}
                  style={{ animationDelay: `${Math.min(idx, 8) * 70}ms` }}
                  className="animate-scale-up group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200/60 bg-slate-100 text-left shadow-sm transition-shadow duration-500 hover:shadow-2xl cursor-zoom-in"
                >
                  <img
                    src={imgUrl}
                    alt={imgAlt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold tracking-wide text-amber-700 shadow-md">
                    {project.category}
                  </span>
                  <span
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-amber-700 shadow-lg opacity-0 -translate-y-2 scale-75 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100"
                    aria-hidden="true"
                  >
                    <ZoomIn className="h-5 w-5" />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-base sm:text-lg font-extrabold leading-snug tracking-tight text-white transition-transform duration-500 group-hover:-translate-y-1">
                      {project.title.replace(/:\s*$/, '')}
                    </h3>
                  </div>
                </button>
              )
            })}
          </div>
        </Reveal>
      </div>

      {/* Project viewer */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        label="Project viewer"
        maxWidth="max-w-5xl"
        className="overflow-hidden"
      >
        {current && (
          <div className="relative grid grid-cols-1 md:grid-cols-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur hover:rotate-90 transition-all duration-300 cursor-pointer"
              aria-label="Close project viewer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative md:col-span-3 aspect-[4/3] md:aspect-auto md:min-h-[460px] bg-slate-100">
              <img
                key={resolveMediaUrl(current.image)}
                src={resolveMediaUrl(current.image)}
                alt={resolveMediaAlt(current.image, current.title)}
                className="animate-fade-in absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="md:col-span-2 flex flex-col justify-center p-8 sm:p-10">
              <span className="mb-4 w-fit rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.15em] text-amber-700">
                {current.category}
              </span>
              <h3 className="mb-4 text-2xl font-extrabold leading-tight tracking-tight text-slate-900">
                {current.title.replace(/:\s*$/, '')}
              </h3>
              {current.description && (
                <p className="text-sm sm:text-base leading-relaxed font-medium text-slate-600">
                  {current.description}
                </p>
              )}

              {visible.length > 1 && (
                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                  <span className="text-xs font-bold tracking-widest text-slate-400 tabular-nums" aria-live="polite">
                    {Math.min(index, visible.length - 1) + 1} / {visible.length}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      className="p-3 rounded-full border border-slate-200 text-slate-500 hover:bg-amber-500 hover:border-amber-500 hover:text-slate-950 transition-all duration-300 cursor-pointer"
                      aria-label="Previous project"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      className="p-3 rounded-full border border-slate-200 text-slate-500 hover:bg-amber-500 hover:border-amber-500 hover:text-slate-950 transition-all duration-300 cursor-pointer"
                      aria-label="Next project"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
export default PortfolioGrid
