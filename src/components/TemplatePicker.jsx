import { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import CVPreviewDocument from './preview/CVPreviewDocument'
import TemplatePreview from './preview/TemplatePreview'
import { TEMPLATE_LIST, getTemplate, DEFAULT_TEMPLATE_ID, resolveTemplateId } from '../config/cvTemplates'
import { getPreviewSample } from '../config/previewSamples'
import { loadDraft } from '../utils/storage'
import { useIsMobilePicker } from '../hooks/useMediaQuery'
import '../styles/welcome/Welcome.css'
import '../styles/editor/CVPreview.css'
import '../styles/templates/TemplatePicker.css'

function StyleCard({ template, isActive, onSelect, cardRef }) {
  const sample = getPreviewSample(template.id)

  return (
    <button
      type="button"
      ref={cardRef}
      className={`style-card ${isActive ? 'style-card--active' : ''}`}
      onClick={() => onSelect(template.id)}
      aria-pressed={isActive}
      aria-label={template.name}
    >
      <div className="style-card-thumb" aria-hidden="true">
        <CVPreviewDocument
          formData={sample}
          accentColor={template.accentColor}
          selectedFont={template.font}
          layoutVariant={template.layoutVariant}
          templateId={template.id}
          className="cv-preview--card-thumb"
        />
      </div>
      <div className="style-card-footer">
        <span className="style-card-text">
          <strong>{template.name}</strong>
        </span>
        {isActive && (
          <span className="style-card-check" aria-hidden="true">
            <Check size={12} />
          </span>
        )}
      </div>
    </button>
  )
}

function TemplatePicker() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const fromEditor = searchParams.get('from') === 'create'
  const draft = loadDraft()
  const isMobilePicker = useIsMobilePicker()
  const scrollRef = useRef(null)
  const activeCardRef = useRef(null)

  const [activeId, setActiveId] = useState(
    resolveTemplateId(draft?.templateId ?? DEFAULT_TEMPLATE_ID)
  )
  const activeTemplate = getTemplate(activeId)
  const previewSample = getPreviewSample(activeId)

  // Keep active card centered in horizontal scroll on mobile
  useEffect(() => {
    if (!isMobilePicker) return
    const container = scrollRef.current
    const active = activeCardRef.current
    if (!container || !active) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    active.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest'
    })
  }, [activeId, isMobilePicker])

  const handleContinue = () => {
    navigate(`/create?template=${activeId}`)
  }

  return (
    <div className="template-picker-page welcome vintage-theme">
      <div className="vintage-bg">
        <div className="texture-overlay" />
      </div>

      <div className="template-picker-shell">
        <div className="template-picker-grid">
          <aside className="template-picker-left">
            <header className="template-picker-header u-safe-top">
              <Link to="/" className="template-back-link">
                <ArrowLeft size={16} aria-hidden="true" />
                Back home
              </Link>
              <h1 className="template-picker-title">
                Choose Your <span className="script-accent">Style</span>
              </h1>
            </header>

            {!fromEditor && (
              <p className="template-picker-notice template-picker-notice--hint">
                Pick a layout — you fill in your details on the next step.
              </p>
            )}

            {fromEditor && (
              <p className="template-picker-notice">
                Switch style — your entered details will be kept.
              </p>
            )}

            <div className="template-styles-panel">
              <p className="template-styles-label" id="template-styles-label">
                 CV templates available
              </p>
              <div
                className="template-styles-grid"
                ref={scrollRef}
                role="listbox"
                aria-labelledby="template-styles-label"
                aria-label="CV style options"
              >
                {TEMPLATE_LIST.map((template) => (
                  <StyleCard
                    key={template.id}
                    template={template}
                    isActive={activeId === template.id}
                    onSelect={setActiveId}
                    cardRef={activeId === template.id ? activeCardRef : null}
                  />
                ))}
              </div>
            </div>

            <div className="template-action-bar">
              <div className="template-action-info">
                <span className="template-action-name">{activeTemplate.name}</span>
              </div>
              <div className="button-frame">
                <button type="button" className="gold-btn" onClick={handleContinue}>
                  {fromEditor ? 'Apply style' : 'Continue'}
                </button>
              </div>
            </div>

            <p className="template-picker-privacy">
              Stored locally — no account required.
            </p>
          </aside>

          <section className="template-picker-right" aria-label="Style preview">
            <TemplatePreview
              formData={previewSample}
              accentColor={activeTemplate.accentColor}
              selectedFont={activeTemplate.font}
              layoutVariant={activeTemplate.layoutVariant}
              templateId={activeTemplate.id}
            />
          </section>
        </div>
      </div>
    </div>
  )
}

export default TemplatePicker
