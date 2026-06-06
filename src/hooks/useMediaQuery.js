import { useState, useEffect } from 'react'

/**
 * Subscribe to a CSS media query. Uses matchMedia for efficient updates.
 * @param {string} query - e.g. '(min-width: 1025px)'
 * @param {boolean} [defaultValue=false] - SSR / initial render fallback
 */
export function useMediaQuery(query, defaultValue = false) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return defaultValue
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)

    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** Breakpoints aligned with editor layout */
export const BREAKPOINTS = {
  sm: '(min-width: 480px)',
  md: '(min-width: 640px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  coarse: '(pointer: coarse)',
  reduceMotion: '(prefers-reduced-motion: reduce)'
}

export function useIsDesktop() {
  return useMediaQuery(BREAKPOINTS.lg)
}

/** Template picker mobile layout breakpoint (matches CSS 960px) */
export function useIsMobilePicker() {
  return useMediaQuery('(max-width: 960px)')
}

export function useIsCoarsePointer() {
  return useMediaQuery(BREAKPOINTS.coarse)
}
