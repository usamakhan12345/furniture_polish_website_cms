'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ArrowUp } from 'lucide-react'
import { animateScrollToTop } from '../../../../utilities/scroll'

const RADIUS = 22
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const ringRef = useRef<SVGCircleElement>(null)

  // Track scroll position: toggle the button and fill the progress ring (no re-render per frame)
  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      const y = window.scrollY
      setIsVisible(y > 300)

      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
      ringRef.current?.setAttribute('stroke-dashoffset', String(CIRCUMFERENCE * (1 - progress)))
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
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

  const handleScrollToTop = () => {
    animateScrollToTop(1200) // 1.2 seconds custom slow scroll
  }

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      className={`group fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#18110B] text-amber-400 shadow-xl shadow-black/30 transition-all duration-500 ease-out hover:bg-amber-500 hover:text-slate-950 hover:scale-110 hover:shadow-amber-500/30 active:scale-95 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      {/* Scroll progress ring */}
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r={RADIUS} stroke="currentColor" strokeOpacity="0.18" strokeWidth="2" />
        <circle
          ref={ringRef}
          cx="24"
          cy="24"
          r={RADIUS}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />
      </svg>
      <ArrowUp className="relative h-5 w-5 animate-bounce-slow group-hover:animate-none" />
    </button>
  )
}
export default ScrollToTop
