'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'

import { getCtaHref } from '../../../../utilities/cta'

interface Media {
  url?: string
  alt?: string
}

interface NavItem {
  id?: string
  label: string
  link: string
}

interface CTA {
  text: string
  isExternal?: boolean | null
  link?: string | null
  page?: string | { slug: string } | null
}

export interface HeaderProps {
  data: {
    logo?: Media | string | null
    navigationMenu?: NavItem[]
    ctaButton?: CTA
  } | null
}

export const Header: React.FC<HeaderProps> = ({ data }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (!data) return null

  const logoUrl = typeof data.logo === 'object' && data.logo?.url ? data.logo.url : ''
  const logoAlt = typeof data.logo === 'object' && data.logo?.alt ? data.logo.alt : 'Logo'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              {logoUrl ? (
                <img src={logoUrl} alt={logoAlt} className="h-10 w-auto object-contain" />
              ) : (
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                  PAYLOAD
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {data.navigationMenu?.map((item, idx) => (
              <Link
                key={item.id || idx}
                href={item.link}
                className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            {data.ctaButton?.text ? (
              <Link
                href={getCtaHref(data.ctaButton)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-md transition-all duration-200"
              >
                <span>{data.ctaButton.text}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors duration-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-900 px-4 pt-4 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {data.navigationMenu?.map((item, idx) => (
              <Link
                key={item.id || idx}
                href={item.link}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-900/40 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {data.ctaButton?.text && (
            <div className="pt-4 border-t border-slate-900">
              <Link
                href={getCtaHref(data.ctaButton)}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200"
              >
                <span>{data.ctaButton.text}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
export default Header
