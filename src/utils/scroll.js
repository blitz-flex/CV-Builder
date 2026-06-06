/**
 * Smooth-scroll to a form section by key, respecting reduced motion.
 * @param {string} sectionKey
 * @param {{ block?: ScrollLogicalPosition }} [options]
 */
export function scrollToSection(sectionKey, options = {}) {
  const el = document.getElementById(`section-${sectionKey}`)
  if (!el) return

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  el.scrollIntoView({
    behavior: prefersReduced ? 'auto' : 'smooth',
    block: options.block ?? 'start'
  })
}
