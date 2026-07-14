'use client'

import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

interface FAQItem {
  id?: string
  question: string
  answer: string
}

export interface FAQSectionProps {
  heading: string
  description?: string
  questions: FAQItem[]
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  heading,
  description,
  questions,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleOpen = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  if (!questions || questions.length === 0) return null

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-400 font-bold text-sm tracking-wider uppercase mb-2 block">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {heading}
          </h2>
          {description && (
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
              {description}
            </p>
          )}
        </div>

        {/* FAQ Grid */}
        <div className="space-y-4">
          {questions.map((faq, idx) => {
            const isOpen = openIndex === idx

            return (
              <div
                key={faq.id || idx}
                className="border border-slate-900 rounded-2xl bg-slate-950/40 backdrop-blur-sm overflow-hidden hover:border-slate-800 transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleOpen(idx)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left text-white font-bold text-lg hover:text-amber-300 transition-colors duration-200"
                >
                  <span>{faq.question}</span>
                  <span className={`p-2 rounded-lg bg-slate-900 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-400' : ''}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] border-t border-slate-900' : 'max-h-0'
                  } overflow-hidden`}
                >
                  <p className="p-6 sm:p-8 text-slate-300 text-base leading-relaxed font-medium bg-slate-950/60 whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
export default FAQSection
