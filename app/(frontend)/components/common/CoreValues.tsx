import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  Clock,
  Hammer,
  HeartHandshake,
  Leaf,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  Truck,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { getCtaHref } from '../../../../utilities/cta'
import { Reveal } from '../ui/Reveal'
import { SectionEyebrow } from '../ui/SectionEyebrow'
import { stagger } from '../ui/motion'

interface CTA {
  text?: string | null
  isExternal?: boolean | null
  link?: string | null
  page?: string | { slug: string } | null
}

interface ValueItem {
  id?: string
  icon?: string | null
  title: string
  description: string
}

export interface CoreValuesProps {
  anchorId?: string
  subheading?: string
  heading: string
  description?: string
  cta?: CTA
  items?: ValueItem[]
}

// Keys match VALUE_ICON_OPTIONS in blocks/CoreValues.ts
const ICONS: Record<string, LucideIcon> = {
  wallet: Wallet,
  award: Award,
  leaf: Leaf,
  sparkles: Sparkles,
  truck: Truck,
  'shield-check': ShieldCheck,
  hammer: Hammer,
  clock: Clock,
  'heart-handshake': HeartHandshake,
  paintbrush: Paintbrush,
}

export const CoreValues: React.FC<CoreValuesProps> = ({
  anchorId,
  subheading,
  heading,
  description,
  cta,
  items,
}) => {
  if (!items || items.length === 0) return null

  return (
    <section
      id={anchorId || 'values'}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50"
    >
      <div
        className="absolute top-1/3 -left-24 w-[320px] h-[320px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none animate-float-slow"
        aria-hidden="true"
      />

      <div className="relative max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
        {/* Left: intro (stays in view while the cards scroll on desktop) */}
        <Reveal direction="left" className="lg:col-span-5 lg:sticky lg:top-28">
          {subheading && <SectionEyebrow className="mb-5">{subheading}</SectionEyebrow>}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {heading}
          </h2>
          {description && (
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium whitespace-pre-line mb-8">
              {description}
            </p>
          )}
          <span
            className="line-x block h-1 w-20 rounded-full bg-gradient-to-r from-amber-600 to-amber-300 mb-8"
            aria-hidden="true"
          />
          {cta?.text && (
            <Link href={getCtaHref(cta as any)} className="btn btn-primary">
              <span>{cta.text}</span>
              <ArrowRight className="btn-icon w-4 h-4" aria-hidden="true" />
            </Link>
          )}
        </Reveal>

        {/* Right: value cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item, idx) => {
            const Icon = ICONS[item.icon || ''] || Sparkles
            return (
              <Reveal key={item.id || idx} delay={stagger(idx % 2, 110)} className="h-full">
                <div className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-[#FDFBF9] p-7 shadow-sm wood-card-hover">
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-600 transition-all duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-amber-500 group-hover:text-slate-950">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mb-2.5 text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-amber-700">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed font-medium text-slate-600">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default CoreValues
