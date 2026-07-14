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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0806]/80 backdrop-blur-lg border-b border-amber-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              {logoUrl ? (
                <img src={logoUrl} alt={logoAlt} className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
              ) : (
                <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 animate-text-shimmer">
                  POLISH MASTER
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
                className="text-sm font-semibold text-slate-300 hover:text-amber-400 transition-colors duration-300 relative group py-2"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            {data.ctaButton?.text ? (
              <Link
                href={getCtaHref(data.ctaButton)}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 text-sm font-extrabold rounded-lg shadow-md hover:shadow-amber-500/10 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
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
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/40 transition-colors duration-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0806] border-b border-amber-950/10 px-4 pt-4 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {data.navigationMenu?.map((item, idx) => (
              <Link
                key={item.id || idx}
                href={item.link}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-900/30 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {data.ctaButton?.text && (
            <div className="pt-4 border-t border-amber-950/10">
              <Link
                href={getCtaHref(data.ctaButton)}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold rounded-lg transition-all duration-200"
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
