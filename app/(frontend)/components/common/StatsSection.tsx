import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCtaHref } from '../../../../utilities/cta'
import { Reveal } from '../ui/Reveal'
import { CountUp } from '../ui/CountUp'
import { SectionEyebrow } from '../ui/SectionEyebrow'
import { stagger } from '../ui/motion'

interface CTA {
  text: string
  isExternal?: boolean | null
  link?: string | null
  page?: string | { slug: string } | null
}

interface StatItem {
  id?: string
  number: string
  label: string
}

export interface StatsSectionProps {
  anchorId?: string
  subheading?: string
  heading: string
  description?: string
  cta1?: CTA
  cta2?: CTA
  stats: StatItem[]
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  anchorId,
  subheading,
  heading,
  description,
  cta1,
  cta2,
  stats,
}) => {
  return (
    <section
      id={anchorId || 'stats'}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FAF6EE] via-[#FDFBF7] to-[#F5EBE0] overflow-hidden border-t border-amber-950/5"
    >
      {/* Decorative rings */}
      <div
        className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full border border-amber-500/10 pointer-events-none animate-float-slow"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-24 w-[360px] h-[360px] rounded-full bg-amber-500/5 blur-[90px] pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />

      <div className="relative max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side Info */}
        <Reveal direction="left" className="lg:col-span-7 flex flex-col justify-center">
          {subheading && <SectionEyebrow className="mb-5">{subheading}</SectionEyebrow>}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-6">
            {heading}
          </h2>

          {description && (
            <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium whitespace-pre-line max-w-2xl">
              {description}
            </p>
          )}

          {/* CTA Buttons (fill-sweep hover swap) */}
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
            {cta1?.text && (
              <Link href={getCtaHref(cta1)} className="btn btn-primary w-full sm:w-auto">
                <span>{cta1.text}</span>
                <ArrowRight className="btn-icon w-4 h-4" aria-hidden="true" />
              </Link>
            )}

            {cta2?.text && (
              <Link href={getCtaHref(cta2)} className="btn btn-outline-dark w-full sm:w-auto">
                {cta2.text}
              </Link>
            )}
          </div>
        </Reveal>

        {/* Right Side Stats Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-x-8 gap-y-12">
          {stats?.map((stat, idx) => (
            <Reveal key={stat.id || idx} direction="scale" delay={stagger(idx, 120, 100)}>
              <div className="group relative flex flex-col pl-6">
                <span
                  className="line-y absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-gradient-to-b from-amber-500 to-amber-500/10 transition-[width] duration-300 group-hover:w-1"
                  aria-hidden="true"
                />
                <CountUp
                  value={stat.number}
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-amber-600 mb-2 tracking-tight tabular-nums"
                />
                <span className="text-sm sm:text-base font-bold text-slate-700 leading-snug">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
export default StatsSection
