import { useRef, useCallback } from 'react'

const DEFAULT_THRESHOLD = 80

/**
 * Touch swipe-to-dismiss for bottom sheets / full-screen panels.
 * Swipe down to trigger onDismiss.
 */
export function useSwipeDismiss({ onDismiss, enabled = true, threshold = DEFAULT_THRESHOLD }) {
  const startY = useRef(0)
  const currentY = useRef(0)
  const dragging = useRef(false)
  const panelRef = useRef(null)

  const onTouchStart = useCallback((e) => {
    if (!enabled) return
    const touch = e.touches[0]
    startY.current = touch.clientY
    currentY.current = touch.clientY
    dragging.current = true
  }, [enabled])

  const onTouchMove = useCallback((e) => {
    if (!enabled || !dragging.current) return
    const touch = e.touches[0]
    const delta = touch.clientY - startY.current
    currentY.current = touch.clientY

    if (delta > 0 && panelRef.current) {
      panelRef.current.style.transform = `translateY(${delta}px)`
      panelRef.current.style.opacity = String(Math.max(0.4, 1 - delta / 300))
    }
  }, [enabled])

  const onTouchEnd = useCallback(() => {
    if (!enabled || !dragging.current) return
    dragging.current = false

    const delta = currentY.current - startY.current
    const panel = panelRef.current

    if (panel) {
      panel.style.transition = 'transform 0.25s var(--ease-out-expo, ease), opacity 0.25s ease'
      if (delta > threshold) {
        panel.style.transform = 'translateY(100%)'
        panel.style.opacity = '0'
        setTimeout(() => {
          onDismiss?.()
          panel.style.transition = ''
          panel.style.transform = ''
          panel.style.opacity = ''
        }, 250)
      } else {
        panel.style.transform = ''
        panel.style.opacity = ''
        setTimeout(() => { panel.style.transition = '' }, 250)
      }
    }
  }, [enabled, onDismiss, threshold])

  return { panelRef, handlers: { onTouchStart, onTouchMove, onTouchEnd } }
}
