import React from 'react'

/** Self-drawing circle + tick. Colour follows `currentColor`. */
export const SuccessCheck: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 52 52" className={`success-check ${className}`.trim()} fill="none" aria-hidden="true">
    <circle className="success-check__circle" cx="26" cy="26" r="24" />
    <path className="success-check__tick" d="M15 27l8 8 14-16" />
  </svg>
)

export default SuccessCheck
