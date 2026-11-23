'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, TouchEvent } from 'react'

/** Slide transition length. Keep in sync with the timer used to re-centre the track. */
export const SLIDE_DURATION = 600

/** Largest number of cards visible at once (lg breakpoint). */
const MAX_PER_VIEW = 3

interface Options {
  /** Auto-advance interval in ms. 0 disables autoplay. */
  autoPlayMs?: number
}

/**
 * Seamless looping carousel state.
 *
 * Render `copies` repetitions of the items inside a flex track, give the track the
 * returned `trackStyle` and set `--per-view` on it with CSS (1 / 2 / 3 per breakpoint).
 * The track starts on the middle copy; once a move ends on an outer copy we silently
 * jump back to the equivalent slide in the middle, so the loop never visibly rewinds.
 */
export function useLoopCarousel(count: number, { autoPlayMs = 0 }: Options = {}) {
  const copies = Math.max(3, 2 + Math.ceil(MAX_PER_VIEW / Math.max(count, 1)))
  const total = copies * count

  const [position, setPosition] = useState(count)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)

  // Re-centre if the number of items changes (e.g. feedback loaded from the API).
  useEffect(() => {
    setAnimate(false)
    setPosition(count)
  }, [count])

  const go = useCallback(
    (delta: number) => {
      if (count <= 1) return
      setAnimate(true)
      setPosition((current) => {
        const next = current + delta
        return next < 0 || next > total - MAX_PER_VIEW ? current : next
      })
    },
    [count, total],
  )

  const goTo = useCallback(
    (index: number) => {
      if (count <= 1) return
      setAnimate(true)
      setPosition(count + index)
    },
    [count],
  )

  // After the slide finishes on an outer copy, jump (without animating) to the middle copy.
  useEffect(() => {
    if (count === 0) return
    if (position >= count * 2 || position < count) {
      const id = window.setTimeout(() => {
        setAnimate(false)
        setPosition((current) =>
          current >= count * 2 ? current - count : current < count ? current + count : current,
        )
      }, SLIDE_DURATION + 50)
      return () => window.clearTimeout(id)
    }
  }, [position, count])

  // Autoplay (paused on hover / focus / touch, skipped for reduced motion).
  useEffect(() => {
    if (!autoPlayMs || paused || count <= 1) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = window.setInterval(() => {
      if (!document.hidden) go(1)
    }, autoPlayMs)
    return () => window.clearInterval(id)
  }, [autoPlayMs, paused, count, go, position])

  const handlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
    onTouchStart: (event: TouchEvent) => {
      touchStartX.current = event.touches[0].clientX
      setPaused(true)
    },
    onTouchEnd: (event: TouchEvent) => {
      const start = touchStartX.current
      touchStartX.current = null
      setPaused(false)
      if (start === null) return
      const delta = event.changedTouches[0].clientX - start
      if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1)
    },
  }

  const trackStyle = {
    '--pos': position,
    transform: 'translate3d(calc(var(--pos) * -100% / var(--per-view)), 0, 0)',
    transition: animate ? `transform ${SLIDE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)` : 'none',
  } as unknown as CSSProperties

  const active = count > 0 ? ((position % count) + count) % count : 0

  return {
    copies,
    active,
    trackStyle,
    handlers,
    next: () => go(1),
    prev: () => go(-1),
    goTo,
  }
}
