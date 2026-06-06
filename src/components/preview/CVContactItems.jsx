import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react'
import { hasText } from '../../utils/cvHelpers'

function CVContactItems({ formData, className = '' }) {
  const hasAny = !!(
    hasText(formData.email) ||
    hasText(formData.phone) ||
    hasText(formData.location) ||
    hasText(formData.linkedin) ||
    hasText(formData.github)
  )

  if (!hasAny) return null

  return (
    <div className={`cv-contact-items ${className}`.trim()}>
      {hasText(formData.email) && (
        <div className="contact-item">
          <Mail size={14} /> <span>{formData.email}</span>
        </div>
      )}
      {hasText(formData.phone) && (
        <div className="contact-item">
          <Phone size={14} /> <span>{formData.phoneCode || '+995'} {formData.phone}</span>
        </div>
      )}
      {hasText(formData.location) && (
        <div className="contact-item">
          <MapPin size={14} /> <span>{formData.location}</span>
        </div>
      )}
      {hasText(formData.linkedin) && (
        <div className="contact-item">
          <Linkedin size={14} />
          <a href={formData.linkedin.startsWith('http') ? formData.linkedin : `https://${formData.linkedin}`} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      )}
      {hasText(formData.github) && (
        <div className="contact-item">
          <Github size={14} />
          <a href={formData.github.startsWith('http') ? formData.github : `https://${formData.github}`} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      )}
    </div>
  )
}

export default CVContactItems
