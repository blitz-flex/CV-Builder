import { User, Briefcase, GraduationCap, BookOpen, FolderGit2 } from 'lucide-react'

function CVRightColumn({ formData, accentColor }) {
  return (
    <div className="cv-right-column">
      {formData.profile && (
        <div className="cv-block">
          <h3 style={{ color: accentColor }}><User size={16} /> Profile</h3>
          <p>{formData.profile}</p>
        </div>
      )}

      {formData.workExperience.some(item => item.title || item.company) && (
        <div className="cv-block">
          <h3 style={{ color: accentColor }}><Briefcase size={16} /> Work Experience</h3>
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

      {formData.training.some(item => item.title) && (
        <div className="cv-block">
          <h3 style={{ color: accentColor }}><BookOpen size={16} /> Training & Certifications</h3>
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
          <h3 style={{ color: accentColor }}><FolderGit2 size={16} /> Projects</h3>
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
  )
}

export default CVRightColumn
