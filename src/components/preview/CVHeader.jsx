import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react'

function CVHeader({ formData, accentColor }) {
  return (
    <div className="cv-header">
      <div className="h-main">
        <h1>{formData.fullName || 'Your Name'}</h1>
        <div className="h-divider" style={{ backgroundColor: accentColor }}></div>
        <p className="job-title">{formData.jobTitle || 'Professional Title'}</p>
      </div>
      <div className="h-contact">
        {formData.email && (
          <div className="contact-item">
            <Mail size={14} /> <span>{formData.email}</span>
          </div>
        )}
        {formData.phone && (
          <div className="contact-item">
            <Phone size={14} /> <span>{formData.phoneCode || '+995'} {formData.phone}</span>
          </div>
        )}
        {formData.linkedin && (
          <div className="contact-item">
            <Linkedin size={14} />
            <a href={formData.linkedin.startsWith('http') ? formData.linkedin : `https://${formData.linkedin}`} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        )}
        {formData.github && (
          <div className="contact-item">
            <Github size={14} />
            <a href={formData.github.startsWith('http') ? formData.github : `https://${formData.github}`} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default CVHeader
