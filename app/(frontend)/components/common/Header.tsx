'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react'
import { getCtaHref } from '../../../../utilities/cta'
import { handleSmoothScrollClick } from '../../../../utilities/scroll'
import { resolveMediaUrl, resolveMediaAlt } from '../../../../utilities/media'

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
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const progressRef = useRef<HTMLSpanElement>(null)

  // Track scroll: hide on scroll down / show on scroll up, compact once scrolled, and drive the progress bar.
  // Runs once and uses refs, so scrolling doesn't re-subscribe or re-render the header every frame.
  useEffect(() => {
    const update = () => {
      ticking.current = false
      const y = window.scrollY
      const delta = y - lastScrollY.current

      setScrolled(y > 12)
      if (Math.abs(delta) > 6) {
        setVisible(delta < 0 || y < 100)
        lastScrollY.current = y
      }

      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`
      }
    }

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Close the mobile drawer on navigation
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Escape closes the mobile drawer
  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileMenuOpen])

  if (!data) return null

  const logoUrl = resolveMediaUrl(data.logo)
  const logoAlt = resolveMediaAlt(data.logo, 'Logo')

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ease-out ${
        visible || mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      } ${
        // No shadow while the header is slid away, otherwise it bleeds into the top of the viewport
        (scrolled || mobileMenuOpen) && (visible || mobileMenuOpen)
          ? 'bg-[#18110B]/95 backdrop-blur-xl border-amber-500/15 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)]'
          : 'bg-[#18110B]/90 backdrop-blur-lg border-amber-950/15 shadow-none'
      }`}
    >
      {/* Scroll progress */}
      <span
        ref={progressRef}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-amber-600 via-amber-400 to-orange-500"
        aria-hidden="true"
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* Header height eases down once the page is scrolled */}
        <div
          className={`flex items-center justify-between transition-[height] duration-500 ease-out ${
            scrolled ? 'h-16 md:h-20' : 'h-20 md:h-24'
          }`}
        >
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              onClick={(e) => handleSmoothScrollClick(e, '/', pathname)}
              className="flex items-center group"
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={logoAlt}
                  className={`w-auto max-w-[260px] object-contain mix-blend-screen transition-all duration-500 ease-out group-hover:scale-105 ${
                    scrolled ? 'h-11 md:h-13' : 'h-14 md:h-16'
                  }`}
                />
              ) : (
                <span className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 animate-text-shimmer">
                  POLISH MASTER
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center h-full" aria-label="Primary">
            {data.navigationMenu?.map((item, idx) => {
              // Active Link Matching Logic
              const isActive = pathname === item.link || (item.link !== '/' && pathname.startsWith(item.link))
              const resolvedHref = resolveNavLink(item.link, pathname)
              const hasSubMenu = !!item.subMenu && item.subMenu.length > 0

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
                    {hasSubMenu && (
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/nav:rotate-180 group-focus-within/nav:rotate-180 text-amber-100/60" />
                    )}
                  </Link>

                  {/* Active bottom bar line (grows from the left) */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-amber-500 to-amber-300 transition-transform duration-500 ease-out ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Nested Submenu Items Dropdown (opens on hover and keyboard focus) */}
                  {hasSubMenu && (
                    <div className="absolute top-[85%] left-0 mt-2 w-56 bg-[#18110B] border border-amber-500/10 rounded-2xl shadow-2xl py-3 opacity-0 invisible scale-95 origin-top-left group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:scale-100 group-focus-within/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:scale-100 transition-all duration-300 ease-out transform translate-y-2 group-hover/nav:translate-y-0 group-focus-within/nav:translate-y-0 z-50">
                      {item.subMenu!.map((sub, sIdx) => {
                        const isSubActive = pathname === sub.link
                        const subResolvedHref = resolveNavLink(sub.link, pathname)
                        return (
                          <Link
                            key={sIdx}
                            href={subResolvedHref}
                            onClick={(e) => handleSmoothScrollClick(e, subResolvedHref, pathname)}
                            className={`block px-5 py-2.5 text-sm font-bold border-l-2 transition-all duration-300 hover:pl-7 ${
                              isSubActive
                                ? 'text-amber-400 bg-white/5 border-amber-500'
                                : 'text-amber-100/80 hover:text-amber-400 hover:bg-white/5 border-transparent hover:border-amber-500'
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

          {/* Desktop CTA (fill-sweep hover swap) */}
          <div className="hidden md:flex items-center">
            {data.ctaButton?.text ? (
              <Link
                href={getCtaHref(data.ctaButton, pathname)}
                onClick={(e) => handleSmoothScrollClick(e, getCtaHref(data.ctaButton, pathname), pathname)}
                className="btn btn-primary btn-sm"
              >
                <span>{data.ctaButton.text}</span>
                <ArrowRight className="btn-icon w-4 h-4" aria-hidden="true" />
              </Link>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl text-amber-100/80 hover:text-white hover:bg-white/10 active:scale-90 transition-all duration-200"
            >
              <Menu
                className={`absolute w-6 h-6 transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
                }`}
              />
              <X
                className={`absolute w-6 h-6 transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu: grid-rows 0fr -> 1fr animates to the content's natural height */}
      <div
        id="mobile-menu"
        className={`md:hidden grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
          mobileMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
        inert={!mobileMenuOpen}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-amber-950/20 px-4 pt-4 pb-6 space-y-4">
            <nav className="flex flex-col space-y-3" aria-label="Mobile">
              {data.navigationMenu?.map((item, idx) => {
                const isActive = pathname === item.link
                const resolvedHref = resolveNavLink(item.link, pathname)

                return (
                  <div
                    key={item.id || idx}
                    className={`flex flex-col space-y-1 transition-all duration-500 ease-out ${
                      mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: mobileMenuOpen ? `${120 + idx * 55}ms` : '0ms' }}
                  >
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
                      <div className="pl-6 flex flex-col space-y-2 border-l border-amber-500/20 py-1">
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
              <div
                className={`pt-4 border-t border-amber-950/15 transition-all duration-500 ease-out ${
                  mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
                style={{
                  transitionDelay: mobileMenuOpen ? `${120 + (data.navigationMenu?.length ?? 0) * 55}ms` : '0ms',
                }}
              >
                <Link
                  href={getCtaHref(data.ctaButton, pathname)}
                  onClick={(e) => {
                    handleSmoothScrollClick(e, getCtaHref(data.ctaButton, pathname), pathname)
                    setMobileMenuOpen(false)
                  }}
                  className="btn btn-primary btn-sm w-full"
                >
                  <span>{data.ctaButton.text}</span>
                  <ArrowRight className="btn-icon w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
