import PersonalInfo from '../form/PersonalInfo'
import Profile from '../form/Profile'
import WorkExperience from '../form/WorkExperience'
import Education from '../form/Education'
import Training from '../form/Training'
import Languages from '../form/Languages'
import Skills from '../form/Skills'
import Programs from '../form/Programs'
import Projects from '../form/Projects'
import FormSection from './FormSection'
import '../../styles/editor/FormSections.css'

function FormColumns({ formData, collapsed, toggleSection, handleChange, handlePhotoUpload, handleArrayChange, addItem, removeItem }) {
  return (
    <div className="form-columns">
      <div className="form-column">
        <PersonalInfo
          formData={formData}
          onChange={handleChange}
          onPhotoUpload={handlePhotoUpload}
          collapsed={collapsed.personalInfo}
          onToggle={() => toggleSection('personalInfo')}
        />

        <Profile
          value={formData.profile}
          onChange={handleChange}
          collapsed={collapsed.profile}
          onToggle={() => toggleSection('profile')}
        />

        <FormSection name="languages" Component={Languages} formData={formData} collapsed={collapsed} toggleSection={toggleSection} handleArrayChange={handleArrayChange} addItem={addItem} removeItem={removeItem} />
        <FormSection name="skills" Component={Skills} formData={formData} collapsed={collapsed} toggleSection={toggleSection} handleArrayChange={handleArrayChange} addItem={addItem} removeItem={removeItem} />
        <FormSection name="programs" Component={Programs} formData={formData} collapsed={collapsed} toggleSection={toggleSection} handleArrayChange={handleArrayChange} addItem={addItem} removeItem={removeItem} />
      </div>

      <div className="form-column">

        <FormSection name="workExperience" Component={WorkExperience} formData={formData} collapsed={collapsed} toggleSection={toggleSection} handleArrayChange={handleArrayChange} addItem={addItem} removeItem={removeItem} />
        <FormSection name="education" Component={Education} formData={formData} collapsed={collapsed} toggleSection={toggleSection} handleArrayChange={handleArrayChange} addItem={addItem} removeItem={removeItem} />
        <FormSection name="training" Component={Training} formData={formData} collapsed={collapsed} toggleSection={toggleSection} handleArrayChange={handleArrayChange} addItem={addItem} removeItem={removeItem} />
        <FormSection name="projects" Component={Projects} formData={formData} collapsed={collapsed} toggleSection={toggleSection} handleArrayChange={handleArrayChange} addItem={addItem} removeItem={removeItem} />
      </div>
    </div>
  )
}

export default FormColumns
