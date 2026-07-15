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
