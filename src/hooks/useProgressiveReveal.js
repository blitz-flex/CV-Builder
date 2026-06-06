import { useState, useEffect, useCallback } from 'react'

const DEFAULT_STEP = 2
const DEFAULT_INITIAL = 2

/**
 * Progressive reveal for long lists — reduces initial DOM on mobile.
 * @param {number} total - Total item count
 * @param {{ initial?: number, step?: number }} [options]
 */
export function useProgressiveReveal(total, options = {}) {
  const { initial = DEFAULT_INITIAL, step = DEFAULT_STEP } = options
  const [visible, setVisible] = useState(initial)

  // Expand visible count when items are added
  useEffect(() => {
    if (total > visible && total <= visible + 1) {
      setVisible(total)
    }
  }, [total, visible])

  const showMore = useCallback(() => {
    setVisible((v) => Math.min(v + step, total))
  }, [step, total])

  const hasMore = visible < total
  const remaining = total - visible

  return {
    visibleCount: Math.min(visible, total),
    showMore,
    hasMore,
    remaining,
    showAll: () => setVisible(total)
  }
}
