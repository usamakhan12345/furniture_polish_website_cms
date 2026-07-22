'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { handleSmoothScrollClick } from '../../../../utilities/scroll'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'

interface Media {
  url?: string
  alt?: string
}

interface NavLink {
  id?: string
  label: string
  isExternal?: boolean | null
  link?: string | null
  page?: string | { slug: string } | null
}

interface LinkGroup {
  id?: string
  title: string
  links: NavLink[]
}

interface SocialLink {
  id?: string
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'github'
  link: string
}

interface ContactInfo {
  email?: string
  phone?: string
  whatsapp?: string
  officeHours?: string
  address?: string
}

export interface FooterProps {
  data: {
    logo?: Media | string | null
    footerLogo?: Media | string | null
    navigationLinks?: NavLink[]
    navigationGroups?: LinkGroup[]
    companyInformation?: string
    copyright?: string
    socialLinks?: SocialLink[]
    contactInformation?: ContactInfo
  } | null
}

// Utility to resolve smooth anchor navigation across different page slugs
const resolveNavLink = (href: string, pathname: string) => {
  if (href.startsWith('#')) {
    return pathname === '/' ? href : `/${href}`
  }
  return href
}

// Utility to get URL from a structured CTA/Link item
const getFooterLinkHref = (item: NavLink, pathname: string) => {
  let target = '#'
  if (item.isExternal) {
    target = item.link || '#'
  } else if (item.page) {
    if (typeof item.page === 'object' && item.page.slug) {
      target = item.page.slug === 'home' ? '/' : `/${item.page.slug}`
    }
  }
  return resolveNavLink(target, pathname)
}

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'facebook':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      )
    case 'twitter':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.095 4.095 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    case 'instagram':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
      )
    case 'github':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
        </svg>
      )
    default:
      return null
  }
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const pathname = usePathname()

  if (!data) return null

  // Resolve Custom Footer Logo (if present, fallback to default logo)
  const activeLogo = data.footerLogo || data.logo
  const logoUrl = resolveMediaUrl(activeLogo)
  const logoAlt = resolveMediaAlt(activeLogo, 'Logo')

  const defaultLinks: NavLink[] = [
    { id: 'fl1', label: 'Home', isExternal: true, link: '/' },
    { id: 'fl2', label: 'Portfolio', isExternal: true, link: '#portfolio' },
    { id: 'fl3', label: 'Contact Us', isExternal: true, link: '#contact' },
  ]

  const activeLinks = data.navigationLinks && data.navigationLinks.length > 0 ? data.navigationLinks : defaultLinks

  return (
    <footer className="bg-[#18110B] border-t border-amber-950/15 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
        
        {/* Logo & Description Column */}
        <div className="md:col-span-4 flex flex-col">
          <Link
            href="/"
            onClick={(e) => handleSmoothScrollClick(e, '/', pathname)}
            className="flex items-center mb-6"
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={logoAlt}
                className="h-14 md:h-16 w-auto max-w-[260px] object-contain mix-blend-screen transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                POLISH MASTER
              </span>
            )}
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6 font-medium">
            {data.companyInformation ||
              'Premium furniture polishing, varnishing, and wood restoration services designed to bring the glow back to your wooden fixtures.'}
          </p>
          
          {/* Social Icons Links */}
          <div className="flex gap-4">
            {data.socialLinks?.map((s, idx) => (
              <a
                key={s.id || idx}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#18110B] border border-amber-950/10 text-slate-400 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-200"
              >
                {getSocialIcon(s.platform)}
              </a>
            ))}
          </div>
        </div>

        {/* Dynamic Multi-Column Navigation Group */}
        {data.navigationGroups && data.navigationGroups.length > 0 ? (
          data.navigationGroups.map((group, idx) => (
            <div key={group.id || idx} className="md:col-span-2 flex flex-col">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
                {group.title}
              </h3>
              <ul className="space-y-3.5">
                {group.links?.map((item, lIdx) => {
                  const resolvedHref = getFooterLinkHref(item, pathname)
                  return (
                    <li key={item.id || lIdx}>
                      <Link
                        href={resolvedHref}
                        onClick={(e) => handleSmoothScrollClick(e, resolvedHref, pathname)}
                        className="text-slate-400 hover:text-white text-sm font-semibold transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))
        ) : (
          /* Fallback Single Column Navigation if Groups not defined */
          <div className="md:col-span-3 flex flex-col">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3.5">
              {activeLinks.map((item, idx) => {
                const resolvedHref = getFooterLinkHref(item, pathname)
                return (
                  <li key={item.id || idx}>
                    <Link
                      href={resolvedHref}
                      onClick={(e) => handleSmoothScrollClick(e, resolvedHref, pathname)}
                      className="text-slate-400 hover:text-white text-sm font-semibold transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* Contact Info Column */}
        <div className={`flex flex-col ${
          data.navigationGroups && data.navigationGroups.length > 0 ? 'md:col-span-4' : 'md:col-span-5'
        }`}>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
            Contact Information
          </h3>
          <ul className="space-y-4">
            {data.contactInformation?.email && (
              <li className="text-slate-400 text-sm font-medium">
                <span className="text-slate-500 font-bold block mb-1">Email Address</span>
                <a href={`mailto:${data.contactInformation.email}`} className="hover:text-white transition-colors">
                  {data.contactInformation.email}
                </a>
              </li>
            )}
            {data.contactInformation?.phone && (
              <li className="text-slate-400 text-sm font-medium">
                <span className="text-slate-500 font-bold block mb-1">Phone Call</span>
                <a href={`tel:${data.contactInformation.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
                  {data.contactInformation.phone}
                </a>
              </li>
            )}
            {data.contactInformation?.whatsapp && (
              <li className="text-slate-400 text-sm font-medium">
                <span className="text-slate-500 font-bold block mb-1">WhatsApp Chat</span>
                <a 
                  href={`https://wa.me/${data.contactInformation.whatsapp.replace(/\D/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {data.contactInformation.whatsapp}
                </a>
              </li>
            )}
            {data.contactInformation?.officeHours && (
              <li className="text-slate-400 text-sm font-medium">
                <span className="text-slate-500 font-bold block mb-1">Working Hours</span>
                <span className="leading-relaxed">{data.contactInformation.officeHours}</span>
              </li>
            )}
            {data.contactInformation?.address && (
              <li className="text-slate-400 text-sm font-medium">
                <span className="text-slate-500 font-bold block mb-1">Office Location</span>
                <span className="leading-relaxed">{data.contactInformation.address}</span>
              </li>
            )}
          </ul>
        </div>

      </div>

      {/* Copyright Banner */}
      <div className="max-w-[1600px] mx-auto pt-8 border-t border-amber-950/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500">
        <span>
          {data.copyright || `© ${new Date().getFullYear()} Polish Master. All rights reserved.`}
        </span>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-slate-300">Privacy Policy</Link>
          <Link href="#" className="hover:text-slate-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
export default Footer
