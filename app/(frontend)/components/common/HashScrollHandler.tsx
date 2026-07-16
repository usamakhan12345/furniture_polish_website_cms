'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { animateScrollToY } from '../../../../utilities/scroll'

export const HashScrollHandler: React.FC = () => {
  const pathname = usePathname()

  // Handle route-based hash scrolls on initial page load / transition
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash
      const id = decodeURIComponent(hash.substring(1))

      const timer = setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          const headerOffset = 112 // Height of the fixed header on desktop (h-28)
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - headerOffset
          animateScrollToY(offsetPosition, 1200) // Custom slow scroll to Y coordinate
        }
      }, 500) // 500ms delay ensures Next.js transitions are fully resolved

      return () => clearTimeout(timer)
    }
  }, [pathname])

  return null
}

export default HashScrollHandler
