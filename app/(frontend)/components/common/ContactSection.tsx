'use client'

import React, { useState } from 'react'
import { Phone, MessageSquare, MapPin, Send, Loader2, X, ArrowUpRight } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { Modal } from '../ui/Modal'
import { SectionEyebrow } from '../ui/SectionEyebrow'
import { SuccessCheck } from '../ui/SuccessCheck'
import { stagger } from '../ui/motion'

interface PhoneItem {
  id?: string
  phone: string
}

interface WhatsappItem {
  id?: string
  whatsapp: string
}

export interface ContactSectionProps {
  anchorId?: string
  heading: string
  description?: string
  phoneNumbers?: PhoneItem[]
  whatsappNumbers?: WhatsappItem[]
  formSettings?: {
    email?: string
    successMessage?: string
  }
  location?: string
  mapUrl?: string
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  anchorId,
  heading,
  description,
  phoneNumbers,
  whatsappNumbers,
  formSettings,
  location,
  mapUrl,
}) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [isMapOpen, setIsMapOpen] = useState(false)

  const defaultPhones = [{ id: 'dp1', phone: '0312-0129875' }, { id: 'dp2', phone: '03002855019' }]
  const defaultWhatsapps = [{ id: 'dw1', whatsapp: '03032584068' }]

  const activePhones = phoneNumbers && phoneNumbers.length > 0 ? phoneNumbers : defaultPhones
  const activeWhatsapps = whatsappNumbers && whatsappNumbers.length > 0 ? whatsappNumbers : defaultWhatsapps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error('Contact form submission error:', err)
      setStatus('error')
    }
  }

  const cleanNumber = (num: string) => num.replace(/[^0-9+]/g, '')

  // Robust WhatsApp parser (strips +, spaces, leading 0 replaced with Pakistan code 92)
  const cleanWhatsapp = (num: string) => {
    let digits = num.replace(/\D/g, '')
    if (digits.startsWith('0')) {
      digits = '92' + digits.substring(1)
    }
    return digits
  }

  const prefilledText = encodeURIComponent('Hello! I would like to inquire about your furniture polishing services.')

  // Resolve Map URLs dynamically for public iframe embeds
  let embedUrl = ''
  if (mapUrl) {
    if (mapUrl.includes('<iframe') && mapUrl.includes('src="')) {
      const match = mapUrl.match(/src="([^"]+)"/)
      embedUrl = match ? match[1] : mapUrl
    } else if (mapUrl.includes('embed') || mapUrl.includes('output=embed')) {
      embedUrl = mapUrl
    } else {
      embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapUrl)}&output=embed`
    }
  } else if (location) {
    embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&output=embed`
  }

  const cardBase =
    'group/card relative flex gap-4 p-5 rounded-2xl bg-[#FDFBF9] border border-slate-200 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 ease-out'

  return (
    <section
      id={anchorId || 'contact'}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50"
    >
      {/* Glow Effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />

      <div className="max-w-[1600px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column: Details */}
        <div className="flex flex-col justify-center">
          <Reveal direction="left">
            <SectionEyebrow className="mb-4">Get in Touch</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              {heading}
            </h2>
            {description && (
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-10 font-medium max-w-xl">
                {description}
              </p>
            )}
          </Reveal>

          {/* Contact Cards: 3-column layout on tablet/medium screens to prevent stretching down */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
            {/* Phones Card */}
            <Reveal delay={stagger(0, 110, 100)} className="h-full">
              <div className={`${cardBase} h-full hover:border-amber-500/30`}>
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-600 self-start group-hover/card:bg-amber-500 group-hover/card:text-slate-950 group-hover/card:scale-110 group-hover/card:-rotate-6 transition-all duration-500 ease-out">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-slate-800 font-bold mb-2">Call Us Directly</h3>
                  {activePhones.map((p, idx) => (
                    <a
                      key={p.id || idx}
                      href={`tel:${cleanNumber(p.phone)}`}
                      className="text-slate-600 hover:text-amber-600 font-bold text-base mb-1 transition-colors"
                    >
                      {p.phone}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* WhatsApp Card */}
            <Reveal delay={stagger(1, 110, 100)} className="h-full">
              <div className={`${cardBase} h-full hover:border-emerald-500/30`}>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-600 self-start group-hover/card:bg-emerald-500 group-hover/card:text-white group-hover/card:scale-110 group-hover/card:-rotate-6 transition-all duration-500 ease-out">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-slate-800 font-bold mb-2">Chat on WhatsApp</h3>
                  {activeWhatsapps.map((w, idx) => (
                    <a
                      key={w.id || idx}
                      href={`https://wa.me/${cleanWhatsapp(w.whatsapp)}?text=${prefilledText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-emerald-600 font-bold text-base mb-1 transition-colors"
                    >
                      {w.whatsapp}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Address Location Card (a real button when it opens the map) */}
            {location && (
              <Reveal delay={stagger(2, 110, 100)} className="h-full">
                {embedUrl ? (
                  <button
                    type="button"
                    onClick={() => setIsMapOpen(true)}
                    aria-haspopup="dialog"
                    className={`${cardBase} h-full w-full text-left cursor-pointer hover:border-indigo-500/30`}
                  >
                    <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-500 self-start group-hover/card:bg-indigo-500 group-hover/card:text-white group-hover/card:scale-110 group-hover/card:-rotate-6 transition-all duration-500 ease-out">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-slate-800 font-bold mb-1 flex items-center gap-2">
                        <span>Our Location</span>
                        <span className="inline-flex items-center gap-1 text-[10px] bg-indigo-500/10 text-indigo-600 px-1.5 py-0.5 rounded font-extrabold uppercase">
                          Open Map
                          <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                        </span>
                      </h3>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed">{location}</p>
                    </div>
                  </button>
                ) : (
                  <div className={`${cardBase} h-full hover:border-indigo-500/30`}>
                    <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-500 self-start">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-slate-800 font-bold mb-1">Our Location</h3>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed">{location}</p>
                    </div>
                  </div>
                )}
              </Reveal>
            )}
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <Reveal direction="right" delay={150}>
          <div className="bg-[#FAF6EE]/60 border border-slate-200 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-xl hover:border-amber-500/20 transition-all duration-500">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Send Us a Message</h3>

            {status === 'success' ? (
              <div
                className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-center animate-fade-in flex flex-col items-center"
                role="status"
              >
                <SuccessCheck className="mb-4" />
                <p className="font-bold text-lg mb-2">Message Sent!</p>
                <p className="text-sm font-medium leading-relaxed">
                  {formSettings?.successMessage || 'Thank you! Your message has been sent successfully.'}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="link-underline pb-0.5 mt-6 text-sm font-bold text-emerald-600 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div
                    role="alert"
                    className="animate-shake p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-bold text-center"
                  >
                    Something went wrong. Please check your network connection and try again.
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="field-group flex flex-col">
                    <label htmlFor="name" className="field-label">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="field"
                    />
                  </div>
                  <div className="field-group flex flex-col">
                    <label htmlFor="email" className="field-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="field"
                    />
                  </div>
                </div>
                <div className="field-group flex flex-col">
                  <label htmlFor="phone" className="field-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +92 300 1234567"
                    className="field"
                  />
                </div>
                <div className="field-group flex flex-col">
                  <label htmlFor="message" className="field-label">Your Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your furniture polishing project details..."
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
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="btn-icon w-4 h-4" />
                      <span>Send Message Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      {/* Google Maps Modal */}
      <Modal
        open={isMapOpen && !!embedUrl}
        onClose={() => setIsMapOpen(false)}
        label="Our office location"
        maxWidth="max-w-4xl"
        className="overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Our Office Location</h3>
          <button
            type="button"
            onClick={() => setIsMapOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 hover:rotate-90 transition-all duration-300 cursor-pointer"
            aria-label="Close map"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {/* Map Iframe (skeleton shows until the map paints over it) */}
        <div className="relative aspect-video w-full bg-slate-100">
          <div className="absolute inset-0 animate-pulse bg-slate-200/70" aria-hidden="true" />
          <iframe
            src={embedUrl}
            title="Office location map"
            className="relative w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </Modal>
    </section>
  )
}
export default ContactSection
