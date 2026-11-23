'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export interface ModalProps {
  open: boolean
  onClose: () => void
  /** Accessible name for the dialog. */
  label: string
  children: React.ReactNode
  /** Tailwind max-width class for the panel. */
  maxWidth?: string
  /** Background + border classes for the panel surface. */
  surface?: string
  className?: string
}

const EXIT_DURATION = 220 // keep in sync with the .modal-* exit animations in globals.css

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'

/**
 * Accessible modal dialog: portal, enter/exit animation, scroll lock,
 * Escape + backdrop to close, focus trap and focus restore.
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  label,
  children,
  maxWidth = 'max-w-2xl',
  surface = 'bg-white border-slate-200/50',
  className = '',
}) => {
  // Stay mounted while the exit animation plays.
  const [lingering, setLingering] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (open) {
      setLingering(true)
      return
    }
    const id = window.setTimeout(() => setLingering(false), EXIT_DURATION)
    return () => window.clearTimeout(id)
  }, [open])

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'

    // Wait a frame so the portal content exists before moving focus into it.
    const focusFrame = requestAnimationFrame(() => panelRef.current?.focus())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) {
        event.preventDefault()
        panel.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [open])

  if (!open && !lingering) return null
  if (typeof document === 'undefined') return null

  const state = open ? 'open' : 'closed'

  return createPortal(
    <div
      data-state={state}
      className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        data-state={state}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={`modal-panel relative max-h-[92vh] w-full ${maxWidth} overflow-y-auto rounded-3xl border shadow-2xl outline-none ${surface} ${className}`}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

export default Modal
