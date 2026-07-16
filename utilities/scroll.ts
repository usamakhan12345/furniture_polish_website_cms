import { MouseEvent } from 'react'

/**
 * Animates viewport scrolling to a specific Y coordinate position smoothly with custom duration and easing.
 * Avoids the default browser "behavior: smooth" abrupt speed shifts on long pages.
 */
export const animateScrollToY = (targetY: number, duration: number = 1200) => {
  if (typeof window === 'undefined') return

  const startY = window.scrollY
  const difference = targetY - startY
  const startTime = performance.now()

  // Easing function: Quadratic Ease-Out (decelerates towards zero velocity)
  const easeOutQuad = (t: number) => t * (2 - t)

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeOutQuad(progress)

    window.scrollTo(0, startY + difference * easedProgress)

    if (elapsed < duration) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

/**
 * Animates viewport scrolling back to the top of the page.
 */
export const animateScrollToTop = (duration: number = 1200) => {
  animateScrollToY(0, duration)
}

/**
 * Global React MouseEvent click interceptor to smooth scroll anchor jumps.
 * Works perfectly inside Next.js <Link> tags to cancel native jumps.
 */
export const handleSmoothScrollClick = (
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  pathname: string,
  onComplete?: () => void
) => {
  // If clicking home/logo while already on home page, scroll to top smoothly
  if (href === '/' || href === '#home') {
    if (pathname === '/') {
      e.preventDefault()
      animateScrollToTop(1200)
      window.history.pushState(null, '', '/')
      if (onComplete) onComplete()
      return
    }
  }

  // Handle in-page smooth section scrolling (must start with #)
  if (href.startsWith('#')) {
    const id = decodeURIComponent(href.substring(1))
    const element = document.getElementById(id)
    if (element) {
      e.preventDefault()
      const headerOffset = 96 // Height of the fixed header on desktop (h-24)
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset
      animateScrollToY(offsetPosition, 1200) // Custom slow scroll to Y coordinate
      window.history.pushState(null, '', href)
      if (onComplete) onComplete()
    }
  }
}
