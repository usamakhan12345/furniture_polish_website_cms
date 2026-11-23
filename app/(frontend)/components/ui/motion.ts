import type { CSSProperties } from 'react'

/** Typed helper for passing CSS custom properties through the `style` prop. */
export const cssVars = (vars: Record<string, string | number>): CSSProperties =>
  vars as unknown as CSSProperties

/** Delay (in ms) for the nth item of a staggered group. */
export const stagger = (index: number, step = 90, base = 0): number => base + index * step

/** Style for the `.enter` / `.enter-right` hero entrance classes. */
export const enterDelay = (ms: number): CSSProperties => cssVars({ '--d': `${ms}ms` })
