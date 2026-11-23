'use client'

import React, { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionEyebrow } from '../ui/SectionEyebrow'
import { stagger } from '../ui/motion'

interface FAQItem {
  id?: string
  question: string
  answer: string
}

export interface FAQSectionProps {
  anchorId?: string
  heading: string
  description?: string
  questions: FAQItem[]
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  anchorId,
  heading,
  description,
  questions,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const uid = useId()

  const toggleOpen = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  if (!questions || questions.length === 0) return null

  return (
    <section
      id={anchorId || 'faq'}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50"
    >
      {/* Glow effect */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none animate-float-slow"
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <Reveal className="text-center mb-16">
          <SectionEyebrow centered className="mb-4">
            Got Questions?
          </SectionEyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {heading}
          </h2>
          {description && (
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">{description}</p>
          )}
        </Reveal>

        {/* FAQ List */}
        <div className="space-y-4">
          {questions.map((faq, idx) => {
            const isOpen = openIndex === idx
            const buttonId = `${uid}-faq-button-${idx}`
            const panelId = `${uid}-faq-panel-${idx}`

            return (
              <Reveal key={faq.id || idx} delay={stagger(idx, 70)}>
                <div
                  className={`border rounded-2xl overflow-hidden transition-all duration-500 ${
                    isOpen
                      ? 'border-amber-500 bg-white shadow-xl shadow-amber-500/10'
                      : 'border-slate-200 bg-[#FDFBF9] hover:border-amber-500/40 hover:shadow-md'
                  }`}
                >
                  <h3 className="text-lg">
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleOpen(idx)}
                      className={`group w-full flex items-center justify-between gap-4 p-6 sm:p-8 text-left font-bold text-lg transition-colors duration-300 cursor-pointer ${
                        isOpen ? 'text-amber-600' : 'text-slate-800 hover:text-amber-600'
                      }`}
                    >
                      <span className="flex items-center gap-4">
                        <span
                          className={`hidden sm:block text-sm font-black tracking-widest tabular-nums transition-colors duration-300 ${
                            isOpen ? 'text-amber-500' : 'text-slate-300 group-hover:text-amber-400'
                          }`}
                          aria-hidden="true"
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span>{faq.question}</span>
                      </span>
                      <span
                        className={`flex-shrink-0 p-2 rounded-lg border transition-all duration-500 ease-out ${
                          isOpen
                            ? 'bg-amber-500 border-amber-500 text-slate-950'
                            : 'bg-white border-slate-100 text-slate-400 group-hover:border-amber-500/30 group-hover:text-amber-600'
                        }`}
                        aria-hidden="true"
                      >
                        {/* Only the glyph turns (plus -> cross); the square stays put */}
                        <Plus
                          className={`w-5 h-5 transition-transform duration-500 ease-out ${
                            isOpen ? 'rotate-[135deg]' : 'rotate-0'
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

                  {/* Smooth height animation: grid row 0fr -> 1fr (works for any answer length) */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div
                      className={`min-h-0 overflow-hidden transition-[visibility] duration-0 ${
                        isOpen ? 'visible delay-0' : 'invisible delay-500'
                      }`}
                    >
                      <p
                        className={`mx-6 sm:mx-8 pt-5 pb-6 sm:pb-8 border-t border-slate-100 text-slate-600 text-base leading-relaxed font-medium whitespace-pre-line transition-all duration-500 ease-out ${
                          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                        }`}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default FAQSection
