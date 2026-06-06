import { ChevronDown } from 'lucide-react'

function ShowMoreButton({ remaining, onClick, label = 'entries' }) {
  const count = Math.min(remaining, 2)

  return (
    <button
      type="button"
      className="show-more-btn"
      onClick={onClick}
      aria-label={`Show ${count} more ${label}`}
    >
      <ChevronDown size={16} aria-hidden="true" />
      Show {count} more {label}
      <span className="show-more-btn__count" aria-hidden="true">
        ({remaining} hidden)
      </span>
    </button>
  )
}

export default ShowMoreButton
