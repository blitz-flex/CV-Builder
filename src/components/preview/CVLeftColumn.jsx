import {
  hasText,
  itemHasAny,
  arrayHasAny,
  EDUCATION_FIELDS,
  TRAINING_FIELDS,
  LANGUAGE_FIELDS
} from '../../utils/cvHelpers'
import { isSidebarLayout, isCompactFooterLayout } from '../../utils/cvLayoutHelpers'
import CVContactItems from './CVContactItems'

function CVLeftColumn({ formData, accentColor, layoutVariant = 'classic' }) {
  const contactInSidebar = isSidebarLayout(layoutVariant)
  const compactFooter = isCompactFooterLayout(layoutVariant)
  const hasEducation = arrayHasAny(formData.education, EDUCATION_FIELDS)
  const hasSkills = arrayHasAny(formData.skills, ['name'])
  const hasPrograms = arrayHasAny(formData.programs, ['name'])
  const hasTraining = arrayHasAny(formData.training, TRAINING_FIELDS)
  const hasLanguages = arrayHasAny(formData.languages, LANGUAGE_FIELDS)
  const hasContact = contactInSidebar && !!(
    hasText(formData.email) ||
    hasText(formData.phone) ||
    hasText(formData.location) ||
    hasText(formData.linkedin) ||
    hasText(formData.github)
  )

  if (!hasContact && !hasEducation && !hasSkills && !hasPrograms && !hasTraining && !hasLanguages) {
    return null
  }

  const contactBlock = hasContact ? (
    <CVContactItems formData={formData} className="cv-side-contact" />
  ) : null

  const educationBlock = hasEducation ? (
    <div className="cv-block">
      <h3>EDUCATION</h3>
      {formData.education.map((item, index) => (
        itemHasAny(item, EDUCATION_FIELDS) ? (
          <div key={index} className="edu-item">
            <div className="edu-content">
              {hasText(item.degree) && <h4>{item.degree}</h4>}
              {hasText(item.school) && (
                <p className={hasText(item.degree) ? 'school' : 'edu-primary'}>{item.school}</p>
              )}
              {hasText(item.period) && (
                <p className="period" style={{ color: accentColor }}>{item.period}</p>
              )}
            </div>
          </div>
        ) : null
      ))}
    </div>
  ) : null

  const skillsBlock = hasSkills ? (
    <div className="cv-block">
      <h3>SKILLS</h3>
      <div className="skills-grid">
        {formData.skills.filter((item) => hasText(item.name)).map((item, index) => (
          <span key={index} className="skill-badge">{item.name.trim()}</span>
        ))}
      </div>
    </div>
  ) : null

  const programsBlock = hasPrograms ? (
    <div className="cv-block">
      <h3>PROGRAMS & SOFTWARE</h3>
      <div className="skills-grid">
        {formData.programs.filter((item) => hasText(item.name)).map((item, index) => (
          <span key={index} className="skill-badge">{item.name.trim()}</span>
        ))}
      </div>
    </div>
  ) : null

  const trainingBlock = hasTraining ? (
    <div className="cv-block">
      <h3>COURSES & TRAINING</h3>
      {formData.training.map((item, index) => (
        itemHasAny(item, TRAINING_FIELDS) ? (
          <div key={index} className="training-item">
            {hasText(item.title) && <h4>{item.title}</h4>}
            {hasText(item.period) && (
              <p className="period" style={{ color: accentColor }}>{item.period}</p>
            )}
            {hasText(item.description) && <p className="description">{item.description}</p>}
          </div>
        ) : null
      ))}
    </div>
  ) : null

  const languagesBlock = hasLanguages ? (
    <div className="cv-block">
      <h3>LANGUAGES</h3>
      {formData.languages.filter((item) => itemHasAny(item, LANGUAGE_FIELDS)).map((item, index) => (
        <div key={index} className="language-item">
          {hasText(item.name) && <span className="lang-name">{item.name.trim()}</span>}
          {hasText(item.level) && (
            <span className="lang-level" style={{ color: accentColor }}>{item.level.trim()}</span>
          )}
        </div>
      ))}
    </div>
  ) : null

  if (compactFooter) {
    return (
      <div className="cv-side-blocks cv-side-blocks--compact">
        <div className="cv-footer-col">
          {educationBlock}
          {programsBlock}
          {languagesBlock}
        </div>
        <div className="cv-footer-col">
          {skillsBlock}
          {trainingBlock}
        </div>
      </div>
    )
  }

  return (
    <div className="cv-side-blocks">
      {contactBlock}
      {educationBlock}
      {skillsBlock}
      {programsBlock}
      {trainingBlock}
      {languagesBlock}
    </div>
  )
}

export default CVLeftColumn
