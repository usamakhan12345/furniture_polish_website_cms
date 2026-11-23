import React from 'react'

export interface SectionEyebrowProps {
  children: React.ReactNode
  /** `amber` for light surfaces, `gold` for dark ones, `light` for amber gradients. */
  tone?: 'amber' | 'gold' | 'light'
  /** Adds a mirrored rule on the right for centered headings. */
  centered?: boolean
  className?: string
}

const TONES = {
  amber: '',
  gold: 'eyebrow-gold',
  light: 'eyebrow-light',
} as const

/** Small uppercase label with an animated rule. Strips the legacy ":" CMS prefix. */
export const SectionEyebrow: React.FC<SectionEyebrowProps> = ({
  children,
  tone = 'amber',
  centered = false,
  className = '',
}) => {
  const text = typeof children === 'string' ? children.replace(/^:+\s*/, '') : children

  return (
    <span className={`eyebrow ${TONES[tone]} ${centered ? 'eyebrow-center' : ''} ${className}`.trim()}>
      {text}
    </span>
  )
}

export default SectionEyebrow
