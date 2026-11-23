import React from 'react'
import { Check } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { stagger } from '../ui/motion'

interface FinishItem {
  id?: string
  name: string
  sheenLevel: number
  bestFor?: string | null
  description: string
  colorFrom?: string | null
  colorTo?: string | null
}

export interface FinishShowcaseProps {
  anchorId?: string
  subheading?: string
  heading: string
  description?: string
  finishes?: FinishItem[]
}

const SHEEN_LABELS = ['Matte', 'Low sheen', 'Medium sheen', 'High sheen', 'Mirror gloss']

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i
const safeHex = (value: string | null | undefined, fallback: string) =>
  value && HEX.test(value.trim()) ? value.trim() : fallback

export const FinishShowcase: React.FC<FinishShowcaseProps> = ({
  anchorId,
  subheading,
  heading,
  description,
  finishes,
}) => {
  if (!finishes || finishes.length === 0) return null

  return (
    <section
      id={anchorId || 'finishes'}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FAF6EE] via-[#FDFBF7] to-[#F5EBE0] overflow-hidden border-t border-amber-950/5"
    >
      <div
        className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full border border-amber-500/10 pointer-events-none animate-float-slow"
        aria-hidden="true"
      />

      <div className="relative max-w-[1600px] mx-auto">
        <SectionHeader align="center" subheading={subheading} heading={heading} description={description} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {finishes.map((finish, idx) => {
            const level = Math.min(5, Math.max(1, Math.round(Number(finish.sheenLevel) || 3)))
            const from = safeHex(finish.colorFrom, '#A6642B')
            const to = safeHex(finish.colorTo, '#5A3216')

            return (
              <Reveal key={finish.id || idx} delay={stagger(idx % 3, 110)} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-amber-500/20 bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-900/10">
                  {/* Swatch: the more gloss, the stronger the light streak */}
                  <div
                    className="relative h-40 overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 wood-grain opacity-60" />
                    <div
                      className="absolute -inset-y-6 -left-1/4 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[260%]"
                      style={{ opacity: level * 0.07 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

                    <span className="absolute left-4 bottom-4 rounded-full bg-black/35 px-3 py-1 text-xs font-bold tracking-wide text-white backdrop-blur-sm">
                      {SHEEN_LABELS[level - 1]}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-amber-700">
                        {finish.name}
                      </h3>
                      {/* Sheen meter */}
                      <span
                        className="mt-1.5 flex flex-shrink-0 gap-1"
                        role="img"
                        aria-label={`Sheen level ${level} of 5`}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`h-2 w-4 rounded-full transition-colors duration-500 ${
                              i < level ? 'bg-amber-500' : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </span>
                    </div>

                    <p className="mb-5 text-sm sm:text-base leading-relaxed font-medium text-slate-600">
                      {finish.description}
                    </p>

                    {finish.bestFor && (
                      <p className="mt-auto flex items-start gap-2 border-t border-slate-100 pt-4 text-sm font-bold text-slate-800">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" strokeWidth={3} aria-hidden="true" />
                        <span>
                          <span className="text-amber-700">Best for:</span> {finish.bestFor}
                        </span>
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default FinishShowcase
