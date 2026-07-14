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
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 animate-fade-in-up">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-600 font-bold text-sm tracking-wider uppercase mb-2 block">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {heading}
          </h2>
          {description && (
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
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
                className={`border rounded-2xl bg-[#FDFBF9] overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'border-amber-500 shadow-md shadow-amber-500/5'
                    : 'border-slate-200 hover:border-amber-500/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleOpen(idx)}
                  className={`w-full flex items-center justify-between p-6 sm:p-8 text-left font-bold text-lg transition-colors duration-200 ${
                    isOpen ? 'text-amber-600' : 'text-slate-800 hover:text-amber-600'
                  }`}
                >
                  <span>{faq.question}</span>
                  <span className={`p-2 rounded-lg bg-white border border-slate-100 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-600' : ''}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] border-t border-slate-100' : 'max-h-0'
                  } overflow-hidden`}
                >
                  <p className="p-6 sm:p-8 text-slate-600 text-base leading-relaxed font-medium bg-slate-50/50 whitespace-pre-line">
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
