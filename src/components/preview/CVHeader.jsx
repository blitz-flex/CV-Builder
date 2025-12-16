import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react'

function CVHeader({ formData, accentColor }) {
  return (
    <div className="cv-header">
      <div className="header-left">
        <h1>{formData.fullName || 'Your Name'}</h1>
        <p className="job-title" style={{ color: accentColor }}>{formData.jobTitle || 'Professional Title'}</p>
      </div>
      <div className="header-right">
        {formData.email && <div className="contact-item"><Mail size={16} /> {formData.email}</div>}
        {formData.phone && <div className="contact-item"><Phone size={16} /> {formData.phoneCode || '+995'} {formData.phone}</div>}

        {formData.linkedin && <div className="contact-item"><Linkedin size={16} /> <a href={formData.linkedin.startsWith('http') ? formData.linkedin : `https://${formData.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a></div>}
        {formData.github && <div className="contact-item"><Github size={16} /> <a href={formData.github.startsWith('http') ? formData.github : `https://${formData.github}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a></div>}
      </div>
    </div>
  )
}

export default CVHeader
