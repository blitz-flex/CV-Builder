function CVRightColumn({ formData, accentColor }) {
  return (
    <div className="cv-main-blocks">
      {formData.profile && (
        <div className="cv-block">
          <p className="profile-text">{formData.profile}</p>
        </div>
      )}

      {formData.workExperience.some(item => item.title || item.company) && (
        <div className="cv-block">
          <h3>WORK EXPERIENCE</h3>
          {formData.workExperience.map((item, index) => (
            item.title || item.company ? (
              <div key={index} className="exp-item">
                <div className="exp-bar" style={{ backgroundColor: accentColor }}></div>
                <div className="exp-content">
                  <h4>{item.title}</h4>
                  <p className="company">{item.company}</p>
                  <p className="period" style={{ color: accentColor }}>{item.period}</p>
                  {item.description && (
                    <ul className="exp-description">
                      {item.description.split('\n').filter(line => line.trim()).map((line, i) => (
                        <li key={i}>{line.trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}

      {formData.education.some(item => item.degree) && (
        <div className="cv-block">
          <h3>EDUCATION</h3>
          {formData.education.map((item, index) => (
            item.degree ? (
              <div key={index} className="edu-item">
                <div className="exp-bar" style={{ backgroundColor: accentColor }}></div>
                <div className="edu-content">
                  <h4>{item.degree}</h4>
                  <p className="school">{item.school}</p>
                  <p className="period" style={{ color: accentColor }}>{item.period}</p>
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}

      {formData.projects.some(item => item.title) && (
        <div className="cv-block">
          <h3>PROJECTS</h3>
          {formData.projects.map((item, index) => (
            item.title ? (
              <div key={index} className="project-item">
                <h4>{item.title}</h4>
                {item.description && <p>{item.description}</p>}
                {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="project-link" style={{ color: accentColor }}>View Project</a>}
              </div>
            ) : null
          ))}
        </div>
      )}
    </div>
  )
}

export default CVRightColumn
