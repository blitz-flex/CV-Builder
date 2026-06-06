import { FORM_SECTIONS } from '../../config/formSections'
import { isSectionFilled } from '../../utils/cvHelpers'
import '../../styles/editor/FormSections.css'

function FormProgressHead({ formData }) {
  const filledCount = FORM_SECTIONS.filter((s) => isSectionFilled(s.key, formData)).length
  const progress = Math.round((filledCount / FORM_SECTIONS.length) * 100)

  return (
    <header className="form-progress-head" aria-live="polite">
      <div className="form-progress-head__meta">
        <span className="form-progress-head__label">Your sections</span>
        <span className="form-progress-head__count">{filledCount} of {FORM_SECTIONS.length} filled</span>
      </div>
      <div
        className="form-progress-head__bar"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`CV completion: ${progress}%`}
      >
        <div className="form-progress-head__bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </header>
  )
}

export default FormProgressHead
