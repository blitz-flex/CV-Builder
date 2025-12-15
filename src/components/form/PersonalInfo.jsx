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
          <input name="email" value={formData.email} onChange={onChange} placeholder="Email" />
          <input name="phone" value={formData.phone} onChange={onChange} placeholder="Phone" />
          <input name="linkedin" value={formData.linkedin} onChange={onChange} placeholder="LinkedIn URL" />
          <input name="github" value={formData.github} onChange={onChange} placeholder="GitHub URL" />
          <div className="photo-upload">
            <label htmlFor="photo">Upload Photo</label>
            <input type="file" id="photo" accept="image/*" onChange={onPhotoUpload} />
          </div>
        </div>
      )}
    </div>
  )
}

export default PersonalInfo
