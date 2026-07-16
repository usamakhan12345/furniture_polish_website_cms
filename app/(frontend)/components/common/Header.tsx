'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react'
import { getCtaHref } from '../../../../utilities/cta'
import { handleSmoothScrollClick } from '../../../../utilities/scroll'

interface Media {
  url?: string
  alt?: string
}

interface SubMenuItem {
  label: string
  link: string
}

interface NavItem {
  id?: string
  label: string
  link: string
  subMenu?: SubMenuItem[]
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

// Utility to resolve smooth anchor navigation across different page slugs
const resolveNavLink = (href: string, pathname: string) => {
  if (href.startsWith('#')) {
    return pathname === '/' ? href : `/${href}`
  }
  return href
}

export const Header: React.FC<HeaderProps> = ({ data }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()

  // Track scroll position to hide/show header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  if (!data) return null

  const logoUrl = typeof data.logo === 'object' && data.logo?.url ? data.logo.url : ''
  const logoAlt = typeof data.logo === 'object' && data.logo?.alt ? data.logo.alt : 'Logo'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-[#18110B]/90 backdrop-blur-lg border-b border-amber-950/15 transition-all duration-300 ease-in-out ${
      visible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* Increased Top and Bottom Spacing */}
        <div className="flex items-center justify-between h-24 md:h-28">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              onClick={(e) => handleSmoothScrollClick(e, '/', pathname)}
              className="flex items-center group"
            >
              {logoUrl ? (
                <img src={logoUrl} alt={logoAlt} className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
              ) : (
                <span className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 animate-text-shimmer">
                  POLISH MASTER
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center h-full">
            {data.navigationMenu?.map((item, idx) => {
              // Active Link Matching Logic
              const isActive = pathname === item.link || (item.link !== '/' && pathname.startsWith(item.link))
              const resolvedHref = resolveNavLink(item.link, pathname)

              return (
                <div key={item.id || idx} className="relative group/nav py-4 flex items-center h-full">
                  <Link
                    href={resolvedHref}
                    onClick={(e) => handleSmoothScrollClick(e, resolvedHref, pathname)}
                    className={`text-base font-bold transition-colors duration-300 flex items-center gap-1 py-2 ${
                      isActive ? 'text-amber-400 font-extrabold' : 'text-amber-100/90 hover:text-amber-400'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.subMenu && item.subMenu.length > 0 && (
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/nav:rotate-180 text-amber-100/60" />
                    )}
                  </Link>

                  {/* Active bottom bar line */}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-amber-500 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'
                  }`} />

                  {/* Nested Submenu Items Dropdown */}
                  {item.subMenu && item.subMenu.length > 0 && (
                    <div className="absolute top-[85%] left-0 mt-2 w-52 bg-[#18110B] border border-amber-950/20 rounded-2xl shadow-2xl py-3 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 transform translate-y-2 group-hover/nav:translate-y-0 z-50">
                      {item.subMenu.map((sub, sIdx) => {
                        const isSubActive = pathname === sub.link
                        const subResolvedHref = resolveNavLink(sub.link, pathname)
                        return (
                          <Link
                            key={sIdx}
                            href={subResolvedHref}
                            onClick={(e) => handleSmoothScrollClick(e, subResolvedHref, pathname)}
                            className={`block px-5 py-2.5 text-sm font-bold transition-colors duration-200 ${
                              isSubActive ? 'text-amber-400 bg-white/5' : 'text-amber-100/80 hover:text-amber-400 hover:bg-white/5'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Desktop CTA (Hover Swap) */}
          <div className="hidden md:flex items-center">
            {data.ctaButton?.text ? (
              <Link
                href={getCtaHref(data.ctaButton, pathname)}
                onClick={(e) => handleSmoothScrollClick(e, getCtaHref(data.ctaButton, pathname), pathname)}
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-amber-500 hover:bg-transparent border border-transparent hover:border-amber-500 text-slate-950 hover:text-amber-400 text-sm font-extrabold rounded-lg shadow-md hover:shadow-amber-500/10 transition-all duration-300"
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
              className="p-2 rounded-xl text-amber-100/70 hover:text-white hover:bg-white/10 transition-colors duration-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#18110B] border-b border-amber-950/20 px-4 pt-4 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            {data.navigationMenu?.map((item, idx) => {
              const isActive = pathname === item.link
              const resolvedHref = resolveNavLink(item.link, pathname)

              return (
                <div key={item.id || idx} className="flex flex-col space-y-1">
                  <Link
                    href={resolvedHref}
                    onClick={(e) => {
                      handleSmoothScrollClick(e, resolvedHref, pathname)
                      if (!item.subMenu || item.subMenu.length === 0) {
                        setMobileMenuOpen(false)
                      }
                    }}
                    className={`text-base font-semibold p-2 rounded-lg hover:bg-white/5 transition-all duration-200 ${
                      isActive ? 'text-amber-400 font-extrabold bg-white/5' : 'text-amber-100/80 hover:text-amber-400'
                    }`}
                  >
                    {item.label}
                  </Link>

                  {/* Mobile Submenu links rendering */}
                  {item.subMenu && item.subMenu.length > 0 && (
                    <div className="pl-6 flex flex-col space-y-2 border-l border-amber-950/15 py-1">
                      {item.subMenu.map((sub, sIdx) => {
                        const isSubActive = pathname === sub.link
                        const subResolvedHref = resolveNavLink(sub.link, pathname)
                        return (
                          <Link
                            key={sIdx}
                            href={subResolvedHref}
                            onClick={(e) => {
                              handleSmoothScrollClick(e, subResolvedHref, pathname)
                              setMobileMenuOpen(false)
                            }}
                            className={`text-sm font-semibold p-1.5 transition-colors ${
                              isSubActive ? 'text-amber-400 font-bold' : 'text-amber-100/60 hover:text-amber-400'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {data.ctaButton?.text && (
            <div className="pt-4 border-t border-amber-950/15">
              <Link
                href={getCtaHref(data.ctaButton, pathname)}
                onClick={(e) => {
                  handleSmoothScrollClick(e, getCtaHref(data.ctaButton, pathname), pathname)
                  setMobileMenuOpen(false)
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-amber-500 hover:bg-transparent border border-transparent hover:border-amber-500 text-slate-950 hover:text-amber-400 font-bold rounded-lg transition-all duration-300"
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
