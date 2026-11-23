'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cssVars } from './motion'

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'

/**
 * IntersectionObserver only reports *changes*, so an element the user jumps straight past
 * (End key, scrollbar drag, fast anchor scroll) never fires and would stay invisible.
 * One shared, rAF-throttled scroll listener sweeps pending elements and reveals any that
 * are already entirely above the viewport.
 */
interface PendingReveal {
  node: Element
  reveal: () => void
}

const pending = new Set<PendingReveal>()
let sweeping = false
let sweepFrame = 0

const sweep = () => {
  sweepFrame = 0
  pending.forEach((entry) => {
    if (entry.node.getBoundingClientRect().bottom < 0) {
      pending.delete(entry)
      entry.reveal()
    }
  })
  if (pending.size === 0) stopSweeping()
}

const onScroll = () => {
  if (!sweepFrame) sweepFrame = requestAnimationFrame(sweep)
}

const stopSweeping = () => {
  if (!sweeping) return
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(sweepFrame)
  sweepFrame = 0
  sweeping = false
}

const trackPending = (entry: PendingReveal) => {
  pending.add(entry)
  if (!sweeping) {
    window.addEventListener('scroll', onScroll, { passive: true })
    sweeping = true
  }
}

const untrackPending = (entry: PendingReveal) => {
  pending.delete(entry)
  if (pending.size === 0) stopSweeping()
}

export interface RevealProps {
  children: React.ReactNode
  className?: string
  direction?: RevealDirection
  /** Delay in ms, handy for staggering siblings. */
  delay?: number
  as?: 'div' | 'section' | 'article' | 'header' | 'ul' | 'li' | 'p' | 'span'
  /** Share of the element that must be visible before it reveals. */
  threshold?: number
  style?: React.CSSProperties
}

/**
 * Fades + slides its children in the first time they scroll into view.
 *
 * The hidden state lives in globals.css and only applies once `html.reveal-ready`
 * is set (inline script in layout.tsx), so the content stays visible without JS
 * and for users who prefer reduced motion.
 *
 * Don't put hover transforms on the same element — wrap the element instead.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  as = 'div',
  threshold = 0.12,
  style,
}) => {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const pendingEntry: PendingReveal = {
      node,
      reveal: () => {
        setVisible(true)
        observer.disconnect()
      },
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // `top < 0` covers elements that were already above the viewport when first observed
        // (e.g. a reload that restores the scroll position mid-page).
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          untrackPending(pendingEntry)
          pendingEntry.reveal()
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(node)
    trackPending(pendingEntry)
    return () => {
      untrackPending(pendingEntry)
      observer.disconnect()
    }
  }, [threshold])

  const Tag = as as React.ElementType

  return (
    <Tag
      ref={ref}
      data-direction={direction}
      className={`reveal${visible ? ' is-visible' : ''} ${className}`.trim()}
      style={{ ...style, ...cssVars({ '--reveal-delay': `${delay}ms` }) }}
    >
      {children}
    </Tag>
  )
}

export default Reveal
