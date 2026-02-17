import CVHeader from './CVHeader'
import CVLeftColumn from './CVLeftColumn'
import CVRightColumn from './CVRightColumn'
import '../../styles/editor/CVPreview.css'

function CVPreview({ formData, accentColor, selectedFont, cvRef }) {
  return (
    <div className="preview-side">
      <div className="cv-preview" ref={cvRef} style={{ fontFamily: selectedFont }}>
        <div className="cv-inner">
          <CVHeader formData={formData} accentColor={accentColor} />
          <div className="cv-layout">
            <div className="cv-main-col">
              <CVRightColumn formData={formData} accentColor={accentColor} />
            </div>
            <div className="cv-side-col">
              <CVLeftColumn formData={formData} accentColor={accentColor} />
            </div>
          </div>
        </div>
        <div className="accent-line" style={{ backgroundColor: accentColor }}></div>
      </div>
    </div>
  )
}

export default CVPreview
