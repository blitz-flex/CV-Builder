import { useState } from 'react'
import '../styles/CVForm.css'

function CVForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experience: '',
    education: '',
    skills: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="cv-builder">
      <div className="form-side">
        <h2>Create Your CV</h2>
        
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="name Surname"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+999 999 999 9999"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, Country"
          />
        </div>

        <div className="form-group">
          <label>Professional Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Brief summary about yourself..."
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Work Experience</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Education</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            
          />
        </div>

        <div className="form-group">
          <label>Skills</label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            
          />
        </div>

        <button className="download-btn">Download PDF</button>
      </div>

      <div className="preview-side">
        <div className="cv-preview">
          <div className="cv-header">
            <h1>{formData.fullName || 'Your Name'}</h1>
            <div className="cv-contact">
              {formData.email && <span>{formData.email}</span>}
              {formData.phone && <span>{formData.phone}</span>}
              {formData.location && <span>{formData.location}</span>}
            </div>
          </div>

          {formData.summary && (
            <div className="cv-block">
              <h3>Summary</h3>
              <p>{formData.summary}</p>
            </div>
          )}

          {formData.experience && (
            <div className="cv-block">
              <h3>Experience</h3>
              <p>{formData.experience}</p>
            </div>
          )}

          {formData.education && (
            <div className="cv-block">
              <h3>Education</h3>
              <p>{formData.education}</p>
            </div>
          )}

          {formData.skills && (
            <div className="cv-block">
              <h3>Skills</h3>
              <p>{formData.skills}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CVForm
