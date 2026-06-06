import { useEffect, useRef } from 'react'

export function useDebouncedSave(callback, deps, delay = 500) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    if (!deps[0]) return undefined

    const timer = setTimeout(() => callbackRef.current(), delay)
    return () => clearTimeout(timer)
  }, deps)
}
