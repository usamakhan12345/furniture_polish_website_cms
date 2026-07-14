'use client'

import React, { useState } from 'react'
import { Phone, MessageSquare, MapPin, Send, Loader2 } from 'lucide-react'

interface PhoneItem {
  id?: string
  phone: string
}

interface WhatsappItem {
  id?: string
  whatsapp: string
}

export interface ContactSectionProps {
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
  heading,
  description,
  phoneNumbers,
  whatsappNumbers,
  formSettings,
  location,
  mapUrl,
}) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const defaultPhones = [{ id: 'dp1', phone: '0312-0129875' }, { id: 'dp2', phone: '03002855019' }]
  const defaultWhatsapps = [{ id: 'dw1', whatsapp: '03032584068' }]

  const activePhones = phoneNumbers && phoneNumbers.length > 0 ? phoneNumbers : defaultPhones
  const activeWhatsapps = whatsappNumbers && whatsappNumbers.length > 0 ? whatsappNumbers : defaultWhatsapps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    }, 1500)
  }

  const cleanNumber = (num: string) => num.replace(/[^0-9+]/g, '')

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0806] overflow-hidden border-t border-amber-950/5">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-5 flex flex-col justify-center animate-fade-in-right">
          <span className="text-amber-400 font-bold text-sm tracking-wider uppercase mb-2 block">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            {heading}
          </h2>
          {description && (
            <p className="text-slate-300 text-base leading-relaxed mb-10 font-medium">
              {description}
            </p>
          )}

          {/* Contact Cards */}
          <div className="space-y-6">
            
            {/* Phones Card */}
            <div className="flex gap-4 p-5 rounded-2xl bg-[#18110B]/40 border border-amber-950/10 hover:border-amber-500/20 transition-all duration-300">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 self-start">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-white font-bold mb-2">Call Us Directly</h3>
                {activePhones.map((p, idx) => (
                  <a
                    key={p.id || idx}
                    href={`tel:${cleanNumber(p.phone)}`}
                    className="text-slate-300 hover:text-amber-400 font-bold text-base mb-1 transition-colors"
                  >
                    {p.phone}
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="flex gap-4 p-5 rounded-2xl bg-[#18110B]/40 border border-amber-950/10 hover:border-emerald-500/20 transition-all duration-300">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 self-start">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-white font-bold mb-2">Chat on WhatsApp</h3>
                {activeWhatsapps.map((w, idx) => (
                  <a
                    key={w.id || idx}
                    href={`https://wa.me/${cleanNumber(w.whatsapp).replace(/^0/, '92')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-emerald-400 font-bold text-base mb-1 transition-colors"
                  >
                    {w.whatsapp}
                  </a>
                ))}
              </div>
            </div>

            {/* Address Location Card */}
            {location && (
              <div className="flex gap-4 p-5 rounded-2xl bg-[#18110B]/40 border border-amber-950/10 hover:border-amber-500/20 transition-all duration-300">
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 self-start">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white font-bold mb-1">Our Location</h3>
                  <p className="text-slate-300 text-sm font-medium leading-relaxed">
                    {location}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7 bg-[#18110B]/30 border border-amber-950/10 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-2xl animate-fade-in-up">
          <h3 className="text-2xl font-bold text-white mb-8">Send Us a Message</h3>
          
          {status === 'success' ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center animate-fade-in">
              <p className="font-bold text-lg mb-2">Message Sent!</p>
              <p className="text-sm font-medium leading-relaxed">
                {formSettings?.successMessage || 'Thank you! Your message has been sent successfully.'}
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm font-bold text-emerald-400 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-slate-400 text-xs font-bold uppercase mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="bg-[#0B0806]/60 border border-amber-950/10 rounded-xl px-4 py-3.5 text-white font-medium focus:border-amber-500 focus:outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-slate-400 text-xs font-bold uppercase mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@example.com"
                    className="bg-[#0B0806]/60 border border-amber-950/10 rounded-xl px-4 py-3.5 text-white font-medium focus:border-amber-500 focus:outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="text-slate-400 text-xs font-bold uppercase mb-2">Your Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your furniture polishing project details..."
                  className="bg-[#0B0806]/60 border border-amber-950/10 rounded-xl px-4 py-3.5 text-white font-medium focus:border-amber-500 focus:outline-none transition-all placeholder:text-slate-600 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold rounded-xl shadow-lg disabled:opacity-50 transition-all duration-200"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>
    </section>
  )
}
export default ContactSection
