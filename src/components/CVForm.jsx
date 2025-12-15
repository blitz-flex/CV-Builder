import { useState, useRef } from 'react'
import { Palette } from 'lucide-react'
import html2pdf from 'html2pdf.js'
import PersonalInfo from './form/PersonalInfo'
import Profile from './form/Profile'
import WorkExperience from './form/WorkExperience'
import Education from './form/Education'
import Training from './form/Training'
import Languages from './form/Languages'
import Skills from './form/Skills'
import Programs from './form/Programs'
import Projects from './form/Projects'
import CVPreview from './preview/CVPreview'
import '../styles/CVForm.css'

function CVForm() {
  const cvRef = useRef()
  const [accentColor, setAccentColor] = useState('#2563eb')
  const [selectedFont, setSelectedFont] = useState('Arial')
  const [showDesignModal, setShowDesignModal] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    profile: '',
    photo: null,
    workExperience: [{ period: '', title: '', company: '', description: '' }],
    education: [{ degree: '', period: '' }],
    training: [{ title: '', period: '' }],
    languages: [{ name: '' }],
    skills: [{ name: '' }],
    programs: [{ name: '' }],
    projects: [{ title: '', description: '' }]
  })

  const [collapsed, setCollapsed] = useState({
    education: false,
    workExperience: false,
    training: false,
    languages: false,
    skills: false,
    programs: false,
    projects: false
  })

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
    const templates = {
      workExperience: { period: '', title: '', company: '', description: '' },
      education: { degree: '', period: '' },
      training: { title: '', period: '' },
      languages: { name: '' },
      skills: { name: '' },
      programs: { name: '' },
      projects: { title: '', description: '' }
    }
    setFormData({ ...formData, [section]: [...formData[section], templates[section]] })
  }

  const removeItem = (section, index) => {
    const newArray = formData[section].filter((_, i) => i !== index)
    setFormData({ ...formData, [section]: newArray })
  }

  const downloadPDF = () => {
    const element = cvRef.current
    const opt = {
      margin: 0,
      filename: `${formData.fullName || 'CV'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    html2pdf().set(opt).from(element).save()
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

        {showDesignModal && (
          <div className="modal-overlay-left" onClick={() => setShowDesignModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3><Palette size={24} /> Customize Design</h3>
              <div className="design-options">
                <div className="option">
                  <label>Theme Color</label>
                  <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
                </div>
                <div className="option">
                  <label>Font Family</label>
                  <select value={selectedFont} onChange={(e) => setSelectedFont(e.target.value)}>
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Calibri">Calibri</option>
                    <option value="Roboto">Roboto</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="form-columns">
          <div className="form-column">
            <PersonalInfo 
              formData={formData} 
              onChange={handleChange} 
              onPhotoUpload={handlePhotoUpload} 
            />

            <Languages
              data={formData.languages}
              collapsed={collapsed.languages}
              onToggle={() => toggleSection('languages')}
              onChange={(index, field, value) => handleArrayChange('languages', index, field, value)}
              onAdd={() => addItem('languages')}
              onRemove={(index) => removeItem('languages', index)}
            />

            <Skills
              data={formData.skills}
              collapsed={collapsed.skills}
              onToggle={() => toggleSection('skills')}
              onChange={(index, field, value) => handleArrayChange('skills', index, field, value)}
              onAdd={() => addItem('skills')}
              onRemove={(index) => removeItem('skills', index)}
            />

            <Programs
              data={formData.programs}
              collapsed={collapsed.programs}
              onToggle={() => toggleSection('programs')}
              onChange={(index, field, value) => handleArrayChange('programs', index, field, value)}
              onAdd={() => addItem('programs')}
              onRemove={(index) => removeItem('programs', index)}
            />
          </div>

          <div className="form-column">
            <Profile 
              value={formData.profile} 
              onChange={handleChange} 
            />

            <WorkExperience
              data={formData.workExperience}
              collapsed={collapsed.workExperience}
              onToggle={() => toggleSection('workExperience')}
              onChange={(index, field, value) => handleArrayChange('workExperience', index, field, value)}
              onAdd={() => addItem('workExperience')}
              onRemove={(index) => removeItem('workExperience', index)}
            />

            <Education
              data={formData.education}
              collapsed={collapsed.education}
              onToggle={() => toggleSection('education')}
              onChange={(index, field, value) => handleArrayChange('education', index, field, value)}
              onAdd={() => addItem('education')}
              onRemove={(index) => removeItem('education', index)}
            />

            <Training
              data={formData.training}
              collapsed={collapsed.training}
              onToggle={() => toggleSection('training')}
              onChange={(index, field, value) => handleArrayChange('training', index, field, value)}
              onAdd={() => addItem('training')}
              onRemove={(index) => removeItem('training', index)}
            />

            <Projects
              data={formData.projects}
              collapsed={collapsed.projects}
              onToggle={() => toggleSection('projects')}
              onChange={(index, field, value) => handleArrayChange('projects', index, field, value)}
              onAdd={() => addItem('projects')}
              onRemove={(index) => removeItem('projects', index)}
            />
          </div>
        </div>

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
