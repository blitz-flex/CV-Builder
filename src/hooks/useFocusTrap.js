import { useEffect, useRef } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ')

/**
 * Trap keyboard focus inside a modal/panel while active.
 * Returns a ref to attach to the container element.
 */
export function useFocusTrap(isActive) {
  const containerRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!isActive) return undefined

    previousFocusRef.current = document.activeElement

    const container = containerRef.current
    if (!container) return undefined

    const focusables = () => [...container.querySelectorAll(FOCUSABLE)]
    const first = () => focusables()[0]

    requestAnimationFrame(() => {
      const el = first()
      if (el) el.focus()
    })

    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return

      const items = focusables()
      if (items.length === 0) {
        e.preventDefault()
        return
      }

      const firstEl = items[0]
      const lastEl = items[items.length - 1]

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }

    container.addEventListener('keydown', onKeyDown)

    return () => {
      container.removeEventListener('keydown', onKeyDown)
      const prev = previousFocusRef.current
      if (prev && typeof prev.focus === 'function') {
        prev.focus()
      }
    }
  }, [isActive])

  return containerRef
}
