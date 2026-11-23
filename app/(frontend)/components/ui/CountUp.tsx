'use client'

import React, { useEffect, useRef, useState } from 'react'

// "1,200+" -> prefix "", number "1,200", suffix "+"
const PATTERN = /^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/

export interface CountUpProps {
  /** Display string from the CMS, e.g. "500+", "98%", "1,200", "$4.5M". */
  value: string
  duration?: number
  className?: string
}

/**
 * Counts a numeric stat up from zero the first time it is visible.
 * The real value is what the server renders, so crawlers, no-JS and
 * reduced-motion users always get the final number.
 */
export const CountUp: React.FC<CountUpProps> = ({ value, duration = 1800, className }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    setDisplay(value)

    const node = ref.current
    const match = PATTERN.exec(value)
    if (!node || !match) return
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const [, prefix, numberText, suffix] = match
    const target = parseFloat(numberText.replace(/,/g, ''))
    if (!Number.isFinite(target) || target === 0) return

    const decimals = numberText.split('.')[1]?.length ?? 0
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: numberText.includes(','),
    })

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - progress, 4) // easeOutQuart
          setDisplay(progress === 1 ? value : `${prefix}${formatter.format(target * eased)}${suffix}`)
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  )
}

export default CountUp
