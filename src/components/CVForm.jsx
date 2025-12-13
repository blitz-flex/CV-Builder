import { useState, useRef } from 'react'
import { User, ChevronDown, ChevronUp, Plus, Trash2, Mail, Phone, Linkedin, Github, Languages, Award, Briefcase, GraduationCap, BookOpen, FolderGit2 } from 'lucide-react'
import html2pdf from 'html2pdf.js'
import '../styles/CVForm.css'

function CVForm() {
  const cvRef = useRef()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    profile: '',
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
        <h2>Create Your CV</h2>
        
        <div className="form-columns">
          <div className="form-column">
            <div className="form-section">
              <h3>Personal Information</h3>
              <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
              <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn URL" />
              <input name="github" value={formData.github} onChange={handleChange} placeholder="GitHub URL" />
            </div>

            <div className="form-section collapsible">
              <div className="section-header" onClick={() => toggleSection('languages')}>
                <h3>Languages</h3>
                {collapsed.languages ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </div>
              {!collapsed.languages && (
                <>
                  {formData.languages.map((item, index) => (
                    <div key={index} className="array-item">
                      <input value={item.name} onChange={(e) => handleArrayChange('languages', index, 'name', e.target.value)} placeholder="Language" />
                      {formData.languages.length > 1 && (
                        <button type="button" className="remove-btn" onClick={() => removeItem('languages', index)}>
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="add-btn" onClick={() => addItem('languages')}>
                    <Plus size={16} /> Add Language
                  </button>
                </>
              )}
            </div>

            <div className="form-section collapsible">
              <div className="section-header" onClick={() => toggleSection('skills')}>
                <h3>Skills</h3>
                {collapsed.skills ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </div>
              {!collapsed.skills && (
                <>
                  {formData.skills.map((item, index) => (
                    <div key={index} className="array-item">
                      <input value={item.name} onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)} placeholder="Skill" />
                      {formData.skills.length > 1 && (
                        <button type="button" className="remove-btn" onClick={() => removeItem('skills', index)}>
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="add-btn" onClick={() => addItem('skills')}>
                    <Plus size={16} /> Add Skill
                  </button>
                </>
              )}
            </div>

            <div className="form-section collapsible">
              <div className="section-header" onClick={() => toggleSection('programs')}>
                <h3>Programs & Software</h3>
                {collapsed.programs ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </div>
              {!collapsed.programs && (
                <>
                  {formData.programs.map((item, index) => (
                    <div key={index} className="array-item">
                      <input value={item.name} onChange={(e) => handleArrayChange('programs', index, 'name', e.target.value)} placeholder="Program" />
                      {formData.programs.length > 1 && (
                        <button type="button" className="remove-btn" onClick={() => removeItem('programs', index)}>
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="add-btn" onClick={() => addItem('programs')}>
                    <Plus size={16} /> Add Program
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="form-column">
            <div className="form-section">
              <h3>Profile</h3>
              <textarea name="profile" value={formData.profile} onChange={handleChange} placeholder="Profile/Summary" rows="3" />
            </div>

            <div className="form-section collapsible">
              <div className="section-header" onClick={() => toggleSection('workExperience')}>
                <h3>Work Experience</h3>
                {collapsed.workExperience ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </div>
              {!collapsed.workExperience && (
                <>
                  {formData.workExperience.map((item, index) => (
                    <div key={index} className="array-item">
                      <input value={item.period} onChange={(e) => handleArrayChange('workExperience', index, 'period', e.target.value)} placeholder="Period" />
                      <input value={item.title} onChange={(e) => handleArrayChange('workExperience', index, 'title', e.target.value)} placeholder="Job Title" />
                      <input value={item.company} onChange={(e) => handleArrayChange('workExperience', index, 'company', e.target.value)} placeholder="Company" />
                      <textarea value={item.description} onChange={(e) => handleArrayChange('workExperience', index, 'description', e.target.value)} placeholder="Description" rows="2" />
                      {formData.workExperience.length > 1 && (
                        <button type="button" className="remove-btn" onClick={() => removeItem('workExperience', index)}>
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="add-btn" onClick={() => addItem('workExperience')}>
                    <Plus size={16} /> Add Experience
                  </button>
                </>
              )}
            </div>

            <div className="form-section collapsible">
              <div className="section-header" onClick={() => toggleSection('education')}>
                <h3>Education</h3>
                {collapsed.education ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </div>
              {!collapsed.education && (
                <>
                  {formData.education.map((item, index) => (
                    <div key={index} className="array-item">
                      <input value={item.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} placeholder="Degree" />
                      <input value={item.period} onChange={(e) => handleArrayChange('education', index, 'period', e.target.value)} placeholder="Period" />
                      {formData.education.length > 1 && (
                        <button type="button" className="remove-btn" onClick={() => removeItem('education', index)}>
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="add-btn" onClick={() => addItem('education')}>
                    <Plus size={16} /> Add Education
                  </button>
                </>
              )}
            </div>

            <div className="form-section collapsible">
              <div className="section-header" onClick={() => toggleSection('training')}>
                <h3>Training & Certifications</h3>
                {collapsed.training ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </div>
              {!collapsed.training && (
                <>
                  {formData.training.map((item, index) => (
                    <div key={index} className="array-item">
                      <input value={item.title} onChange={(e) => handleArrayChange('training', index, 'title', e.target.value)} placeholder="Title" />
                      <input value={item.period} onChange={(e) => handleArrayChange('training', index, 'period', e.target.value)} placeholder="Period" />
                      {formData.training.length > 1 && (
                        <button type="button" className="remove-btn" onClick={() => removeItem('training', index)}>
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="add-btn" onClick={() => addItem('training')}>
                    <Plus size={16} /> Add Training
                  </button>
                </>
              )}
            </div>

            <div className="form-section collapsible">
              <div className="section-header" onClick={() => toggleSection('projects')}>
                <h3>Projects</h3>
                {collapsed.projects ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </div>
              {!collapsed.projects && (
                <>
                  {formData.projects.map((item, index) => (
                    <div key={index} className="array-item">
                      <input value={item.title} onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)} placeholder="Project Title" />
                      <textarea value={item.description} onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)} placeholder="Description" rows="2" />
                      {formData.projects.length > 1 && (
                        <button type="button" className="remove-btn" onClick={() => removeItem('projects', index)}>
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="add-btn" onClick={() => addItem('projects')}>
                    <Plus size={16} /> Add Project
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <button className="download-btn" onClick={downloadPDF}>Download PDF</button>
      </div>

      <div className="preview-side">
        <div className="cv-preview" ref={cvRef}>
          <div className="cv-header">
            <h1>{formData.fullName || 'Your Name'}</h1>
            <div className="cv-photo">
              <User size={60} />
            </div>
          </div>

          <div className="cv-columns">
            <div className="cv-left-column">
              <div className="cv-block">
                <h3><User size={16} /> Personal Info</h3>
                {formData.email && <p><Mail size={14} /> {formData.email}</p>}
                {formData.phone && <p><Phone size={14} /> {formData.phone}</p>}
                {formData.linkedin && <p><Linkedin size={14} /> <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className="link">LinkedIn</a></p>}
                {formData.github && <p><Github size={14} /> <a href={formData.github} target="_blank" rel="noopener noreferrer" className="link">GitHub</a></p>}
              </div>

              {formData.languages.some(item => item.name) && (
                <div className="cv-block">
                  <h3><Languages size={16} /> Languages</h3>
                  <p>{formData.languages.filter(item => item.name).map(item => item.name).join(', ')}</p>
                </div>
              )}

              {formData.skills.some(item => item.name) && (
                <div className="cv-block">
                  <h3><Award size={16} /> Skills</h3>
                  <p>{formData.skills.filter(item => item.name).map(item => item.name).join(', ')}</p>
                </div>
              )}

              {formData.programs.some(item => item.name) && (
                <div className="cv-block">
                  <h3><Award size={16} /> Programs & Software</h3>
                  <p>{formData.programs.filter(item => item.name).map(item => item.name).join(', ')}</p>
                </div>
              )}
            </div>

            <div className="cv-right-column">
              {formData.profile && (
                <div className="cv-block">
                  <h3><User size={16} /> Profile</h3>
                  <p>{formData.profile}</p>
                </div>
              )}

              {formData.workExperience.some(item => item.title || item.company) && (
                <div className="cv-block">
                  <h3><Briefcase size={16} /> Work Experience</h3>
                  {formData.workExperience.map((item, index) => (
                    item.title || item.company ? (
                      <div key={index} className="exp-item">
                        <p className="period">{item.period}</p>
                        <h4>{item.title}</h4>
                        <p className="company">{item.company}</p>
                        <p>{item.description}</p>
                      </div>
                    ) : null
                  ))}
                </div>
              )}

              {formData.education.some(item => item.degree) && (
                <div className="cv-block">
                  <h3><GraduationCap size={16} /> Education</h3>
                  {formData.education.map((item, index) => (
                    item.degree ? (
                      <div key={index}>
                        <p>{item.degree}</p>
                        <p className="period">{item.period}</p>
                      </div>
                    ) : null
                  ))}
                </div>
              )}

              {formData.training.some(item => item.title) && (
                <div className="cv-block">
                  <h3><BookOpen size={16} /> Training & Certifications</h3>
                  {formData.training.map((item, index) => (
                    item.title ? (
                      <div key={index}>
                        <p>{item.title}</p>
                        <p className="period">{item.period}</p>
                      </div>
                    ) : null
                  ))}
                </div>
              )}

              {formData.projects.some(item => item.title) && (
                <div className="cv-block">
                  <h3><FolderGit2 size={16} /> Projects</h3>
                  {formData.projects.map((item, index) => (
                    item.title ? (
                      <div key={index}>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                      </div>
                    ) : null
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CVForm
