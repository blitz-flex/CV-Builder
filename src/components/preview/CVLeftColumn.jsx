import { User, Mail, Phone, Linkedin, Github, Languages as LanguagesIcon, Award, GraduationCap } from 'lucide-react'

function CVLeftColumn({ formData, accentColor }) {
  return (
    <div className="cv-left-column">
      <div className="cv-block">
        <h3 style={{ color: accentColor }}><User size={16} /> Personal Info</h3>
        {formData.email && <p><Mail size={14} /> {formData.email}</p>}
        {formData.phone && <p><Phone size={14} /> {formData.phone}</p>}
        {formData.linkedin && <p><Linkedin size={14} /> <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className="link">LinkedIn</a></p>}
        {formData.github && <p><Github size={14} /> <a href={formData.github} target="_blank" rel="noopener noreferrer" className="link">GitHub</a></p>}
      </div>

      {formData.education.some(item => item.degree) && (
        <div className="cv-block">
          <h3 style={{ color: accentColor }}><GraduationCap size={16} /> Education</h3>
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

      {formData.languages.some(item => item.name) && (
        <div className="cv-block">
          <h3 style={{ color: accentColor }}><LanguagesIcon size={16} /> Languages</h3>
          <p>{formData.languages.filter(item => item.name).map(item => item.name).join(', ')}</p>
        </div>
      )}

      {formData.skills.some(item => item.name) && (
        <div className="cv-block">
          <h3 style={{ color: accentColor }}><Award size={16} /> Skills</h3>
          <p>{formData.skills.filter(item => item.name).map(item => item.name).join(', ')}</p>
        </div>
      )}

      {formData.programs.some(item => item.name) && (
        <div className="cv-block">
          <h3 style={{ color: accentColor }}><Award size={16} /> Programs & Software</h3>
          <p>{formData.programs.filter(item => item.name).map(item => item.name).join(', ')}</p>
        </div>
      )}
    </div>
  )
}

export default CVLeftColumn
