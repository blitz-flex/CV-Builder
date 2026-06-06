import { useRef, useState, useLayoutEffect, useCallback } from 'react'
import CVPreviewDocument from './CVPreviewDocument'

function TemplatePreview({ formData, accentColor, selectedFont, layoutVariant, templateId }) {
  const canvasRef = useRef(null)
  const docRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [docSize, setDocSize] = useState({ w: 0, h: 0 })

  const measureFit = useCallback(() => {
    const canvas = canvasRef.current
    const doc = docRef.current
    if (!canvas || !doc) return

    const pad = 32
    const available = canvas.clientWidth - pad
    const docWidth = doc.offsetWidth
    const docHeight = Math.max(doc.scrollHeight, doc.offsetHeight)

    if (docWidth <= 0 || docHeight <= 0) {
      requestAnimationFrame(measureFit)
      return
    }

    setScale(Math.min(1, Math.max(0.4, available / docWidth)))
    setDocSize({ w: docWidth, h: docHeight })
  }, [])

  useLayoutEffect(() => {
    measureFit()

    const canvas = canvasRef.current
    const doc = docRef.current
    if (!canvas || !doc) return undefined

    const ro = new ResizeObserver(measureFit)
    ro.observe(canvas)
    ro.observe(doc)
    return () => ro.disconnect()
  }, [measureFit, formData, layoutVariant, accentColor, selectedFont, templateId])

  const scaledW = docSize.w * scale
  const isMeasured = docSize.w > 0 && docSize.h > 0

  return (
    <div className="template-preview-side preview-side" ref={canvasRef}>
      <div
        className="template-preview-viewport"
        style={isMeasured ? { width: scaledW } : undefined}
      >
        <div
          className="template-preview-stage"
          style={isMeasured ? {
            width: docSize.w,
            transform: `scale(${scale})`,
            marginBottom: docSize.h * (scale - 1)
          } : undefined}
        >
          <CVPreviewDocument
            formData={formData}
            accentColor={accentColor}
            selectedFont={selectedFont}
            cvRef={docRef}
            layoutVariant={layoutVariant}
            templateId={templateId}
            className="cv-preview--template-sample"
          />
        </div>
      </div>
    </div>
  )
}

export default TemplatePreview
