import React from 'react'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { getCtaHref } from '../../../../utilities/cta'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { stagger } from '../ui/motion'

interface CTA {
  text?: string | null
  isExternal?: boolean | null
  link?: string | null
  page?: string | { slug: string } | null
}

interface StepItem {
  id?: string
  title: string
  description: string
  duration?: string | null
}

export interface ProcessStepsProps {
  anchorId?: string
  subheading?: string
  heading: string
  description?: string
  steps?: StepItem[]
  footnote?: string
  cta?: CTA
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({
  anchorId,
  subheading,
  heading,
  description,
  steps,
  footnote,
  cta,
}) => {
  if (!steps || steps.length === 0) return null

  return (
    <section
      id={anchorId || 'process'}
      className="relative isolate py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1E1209] via-[#2A170B] to-[#150C06] overflow-hidden border-t border-amber-500/20"
    >
      {/* Surface: grain + one warm glow, same language as the other dark section */}
      <div className="absolute inset-0 -z-10 wood-grain opacity-40 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_85%_10%,rgba(245,158,11,0.16),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 -z-10 h-[320px] w-[320px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none animate-float-slow"
        aria-hidden="true"
      />

      <div className="relative max-w-[1600px] mx-auto">
        <SectionHeader tone="dark" subheading={subheading} heading={heading} description={description} />

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <Reveal key={step.id || idx} as="li" delay={stagger(idx % 3, 100)} className="h-full">
              <div className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8 wood-card-hover">
                {/* Oversized index numeral */}
                <span
                  className="pointer-events-none absolute right-5 top-2 select-none text-7xl font-black leading-none text-white/[0.05] transition-all duration-500 group-hover:text-amber-500/20 group-hover:-translate-y-1"
                  aria-hidden="true"
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <span
                  className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/15 text-lg font-extrabold text-amber-400 transition-all duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-amber-500 group-hover:text-slate-950"
                  aria-hidden="true"
                >
                  {idx + 1}
                </span>

                <h3 className="relative mb-3 text-lg sm:text-xl font-extrabold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="relative text-sm sm:text-base leading-relaxed font-medium text-stone-300">
                  {step.description}
                </p>

                {step.duration && (
                  <span className="relative mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold tracking-wide text-amber-300">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {step.duration}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </ol>

        {(footnote || cta?.text) && (
          <Reveal className="mt-14 flex flex-col items-center gap-8 text-center">
            {footnote && (
              <p className="max-w-3xl border-t border-white/10 pt-8 text-sm sm:text-base leading-relaxed font-medium text-stone-400">
                {footnote}
              </p>
            )}
            {cta?.text && (
              <Link href={getCtaHref(cta as any)} className="btn btn-primary">
                <span>{cta.text}</span>
                <ArrowRight className="btn-icon w-4 h-4" aria-hidden="true" />
              </Link>
            )}
          </Reveal>
        )}
      </div>
    </section>
  )
}
export default ProcessSteps
