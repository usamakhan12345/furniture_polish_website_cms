'use client'

import React, { useState } from 'react'
import { Loader2, Phone, Send } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionEyebrow } from '../ui/SectionEyebrow'
import { SuccessCheck } from '../ui/SuccessCheck'

interface StepItem {
  id?: string
  title: string
  description?: string | null
}

interface ServiceItem {
  id?: string
  name: string
}

export interface ContactFormProps {
  anchorId?: string
  subheading?: string
  heading: string
  description?: string
  steps?: StepItem[]
  phone?: string
  services?: ServiceItem[]
  successMessage?: string
}

const EMPTY = { name: '', email: '', phone: '', service: '', message: '' }

export const ContactForm: React.FC<ContactFormProps> = ({
  anchorId,
  subheading,
  heading,
  description,
  steps,
  phone,
  services,
  successMessage,
}) => {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const serviceOptions = services?.filter((s) => s?.name) ?? []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // The messages API stores name / email / phone / message, so the chosen service rides along in the message
      const message = form.service ? `Service needed: ${form.service}\n\n${form.message}` : form.message

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message }),
      })

      if (response.ok) {
        setStatus('success')
        setForm(EMPTY)
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error('Contact form submission error:', err)
      setStatus('error')
    }
  }

  return (
    <section
      id={anchorId || 'contact-form'}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />

      <div className="relative max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
        {/* Left: intro + what happens next (walnut panel) */}
        <Reveal direction="left" className="lg:col-span-5">
          <div className="relative isolate flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E1209] via-[#2A170B] to-[#150C06] p-8 sm:p-10 shadow-xl">
            <div className="absolute inset-0 -z-10 wood-grain opacity-40 pointer-events-none" aria-hidden="true" />
            <div
              className="absolute -top-20 -right-20 -z-10 h-64 w-64 rounded-full bg-amber-500/15 blur-[90px] pointer-events-none"
              aria-hidden="true"
            />

            {subheading && (
              <SectionEyebrow tone="gold" className="mb-5">
                {subheading}
              </SectionEyebrow>
            )}
            <h2 className="mb-4 text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-white">
              {heading}
            </h2>
            {description && (
              <p className="mb-8 text-base leading-relaxed font-medium text-stone-300">{description}</p>
            )}

            {steps && steps.length > 0 && (
              <ol className="mb-8 space-y-6 border-t border-white/10 pt-8">
                {steps.map((step, idx) => (
                  <li key={step.id || idx} className="flex gap-4">
                    <span
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/15 text-sm font-extrabold text-amber-400"
                      aria-hidden="true"
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="mb-1 text-base font-extrabold text-white">{step.title}</h3>
                      {step.description && (
                        <p className="text-sm leading-relaxed font-medium text-stone-400">{step.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            )}

            {phone && (
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                className="group mt-auto inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 transition-colors duration-300 hover:border-amber-500/40 hover:bg-white/[0.09]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-950 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-stone-400">Prefer to talk?</span>
                  <span className="text-lg font-extrabold text-white">{phone}</span>
                </span>
              </a>
            )}
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal direction="right" delay={150} className="lg:col-span-7">
          <div className="h-full rounded-3xl border border-slate-200 bg-[#FAF6EE]/60 p-8 sm:p-10 shadow-sm transition-all duration-500 hover:border-amber-500/20 hover:shadow-xl">
            <h3 className="mb-8 text-2xl font-bold text-slate-900">Send Us a Message</h3>

            {status === 'success' ? (
              <div
                className="flex flex-col items-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center text-emerald-600 animate-fade-in"
                role="status"
              >
                <SuccessCheck className="mb-4" />
                <p className="mb-2 text-lg font-bold">Message Sent!</p>
                <p className="text-sm font-medium leading-relaxed">
                  {successMessage || 'Thank you! Your message has been sent successfully.'}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="link-underline mt-6 pb-0.5 text-sm font-bold text-emerald-600 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div
                    role="alert"
                    className="animate-shake rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm font-bold text-red-600"
                  >
                    Something went wrong. Please check your network connection and try again.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="field-group flex flex-col">
                    <label htmlFor="cf-name" className="field-label">Your Name</label>
                    <input
                      id="cf-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Sajid Ali"
                      className="field"
                    />
                  </div>
                  <div className="field-group flex flex-col">
                    <label htmlFor="cf-phone" className="field-label">Phone Number</label>
                    <input
                      id="cf-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 0312-0129875"
                      className="field"
                    />
                  </div>
                </div>

                <div className={`grid grid-cols-1 gap-6 ${serviceOptions.length > 0 ? 'sm:grid-cols-2' : ''}`}>
                  <div className="field-group flex flex-col">
                    <label htmlFor="cf-email" className="field-label">Email Address</label>
                    <input
                      id="cf-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. sajid@example.com"
                      className="field"
                    />
                  </div>
                  {serviceOptions.length > 0 && (
                    <div className="field-group flex flex-col">
                      <label htmlFor="cf-service" className="field-label">Service Needed</label>
                      <select
                        id="cf-service"
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="field cursor-pointer"
                      >
                        <option value="">Select a service (optional)</option>
                        {serviceOptions.map((s, idx) => (
                          <option key={s.id || idx} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="field-group flex flex-col">
                  <label htmlFor="cf-message" className="field-label">Your Message</label>
                  <textarea
                    id="cf-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your furniture: the type of wood, the damage and the finish you would like..."
                    className="field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  aria-busy={status === 'loading'}
                  className="btn btn-primary w-full disabled:opacity-60 disabled:pointer-events-none"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="btn-icon h-4 w-4" />
                      <span>Request Free Inspection</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
export default ContactForm
