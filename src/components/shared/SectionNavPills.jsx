import { useRef, useEffect } from 'react'
import { FORM_SECTIONS } from '../../config/formSections'
import { isSectionFilled } from '../../utils/cvHelpers'
import '../../styles/editor/SectionNavPills.css'

function SectionNavPills({ formData, activeSection, onSelectSection }) {
  const scrollRef = useRef(null)
  const activeRef = useRef(null)

  useEffect(() => {
    const container = scrollRef.current
    const active = activeRef.current
    if (!container || !active) return

    const containerRect = container.getBoundingClientRect()
    const activeRect = active.getBoundingClientRect()

    if (activeRect.left < containerRect.left || activeRect.right > containerRect.right) {
      active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [activeSection])

  const handleSelect = (key) => {
    onSelectSection(key)
  }

  return (
    <nav className="section-nav" aria-label="Jump to section">
      <div className="section-nav__track u-scroll-snap-x" ref={scrollRef}>
        {FORM_SECTIONS.map((section) => {
          const isActive = activeSection === section.key
          const isFilled = isSectionFilled(section.key, formData)

          return (
            <button
              key={section.key}
              type="button"
              ref={isActive ? activeRef : null}
              className={`section-nav__pill u-snap-item${isActive ? ' is-active' : ''}${isFilled ? ' is-filled' : ''}`}
              onClick={() => handleSelect(section.key)}
              aria-current={isActive ? 'true' : undefined}
              aria-label={`${section.label}${isFilled ? ' — completed' : ''}`}
            >
              <section.icon size={14} aria-hidden="true" />
              <span>{section.short}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default SectionNavPills
