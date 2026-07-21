'use client'

import React, { useState, useEffect } from 'react'
import { Phone, MessageSquare, MapPin, Send, Loader2, X } from 'lucide-react'

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

  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (isMapOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMapOpen])

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

  return (
    <section id={anchorId || 'contact'} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-200/50">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column: Details */}
        <div className="flex flex-col justify-center animate-fade-in-right">
          <span className="text-amber-600 font-bold text-sm tracking-wider uppercase mb-2 block">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            {heading}
          </h2>
          {description && (
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-10 font-medium max-w-xl">
              {description}
            </p>
          )}

          {/* Contact Cards: 3-column layout on tablet/medium screens to prevent stretching down */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
            
            {/* Phones Card */}
            <div className="flex gap-4 p-5 rounded-2xl bg-[#FDFBF9] border border-slate-200 hover:border-amber-500/20 hover:scale-[1.02] hover:shadow-md transition-all duration-300 group/card">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-600 self-start group-hover/card:bg-amber-500/20 group-hover/card:scale-110 transition-all duration-300">
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

            {/* WhatsApp Card */}
            <div className="flex gap-4 p-5 rounded-2xl bg-[#FDFBF9] border border-slate-200 hover:border-emerald-500/20 hover:scale-[1.02] hover:shadow-md transition-all duration-300 group/card">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-600 self-start group-hover/card:bg-emerald-500/20 group-hover/card:scale-110 transition-all duration-300">
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

            {/* Address Location Card */}
            {location && (
              <div 
                onClick={() => embedUrl && setIsMapOpen(true)}
                className={`flex gap-4 p-5 rounded-2xl bg-[#FDFBF9] border border-slate-200 hover:border-indigo-500/20 hover:scale-[1.02] hover:shadow-md transition-all duration-300 group/card ${
                  embedUrl ? 'cursor-pointer' : ''
                }`}
              >
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-500 self-start group-hover/card:bg-indigo-500/20 group-hover/card:scale-110 transition-all duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-slate-800 font-bold mb-1 flex items-center gap-2">
                    <span>Our Location</span>
                    {embedUrl && <span className="text-[10px] bg-indigo-500/10 text-indigo-600 px-1.5 py-0.5 rounded font-extrabold uppercase">Open Map</span>}
                  </h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    {location}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="bg-[#FAF6EE]/50 border border-slate-200 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Send Us a Message</h3>
          
          {status === 'success' ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-center animate-fade-in">
              <p className="font-bold text-lg mb-2">Message Sent!</p>
              <p className="text-sm font-medium leading-relaxed">
                {formSettings?.successMessage || 'Thank you! Your message has been sent successfully.'}
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm font-bold text-emerald-600 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-bold text-center animate-fade-in">
                  Something went wrong. Please check your network connection and try again.
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-amber-600 text-xs font-bold uppercase mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="bg-[#FDFBF9] border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-amber-600 text-xs font-bold uppercase mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@example.com"
                    className="bg-[#FDFBF9] border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-amber-600 text-xs font-bold uppercase mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +92 300 1234567"
                  className="bg-[#FDFBF9] border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-all placeholder:text-slate-400"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="message" className="text-amber-600 text-xs font-bold uppercase mb-2">Your Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your furniture polishing project details..."
                  className="bg-[#FDFBF9] border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-all placeholder:text-slate-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold rounded-xl shadow-lg disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer"
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

      {/* Google Maps Modal Overlay */}
      {isMapOpen && embedUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Our Office Location</h3>
              <button
                type="button"
                onClick={() => setIsMapOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Map Iframe */}
            <div className="aspect-video w-full">
              <iframe
                src={embedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
          {/* Close click on backdrop */}
          <div className="absolute inset-0 -z-10" onClick={() => setIsMapOpen(false)} />
        </div>
      )}
    </section>
  )
}
export default ContactSection
