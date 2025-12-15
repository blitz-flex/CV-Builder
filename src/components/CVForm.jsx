import { useState, useRef } from 'react'
import { Palette } from 'lucide-react'
import CVPreview from './preview/CVPreview'
import DesignModal from './shared/DesignModal'
import FormColumns from './shared/FormColumns'
import { DEFAULT_FONT } from '../config/fonts'
import { DEFAULT_ACCENT_COLOR } from '../config/colors'
import { FORM_TEMPLATES, INITIAL_FORM_DATA, INITIAL_COLLAPSED_STATE } from '../config/formTemplates'
import { generatePDF } from '../utils/pdfGenerator'
import '../styles/CVForm.css'

function CVForm() {
  const cvRef = useRef()
  const [accentColor, setAccentColor] = useState(DEFAULT_ACCENT_COLOR)
  const [selectedFont, setSelectedFont] = useState(DEFAULT_FONT)
  const [showDesignModal, setShowDesignModal] = useState(false)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [collapsed, setCollapsed] = useState(INITIAL_COLLAPSED_STATE)

  const toggleSection = (section) => {
    setCollapsed({ ...collapsed, [section]: !collapsed[section] })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleArrayChange = (section, index, field, value) => {
    const newArray = [...formData[section]]
    newArray[index][field] = value
    setFormData({ ...formData, [section]: newArray })
  }

  const addItem = (section) => {
    setFormData({ ...formData, [section]: [...formData[section], { ...FORM_TEMPLATES[section] }] })
    setCollapsed({ ...collapsed, [section]: false })
  }

  const removeItem = (section, index) => {
    if (formData[section].length > 1) {
      const newArray = formData[section].filter((_, i) => i !== index)
      setFormData({ ...formData, [section]: newArray })
    }
  }

  const downloadPDF = () => {
    generatePDF(cvRef.current, formData.fullName || 'CV')
  }

  return (
    <div className="cv-builder">
      <div className="form-side">
        <div className="form-header">
          <h2>Create Your CV</h2>
          <button className="design-btn" onClick={() => setShowDesignModal(true)}>
            <Palette size={20} /> Design
          </button>
        </div>

        <DesignModal
          show={showDesignModal}
          onClose={() => setShowDesignModal(false)}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
        />
        
        <FormColumns
          formData={formData}
          collapsed={collapsed}
          toggleSection={toggleSection}
          handleChange={handleChange}
          handlePhotoUpload={handlePhotoUpload}
          handleArrayChange={handleArrayChange}
          addItem={addItem}
          removeItem={removeItem}
        />

        <button className="download-btn" onClick={downloadPDF}>Download PDF</button>
      </div>

      <CVPreview 
        formData={formData}
        accentColor={accentColor}
        selectedFont={selectedFont}
        cvRef={cvRef}
      />
    </div>
  )
}
export default CVForm
