import { Check, ChevronDown, ChevronUp } from 'lucide-react'

function FormSectionCard({ id, index, label, short, icon: Icon, collapsed, onToggle, isFilled, hint, children }) {
  const num = String(index + 1).padStart(2, '0')
  const isOpen = !collapsed

  return (
    <article
      id={id}
      className={`form-section-card${isOpen ? ' is-open' : ''}${isFilled ? ' is-filled' : ''}`}
    >
      <button
        type="button"
        className="form-section-card__head"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-body`}
        id={`${id}-head`}
      >
        <span className="form-section-card__index">{num}</span>
        <span className="form-section-card__icon" aria-hidden="true">
          <Icon size={15} />
        </span>
        <span className="form-section-card__text">
          <span className="form-section-card__label">{label}</span>
          <span className="form-section-card__short">{short}</span>
        </span>
        <span className="form-section-card__status" aria-hidden="true">
          {isFilled && <Check size={14} className="form-section-card__check" />}
          {isOpen ? (
            <ChevronUp size={16} className="form-section-card__chevron" />
          ) : (
            <ChevronDown size={16} className="form-section-card__chevron" />
          )}
        </span>
      </button>

      {isOpen && (
        <div className="form-section-body" id={`${id}-body`} role="region" aria-labelledby={`${id}-head`}>
          {hint && !isFilled && <p className="form-section-hint">{hint}</p>}
          {children}
        </div>
      )}
    </article>
  )
}

export default FormSectionCard
