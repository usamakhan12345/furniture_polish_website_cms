import React from 'react'
import Link from 'next/link'
import { getCtaHref } from '../../../../utilities/cta'

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
  subheading?: string
  heading: string
  description?: string
  cta1?: CTA
  cta2?: CTA
  stats: StatItem[]
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  subheading,
  heading,
  description,
  cta1,
  cta2,
  stats,
}) => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF6EE] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side Info */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {subheading && (
            <span className="inline-flex items-center text-amber-600 font-extrabold text-sm uppercase tracking-widest gap-2.5 mb-5">
              <span className="w-1.5 h-3.5 bg-amber-600 rounded-sm" />
              {subheading}
            </span>
          )}
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-6">
            {heading}
          </h2>
          
          {description && (
            <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium whitespace-pre-line max-w-2xl">
              {description}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {cta1?.text && (
              <Link
                href={getCtaHref(cta1)}
                className="w-full sm:w-auto px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-md hover:shadow-amber-500/10 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center"
              >
                {cta1.text}
              </Link>
            )}

            {cta2?.text && (
              <Link
                href={getCtaHref(cta2)}
                className="w-full sm:w-auto px-7 py-3.5 border border-slate-950 text-slate-950 font-bold rounded-lg hover:bg-slate-950/5 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center"
              >
                {cta2.text}
              </Link>
            )}
          </div>
        </div>

        {/* Right Side Stats Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-x-8 gap-y-12">
          {stats?.map((stat, idx) => (
            <div key={stat.id || idx} className="flex flex-col">
              <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-amber-600 mb-2 tracking-tight">
                {stat.number}
              </span>
              <span className="text-sm sm:text-base font-bold text-slate-700 leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
export default StatsSection
