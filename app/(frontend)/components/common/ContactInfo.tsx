import React from 'react'
import { ArrowUpRight, CalendarClock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { stagger } from '../ui/motion'

type ContactType = 'phone' | 'whatsapp' | 'email' | 'address' | 'hours'

interface ContactItem {
  id?: string
  type: ContactType
  label: string
  value: string
}

export interface ContactInfoProps {
  anchorId?: string
  subheading?: string
  heading: string
  description?: string
  items?: ContactItem[]
}

const cleanNumber = (num: string) => num.replace(/[^0-9+]/g, '')

// Strips +, spaces and dashes; a leading 0 becomes the Pakistan country code (92)
const cleanWhatsapp = (num: string) => {
  let digits = num.replace(/\D/g, '')
  if (digits.startsWith('0')) digits = '92' + digits.substring(1)
  return digits
}

interface TypeStyle {
  Icon: LucideIcon
  action: string
  href: (value: string) => string | null
  external?: boolean
  /** Full class strings so Tailwind can see them. */
  tile: string
  border: string
}

const TYPES: Record<ContactType, TypeStyle> = {
  phone: {
    Icon: Phone,
    action: 'Call now',
    href: (v) => `tel:${cleanNumber(v)}`,
    tile: 'bg-amber-500/10 border-amber-500/20 text-amber-600 group-hover/card:bg-amber-500 group-hover/card:text-slate-950',
    border: 'hover:border-amber-500/40',
  },
  whatsapp: {
    Icon: MessageCircle,
    action: 'Chat on WhatsApp',
    href: (v) =>
      `https://wa.me/${cleanWhatsapp(v)}?text=${encodeURIComponent(
        'Hello! I would like to inquire about your furniture polishing services.',
      )}`,
    external: true,
    tile: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 group-hover/card:bg-emerald-500 group-hover/card:text-white',
    border: 'hover:border-emerald-500/40',
  },
  email: {
    Icon: Mail,
    action: 'Send an email',
    href: (v) => `mailto:${v}`,
    tile: 'bg-sky-500/10 border-sky-500/20 text-sky-600 group-hover/card:bg-sky-500 group-hover/card:text-white',
    border: 'hover:border-sky-500/40',
  },
  address: {
    Icon: MapPin,
    action: 'Open in Maps',
    href: (v) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}`,
    external: true,
    tile: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-500 group-hover/card:bg-indigo-500 group-hover/card:text-white',
    border: 'hover:border-indigo-500/40',
  },
  hours: {
    Icon: CalendarClock,
    action: '',
    href: () => null,
    tile: 'bg-rose-500/10 border-rose-500/20 text-rose-500 group-hover/card:bg-rose-500 group-hover/card:text-white',
    border: 'hover:border-rose-500/40',
  },
}

const cardBase =
  'group/card relative flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1'

export const ContactInfo: React.FC<ContactInfoProps> = ({
  anchorId,
  subheading,
  heading,
  description,
  items,
}) => {
  if (!items || items.length === 0) return null

  // Centered, wrapping rows so a short last row (e.g. 3 + 2) stays balanced instead of leaving an orphan
  const widthClass =
    items.length === 4
      ? 'lg:w-[calc(25%-18px)]'
      : items.length <= 2
        ? 'lg:w-[calc(50%-12px)]'
        : 'lg:w-[calc(33.333%-16px)]'

  return (
    <section
      id={anchorId || 'contact-info'}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FAF6EE] via-[#FDFBF7] to-[#F5EBE0] overflow-hidden border-t border-amber-950/5"
    >
      <div
        className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full border border-amber-500/10 pointer-events-none animate-float-slow"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-24 w-[360px] h-[360px] rounded-full bg-amber-500/5 blur-[90px] pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />

      <div className="relative max-w-[1600px] mx-auto">
        <SectionHeader align="center" subheading={subheading} heading={heading} description={description} />

        <div className="flex flex-wrap justify-center gap-6">
          {items.map((item, idx) => {
            const style = TYPES[item.type] || TYPES.phone
            const { Icon } = style
            const href = style.href(item.value)

            const inner = (
              <>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-500 ease-out group-hover/card:scale-110 group-hover/card:-rotate-6 ${style.tile}`}
                  aria-hidden="true"
                >
                  <Icon className="h-6 w-6" />
                </span>
                <div className="flex flex-1 flex-col gap-1.5">
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
                    {item.label}
                  </h3>
                  <p className="text-base font-extrabold leading-snug text-slate-900 [overflow-wrap:anywhere]">
                    {item.value}
                  </p>
                </div>
                {href && style.action && (
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-700">
                    {style.action}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                )}
              </>
            )

            return (
              <Reveal
                key={item.id || idx}
                delay={stagger(idx % 5, 90)}
                className={`w-full sm:w-[calc(50%-12px)] ${widthClass}`}
              >
                {href ? (
                  <a
                    href={href}
                    {...(style.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`${cardBase} ${style.border}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={`${cardBase} ${style.border}`}>{inner}</div>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default ContactInfo
