'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { animateScrollToTop } from '../../../../utilities/scroll'

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Track scroll position to show/hide the button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const handleScrollToTop = () => {
    animateScrollToTop(1200) // 1.2 seconds custom slow scroll
  }

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3.5 rounded-full bg-[#18110B] border border-amber-500/20 text-amber-400 shadow-xl transition-all duration-300 hover:bg-amber-500 hover:text-slate-950 hover:border-transparent hover:scale-110 active:scale-95 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 animate-bounce-slow" />
    </button>
  )
}
export default ScrollToTop
