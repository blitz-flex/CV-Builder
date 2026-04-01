function CVLeftColumn({ formData, accentColor }) {
  return (
    <div className="cv-side-blocks">
      {/* 1. Education - Higher priority in the side column if main is full of work */}
      {formData.education.some(item => item.degree) && (
        <div className="cv-block">
          <h3>EDUCATION</h3>
          {formData.education.map((item, index) => (
            item.degree ? (
              <div key={index} className="edu-item">
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

      {/* 2. Skills - Core competency section */}
      {formData.skills.some(item => item.name) && (
        <div className="cv-block">
          <h3>SKILLS</h3>
          <div className="skills-grid">
            {formData.skills.filter(item => item.name).map((item, index) => (
              <span key={index} className="skill-badge">
                {item.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 3. Programs & Software - Technical toolset */}
      {formData.programs.some(item => item.name) && (
        <div className="cv-block">
          <h3>PROGRAMS & SOFTWARE</h3>
          <div className="skills-grid">
            {formData.programs.filter(item => item.name).map((item, index) => (
              <span key={index} className="skill-badge">
                {item.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 4. Courses & Training - Professional development */}
      {formData.training.some(item => item.title) && (
        <div className="cv-block">
          <h3>COURSES & TRAINING</h3>
          {formData.training.map((item, index) => (
            item.title ? (
              <div key={index} className="training-item">
                <h4>{item.title}</h4>
                <p className="period" style={{ color: accentColor }}>{item.period}</p>
                {item.description && <p className="description">{item.description}</p>}
              </div>
            ) : null
          ))}
        </div>
      )}

      {/* 5. Languages - Foundational skills */}
      {formData.languages.some(item => item.name) && (
        <div className="cv-block">
          <h3>LANGUAGES</h3>
          {formData.languages.filter(item => item.name).map((item, index) => (
            <div key={index} className="language-item">
              <span className="lang-name">{item.name}</span>
              <span className="lang-level" style={{ color: accentColor }}>{item.level || 'Native or Bilingual Proficiency'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CVLeftColumn
