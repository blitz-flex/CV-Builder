import {
  hasText,
  itemHasAny,
  arrayHasAny,
  WORK_FIELDS,
  PROJECT_FIELDS
} from '../../utils/cvHelpers'

function CVRightColumn({ formData, accentColor }) {
  const hasProfile = hasText(formData.profile)
  const hasWork = arrayHasAny(formData.workExperience, WORK_FIELDS)
  const hasProjects = arrayHasAny(formData.projects, PROJECT_FIELDS)

  if (!hasProfile && !hasWork && !hasProjects) {
    return null
  }

  return (
    <div className="cv-main-blocks">
      {hasProfile && (
        <div className="cv-block">
          <h3>PROFILE SUMMARY</h3>
          <p className="profile-text">{formData.profile}</p>
        </div>
      )}

      {hasWork && (
        <div className="cv-block">
          <h3>WORK EXPERIENCE</h3>
          {formData.workExperience.map((item, index) => (
            itemHasAny(item, WORK_FIELDS) ? (
              <div key={index} className="exp-item">
                <div className="exp-bar" style={{ backgroundColor: accentColor }} />
                <div className="exp-content">
                  {hasText(item.title) && <h4>{item.title}</h4>}
                  {hasText(item.company) && <p className="company">{item.company}</p>}
                  {hasText(item.period) && (
                    <p className="period" style={{ color: accentColor }}>{item.period}</p>
                  )}
                  {hasText(item.description) && (
                    <ul className="exp-description">
                      {item.description.split('\n').filter((line) => line.trim()).map((line, i) => (
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

      {hasProjects && (
        <div className="cv-block">
          <h3>PROJECTS</h3>
          {formData.projects.map((item, index) => (
            itemHasAny(item, PROJECT_FIELDS) ? (
              <div key={index} className="project-item">
                {hasText(item.title) && <h4>{item.title}</h4>}
                {hasText(item.description) && <p>{item.description}</p>}
                {hasText(item.link) && (
                  <a
                    href={item.link.startsWith('http') ? item.link : `https://${item.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    style={{ color: accentColor }}
                  >
                    {item.link}
                  </a>
                )}
              </div>
            ) : null
          ))}
        </div>
      )}
    </div>
  )
}

export default CVRightColumn
