import React from 'react'
import { Reveal } from './Reveal'
import { SectionEyebrow } from './SectionEyebrow'

export interface SectionHeaderProps {
  subheading?: string
  heading: string
  description?: string
  align?: 'left' | 'center'
  /** `dark` for the walnut surfaces, `light` for white / cream ones. */
  tone?: 'light' | 'dark'
  className?: string
}

/** Eyebrow + heading + intro paragraph shared by the inner-page sections. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  subheading,
  heading,
  description,
  align = 'left',
  tone = 'light',
  className = '',
}) => {
  const centered = align === 'center'
  const dark = tone === 'dark'

  return (
    <Reveal
      direction={centered ? 'up' : 'left'}
      className={`mb-14 max-w-3xl ${centered ? 'mx-auto text-center' : 'text-left'} ${className}`.trim()}
    >
      {subheading && (
        <SectionEyebrow tone={dark ? 'gold' : 'amber'} centered={centered} className="mb-5">
          {subheading}
        </SectionEyebrow>
      )}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight ${
          dark ? 'text-white' : 'text-slate-900'
        } ${description ? 'mb-5' : ''}`}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={`text-base sm:text-lg leading-relaxed font-medium whitespace-pre-line ${
            dark ? 'text-stone-300' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}

export default SectionHeader
