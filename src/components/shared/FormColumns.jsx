import PersonalInfo from '../form/PersonalInfo'
import Profile from '../form/Profile'
import WorkExperience from '../form/WorkExperience'
import Education from '../form/Education'
import Training from '../form/Training'
import Languages from '../form/Languages'
import Skills from '../form/Skills'
import Programs from '../form/Programs'
import Projects from '../form/Projects'
import FormSectionCard from './FormSectionCard'
import { FORM_SECTIONS } from '../../config/formSections'
import { isSectionFilled } from '../../utils/cvHelpers'
import '../../styles/editor/FormSections.css'

// Maps each section key to a renderer function.
// Adding a new section only requires one entry here.
const SECTION_RENDERERS = {
  personalInfo: ({ formData, handleChange }) =>
    <PersonalInfo formData={formData} onChange={handleChange} />,

  profile: ({ formData, handleChange }) =>
    <Profile value={formData.profile} onChange={handleChange} />,

  workExperience: ({ formData, handleArrayChange, addItem, removeItem }) =>
    <WorkExperience
      data={formData.workExperience}
      onChange={(i, f, v) => handleArrayChange('workExperience', i, f, v)}
      onAdd={() => addItem('workExperience')}
      onRemove={(i) => removeItem('workExperience', i)}
    />,

  education: ({ formData, handleArrayChange, addItem, removeItem }) =>
    <Education
      data={formData.education}
      onChange={(i, f, v) => handleArrayChange('education', i, f, v)}
      onAdd={() => addItem('education')}
      onRemove={(i) => removeItem('education', i)}
    />,

  skills: ({ formData, handleArrayChange, addItem, removeItem }) =>
    <Skills
      data={formData.skills}
      onChange={(i, f, v) => handleArrayChange('skills', i, f, v)}
      onAdd={() => addItem('skills')}
      onRemove={(i) => removeItem('skills', i)}
    />,

  programs: ({ formData, handleArrayChange, addItem, removeItem }) =>
    <Programs
      data={formData.programs}
      onChange={(i, f, v) => handleArrayChange('programs', i, f, v)}
      onAdd={() => addItem('programs')}
      onRemove={(i) => removeItem('programs', i)}
    />,

  languages: ({ formData, handleArrayChange, addItem, removeItem }) =>
    <Languages
      data={formData.languages}
      onChange={(i, f, v) => handleArrayChange('languages', i, f, v)}
      onAdd={() => addItem('languages')}
      onRemove={(i) => removeItem('languages', i)}
    />,

  training: ({ formData, handleArrayChange, addItem, removeItem }) =>
    <Training
      data={formData.training}
      onChange={(i, f, v) => handleArrayChange('training', i, f, v)}
      onAdd={() => addItem('training')}
      onRemove={(i) => removeItem('training', i)}
    />,

  projects: ({ formData, handleArrayChange, addItem, removeItem }) =>
    <Projects
      data={formData.projects}
      onChange={(i, f, v) => handleArrayChange('projects', i, f, v)}
      onAdd={() => addItem('projects')}
      onRemove={(i) => removeItem('projects', i)}
    />,
}

function FormColumns({ formData, collapsed, toggleSection, handleChange, handleArrayChange, addItem, removeItem }) {
  const rendererProps = { formData, handleChange, handleArrayChange, addItem, removeItem }

  return (
    <div className="form-sections-stack">
      {FORM_SECTIONS.map((section, index) => (
        <FormSectionCard
          key={section.key}
          id={`section-${section.key}`}
          index={index}
          label={section.label}
          short={section.short}
          icon={section.icon}
          collapsed={collapsed[section.key]}
          onToggle={() => toggleSection(section.key)}
          isFilled={isSectionFilled(section.key, formData)}
          hint={section.hint}
        >
          {SECTION_RENDERERS[section.key]?.(rendererProps)}
        </FormSectionCard>
      ))}
    </div>
  )
}

export default FormColumns
