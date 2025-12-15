import CVHeader from './CVHeader'
import CVLeftColumn from './CVLeftColumn'
import CVRightColumn from './CVRightColumn'

function CVPreview({ formData, accentColor, selectedFont, cvRef }) {
  return (
    <div className="preview-side">
      <div className="cv-preview" ref={cvRef} style={{ fontFamily: selectedFont }}>
        <CVHeader 
          fullName={formData.fullName}
          photo={formData.photo}
          accentColor={accentColor}
        />
        
        <div className="cv-columns">
          <CVLeftColumn formData={formData} accentColor={accentColor} />
          <CVRightColumn formData={formData} accentColor={accentColor} />
        </div>
      </div>
    </div>
  )
}

export default CVPreview
