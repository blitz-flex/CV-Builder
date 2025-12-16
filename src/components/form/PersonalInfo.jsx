import { ChevronDown, ChevronUp } from 'lucide-react'

function PersonalInfo({ formData, onChange, onPhotoUpload, collapsed, onToggle }) {
  return (
    <div className="form-section collapsible">
      <div className="section-header" onClick={onToggle}>
        <h3>Personal Information</h3>
        {collapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </div>
      {!collapsed && (
        <div style={{ marginTop: '1rem' }}>
          <input name="fullName" value={formData.fullName} onChange={onChange} placeholder="Full Name" />
          <input name="jobTitle" value={formData.jobTitle} onChange={onChange} placeholder="Job Title (e.g. Professional Waiter)" />
          <input name="email" value={formData.email} onChange={onChange} placeholder="Email" />
          <input name="phone" value={formData.phone} onChange={onChange} placeholder="Phone" />
          <input name="location" value={formData.location} onChange={onChange} placeholder="Location (e.g. Nashville, TN)" />
          <input name="linkedin" value={formData.linkedin} onChange={onChange} placeholder="LinkedIn (e.g. linkedin.com/in/username)" />
          <input name="github" value={formData.github} onChange={onChange} placeholder="GitHub (e.g. github.com/username)" />
        </div>
      )}
    </div>
  )
}

export default PersonalInfo
