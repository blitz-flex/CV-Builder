import { useState, useRef, useEffect } from 'react'
import { Palette, Eye, X } from 'lucide-react'
import CVPreview from './preview/CVPreview'
import DesignModal from './shared/DesignModal'
import FormColumns from './shared/FormColumns'
import { DEFAULT_FONT } from '../config/fonts'
import { DEFAULT_ACCENT_COLOR } from '../config/colors'
import { FORM_TEMPLATES, INITIAL_FORM_DATA, INITIAL_COLLAPSED_STATE } from '../config/formTemplates'
import { generatePDF } from '../utils/pdfGenerator'
import '../styles/editor/CVForm.css'

function CVForm() {
  const cvRef = useRef()
  const [accentColor, setAccentColor] = useState(DEFAULT_ACCENT_COLOR)
  const [selectedFont, setSelectedFont] = useState(DEFAULT_FONT)
  const [showDesignModal, setShowDesignModal] = useState(false)
  const [showMobilePreview, setShowMobilePreview] = useState(false)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [collapsed, setCollapsed] = useState(INITIAL_COLLAPSED_STATE)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024)

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
    <div className={`cv-builder ${showMobilePreview ? 'preview-active' : ''}`}>
      <div className="form-side">
        <div className="form-header">
          <h2>Create CV</h2>
          <button className="design-btn" onClick={() => setShowDesignModal(true)}>
            <Palette size={20} /> <span>Design</span>
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

        <button className="preview-fab" onClick={() => setShowMobilePreview(true)}>
          <Eye size={20} /> Preview CV
        </button>
      </div>

      <div className={`preview-container ${showMobilePreview ? 'show' : ''}`}>
        <button className="close-preview-btn" onClick={() => setShowMobilePreview(false)}>
          <X size={24} />
        </button>
        <CVPreview
          formData={formData}
          accentColor={accentColor}
          selectedFont={selectedFont}
          cvRef={cvRef}
          isModal={true}
        />
      </div>

      {isDesktop && (
        <CVPreview
          formData={formData}
          accentColor={accentColor}
          selectedFont={selectedFont}
          cvRef={cvRef}
          isModal={false}
        />
      )}
    </div>
  )
}
export default CVForm
