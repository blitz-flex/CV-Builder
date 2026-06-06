import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import { FileText, X, Maximize2, ZoomIn, ZoomOut, Download } from 'lucide-react'
import CVPreviewDocument from './CVPreviewDocument'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useSwipeDismiss } from '../../hooks/useSwipeDismiss'
import '../../styles/editor/CVPreview.css'

const ZOOM_LEVELS = [
  { id: 'fit', label: 'Fit', icon: Maximize2 },
  { id: 1, label: '100%', icon: null },
  { id: 0.85, label: '85%', icon: ZoomOut },
  { id: 1.15, label: '115%', icon: ZoomIn }
]

const PREVIEW_STEPS = [
  'Complete Personal Info to begin your document',
  'Add experience, education, and skills section by section',
  'Your formatted A4 résumé appears here in real time'
]

function CVPreview({
  formData,
  accentColor,
  selectedFont,
  cvRef,
  isModal,
  isEmpty,
  onClose,
  onDownload,
  layoutVariant = 'classic',
  templateId = '',
  templateName = 'CV'
}) {
  const canvasRef = useRef(null)
  const docRef = useRef(null)
  const [zoom, setZoom] = useState('fit')
  const [fitScale, setFitScale] = useState(1)
  const [docSize, setDocSize] = useState({ w: 0, h: 0 })

  const focusTrapRef = useFocusTrap(isModal && !!onClose)
  const { panelRef: swipeRef, handlers: swipeHandlers } = useSwipeDismiss({
    onDismiss: onClose,
    enabled: isModal && !!onClose
  })

  const mergeRefs = useCallback((node) => {
    focusTrapRef.current = node
    swipeRef.current = node
  }, [focusTrapRef, swipeRef])

  useLayoutEffect(() => {
    if (cvRef) {
      cvRef.current = docRef.current
    }
  })

  const measureFit = useCallback(() => {
    if (isEmpty) return

    const canvas = canvasRef.current
    const doc = docRef.current
    if (!canvas || !doc) return

    const pad = 48
    const available = canvas.clientWidth - pad
    const docWidth = doc.offsetWidth
    const docHeight = Math.max(doc.scrollHeight, doc.offsetHeight)

    if (docWidth <= 0 || docHeight <= 0) {
      requestAnimationFrame(measureFit)
      return
    }

    const nextScale = zoom === 'fit'
      ? Math.min(1, Math.max(0.35, available / docWidth))
      : zoom

    setFitScale(nextScale)
    setDocSize({ w: docWidth, h: docHeight })
  }, [isEmpty, zoom])

  useLayoutEffect(() => {
    if (isEmpty) {
      setDocSize({ w: 0, h: 0 })
      return undefined
    }

    measureFit()

    const canvas = canvasRef.current
    const doc = docRef.current
    if (!canvas || !doc) return undefined

    const ro = new ResizeObserver(measureFit)
    ro.observe(canvas)
    ro.observe(doc)
    return () => ro.disconnect()
  }, [measureFit, formData, isEmpty, layoutVariant, accentColor, selectedFont])

  useEffect(() => {
    if (zoom === 'fit' && !isEmpty) measureFit()
  }, [zoom, measureFit, isEmpty])

  // Escape key closes modal
  useEffect(() => {
    if (!isModal || !onClose) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isModal, onClose])

  const scale = zoom === 'fit' ? fitScale : zoom
  const scaledW = docSize.w * scale
  const isMeasured = docSize.w > 0 && docSize.h > 0

  const documentProps = {
    formData,
    accentColor,
    selectedFont,
    layoutVariant,
    templateId
  }

  const renderDocument = () => (
    <CVPreviewDocument cvRef={docRef} {...documentProps} />
  )

  return (
    <aside
      ref={mergeRefs}
      className={`preview-panel ${isModal ? 'preview-panel--modal' : 'preview-panel--inline'}`}
      {...(isModal ? swipeHandlers : {})}
    >
      {isModal && (
        <div className="preview-panel__swipe-hint" aria-hidden="true">
          <span className="preview-panel__swipe-bar" />
        </div>
      )}

      <header className="preview-panel__header">
        <div className="preview-panel__title-group">
          <div className="preview-panel__title">
            <FileText size={15} aria-hidden="true" />
            <span>Document Preview</span>
          </div>
          <span className={`preview-panel__status ${isEmpty ? 'preview-panel__status--draft' : 'preview-panel__status--live'}`}>
            {isEmpty ? 'Draft' : 'Live sync'}
          </span>
        </div>

        <div className="preview-panel__actions">
          {!isEmpty && (
            <div className="preview-panel__zoom" role="group" aria-label="Preview zoom">
              {ZOOM_LEVELS.map(({ id, label, icon: Icon }) => (
                <button
                  key={String(id)}
                  type="button"
                  className={`preview-panel__zoom-btn ${zoom === id ? 'is-active' : ''}`}
                  onClick={() => setZoom(id)}
                  aria-pressed={zoom === id}
                  title={label}
                >
                  {Icon ? <Icon size={14} /> : label}
                </button>
              ))}
            </div>
          )}
          {isModal && onClose && (
            <button type="button" className="preview-panel__close" onClick={onClose} aria-label="Close preview">
              <X size={18} />
            </button>
          )}
        </div>
      </header>

      <div
        className={`preview-panel__canvas${isEmpty ? ' preview-panel__canvas--idle' : ' preview-panel__canvas--live'}`}
        ref={canvasRef}
      >
        {isEmpty ? (
          <div className="preview-panel__idle">
            <div className="preview-panel__idle-icon" style={{ color: accentColor }}>
              <FileText size={28} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <p className="preview-panel__idle-eyebrow">A4 · Print-ready format</p>
            <h3 className="preview-panel__idle-title">Preview will appear here</h3>
            <p className="preview-panel__idle-desc">
              Selected style: <strong>{templateName}</strong>. Start entering your details in the
              editor on the left — your résumé builds here section by section.
            </p>
            <ul className="preview-panel__idle-steps">
              {PREVIEW_STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            <div className="preview-panel__doc-offscreen" aria-hidden="true">
              {renderDocument()}
            </div>
          </div>
        ) : (
          <>
            <div className="preview-panel__live-badge">
              <span className="preview-panel__live-style">{templateName}</span>
              <span className="preview-panel__live-format">A4 · Print-ready</span>
            </div>
            <div
              className="preview-panel__viewport"
              style={isMeasured ? { width: scaledW } : undefined}
            >
              <div
                className="preview-panel__stage"
                style={isMeasured ? {
                  width: docSize.w,
                  transform: `scale(${scale})`,
                  marginBottom: docSize.h * (scale - 1)
                } : undefined}
              >
                {renderDocument()}
              </div>
            </div>
          </>
        )}
      </div>

      {isModal && onDownload && (
        <footer className="preview-panel__footer u-safe-bottom">
          <button type="button" className="preview-panel__download" onClick={onDownload}>
            <Download size={18} aria-hidden="true" />
            Download PDF
          </button>
        </footer>
      )}
    </aside>
  )
}

export default CVPreview
