import { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, LayoutTemplate, RotateCcw, Download } from 'lucide-react'
import CVPreview from './preview/CVPreview'
import FormColumns from './shared/FormColumns'
import FormProgressHead from './shared/FormProgressHead'
import SectionNavPills from './shared/SectionNavPills'
import EditorLoadingSkeleton from './shared/EditorLoadingSkeleton'
import { DEFAULT_FONT } from '../config/fonts'
import { DEFAULT_ACCENT_COLOR } from '../config/colors'
import { getTemplate, getTemplateSnapshot, DEFAULT_TEMPLATE_ID, resolveTemplateId } from '../config/cvTemplates'
import { isCvMostlyEmpty, isFormComplete } from '../utils/cvHelpers'
import { loadDraft, saveDraft, clearDraft, hasMeaningfulDraft } from '../utils/storage'
import { useDebouncedSave } from '../hooks/useDebouncedSave'
import { useIsDesktop } from '../hooks/useMediaQuery'
import { useFormData } from '../hooks/useFormData'
import { generatePDF } from '../utils/pdfGenerator'
import '../styles/editor/CVForm.css'

function CVForm() {
  const cvRef = useRef()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [accentColor, setAccentColor]         = useState(DEFAULT_ACCENT_COLOR)
  const [selectedFont, setSelectedFont]       = useState(DEFAULT_FONT)
  const [templateId, setTemplateId]           = useState(DEFAULT_TEMPLATE_ID)
  const [isHydrated, setIsHydrated]           = useState(false)
  const [activeSection, setActiveSection]     = useState('personalInfo')
  const [showMobilePreview, setShowMobilePreview] = useState(false)

  const isDesktop = useIsDesktop()

  const {
    formData, setFormData,
    collapsed, resetCollapsed,
    handleChange, handleArrayChange,
    addItem, removeItem,
    toggleSection, openSection,
  } = useFormData()

  // ── Hydrate from URL param or saved draft ──────────────────────────────────
  useEffect(() => {
    const templateParam   = searchParams.get('template')
    const resolvedParam   = templateParam ? resolveTemplateId(templateParam) : null
    const template        = resolvedParam ? getTemplate(resolvedParam) : null

    if (template) {
      const draft = loadDraft()

      if (draft && hasMeaningfulDraft(draft)) {
        setFormData(draft.formData)
        setAccentColor(template.accentColor)
        setSelectedFont(template.font)
        setTemplateId(template.id)
        resetCollapsed()
      } else {
        const snap = getTemplateSnapshot(resolvedParam)
        setFormData(snap.formData)
        setAccentColor(snap.accentColor)
        setSelectedFont(snap.selectedFont)
        setTemplateId(snap.templateId)
        resetCollapsed()
      }

      if (templateParam !== template.id) {
        navigate(`/create?template=${template.id}`, { replace: true })
      }

      setIsHydrated(true)
      return
    }

    const draft = loadDraft()
    if (draft) {
      const resolvedId = resolveTemplateId(draft.templateId)
      setFormData(draft.formData)
      setAccentColor(draft.accentColor)
      setSelectedFont(draft.selectedFont)
      setTemplateId(resolvedId)
      resetCollapsed()
      setIsHydrated(true)
      return
    }

    navigate('/templates', { replace: true })
  }, [searchParams, navigate, setFormData, resetCollapsed])

  // ── Auto-save draft ────────────────────────────────────────────────────────
  useDebouncedSave(
    () => {
      if (!isHydrated) return
      saveDraft({ templateId, formData, accentColor, selectedFont })
    },
    [isHydrated, templateId, formData, accentColor, selectedFont]
  )

  // ── Lock body scroll when mobile preview is open ───────────────────────────
  useEffect(() => {
    if (!showMobilePreview || isDesktop) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [showMobilePreview, isDesktop])

  // ── Section helpers ────────────────────────────────────────────────────────
  const handleToggleSection = (section) => {
    toggleSection(section, setActiveSection)
  }

  const handleSectionSelect = (section) => {
    openSection(section)
    setActiveSection(section)
  }

  const handleAddItem = (section) => {
    addItem(section, setActiveSection)
  }

  // ── Actions ────────────────────────────────────────────────────────────────
  const downloadPDF = () => generatePDF(cvRef.current, formData.fullName || 'CV')

  const clearForm = () => {
    if (!window.confirm('Clear all fields and start over with a blank CV?')) return
    clearDraft()
    const snap = getTemplateSnapshot(templateId)
    setFormData(snap.formData)
    setAccentColor(snap.accentColor)
    setSelectedFont(snap.selectedFont)
    resetCollapsed()
    navigate(`/create?template=${templateId}`, { replace: true })
  }

  const browseTemplates = () => navigate('/templates?from=create')

  // ── Derived state ──────────────────────────────────────────────────────────
  const hasContent   = !isCvMostlyEmpty(formData)
  const canDownload  = isFormComplete(formData)
  const template     = getTemplate(templateId)
  const templateName = template?.name       ?? 'CV'
  const layoutVariant = template?.layoutVariant ?? 'classic'

  const previewProps = {
    formData, accentColor, selectedFont,
    cvRef, isEmpty: !hasContent,
    layoutVariant, templateId, templateName,
  }

  if (!isHydrated) return <EditorLoadingSkeleton />

  return (
    <div
      className={`cv-builder ${showMobilePreview ? 'preview-active' : ''}`}
      style={{ '--editor-accent': accentColor }}
    >
      <div className="form-side">
        <header className="form-header">
          <div className="form-header-top">
            <div className="form-header-title">
              <h2>Create CV</h2>
              <span className="template-badge">
                <span className="template-badge-dot" aria-hidden="true" />
                {templateName}
              </span>
            </div>

            <div className="form-toolbar" role="toolbar" aria-label="Editor actions">
              <button type="button" className="toolbar-btn toolbar-btn--labeled" onClick={browseTemplates} aria-label="Change style">
                <LayoutTemplate size={16} aria-hidden="true" />
                <span>Style</span>
              </button>

              {!isDesktop && (
                <button
                  type="button"
                  className="toolbar-btn toolbar-btn--labeled toolbar-btn--preview"
                  onClick={() => setShowMobilePreview(true)}
                  aria-label="Preview CV"
                >
                  <Eye size={16} aria-hidden="true" />
                  <span>Preview</span>
                </button>
              )}

              {hasContent && (
                <button type="button" className="toolbar-btn toolbar-btn--muted" onClick={clearForm} aria-label="Clear all fields">
                  <RotateCcw size={16} aria-hidden="true" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>
        </header>

        <FormProgressHead formData={formData} />

        <SectionNavPills
          formData={formData}
          activeSection={activeSection}
          onSelectSection={handleSectionSelect}
        />

        <div className="form-scroll">
          <FormColumns
            formData={formData}
            collapsed={collapsed}
            toggleSection={handleToggleSection}
            handleChange={handleChange}
            handleArrayChange={handleArrayChange}
            addItem={handleAddItem}
            removeItem={removeItem}
          />
        </div>

        {isDesktop && canDownload && (
          <footer className="form-footer u-safe-bottom">
            <button type="button" className="download-btn" onClick={downloadPDF}>
              <Download size={18} aria-hidden="true" />
              Download PDF
            </button>
          </footer>
        )}
      </div>

      {/* Mobile preview modal */}
      <div
        className={`preview-container ${showMobilePreview ? 'show' : ''}`}
        role="dialog"
        aria-modal={showMobilePreview ? 'true' : undefined}
        aria-label="CV preview"
        hidden={!showMobilePreview && !isDesktop}
      >
        {!isDesktop && showMobilePreview && (
          <CVPreview
            {...previewProps}
            isModal={true}
            onClose={() => setShowMobilePreview(false)}
            onDownload={canDownload ? downloadPDF : undefined}
          />
        )}
      </div>

      {/* Desktop inline preview */}
      {isDesktop && (
        <CVPreview {...previewProps} isModal={false} />
      )}
    </div>
  )
}

export default CVForm
