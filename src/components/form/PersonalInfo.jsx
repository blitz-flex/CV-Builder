import { ChevronDown, ChevronUp } from 'lucide-react'

function PersonalInfo({ formData, onChange, onPhotoUpload, collapsed, onToggle }) {
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    const formatted = value.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4').trim()
    onChange({ target: { name: 'phone', value: formatted } })
  }

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
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <select name="phoneCode" value={formData.phoneCode || '+995'} onChange={onChange} style={{ width: '85px', padding: '0.75rem 0.4rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', backgroundColor: 'white' }}>
              <option value="+995">🇬🇪 +995</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+49">🇩🇪 +49</option>
              <option value="+33">🇫🇷 +33</option>
              <option value="+7">🇷🇺 +7</option>
              <option value="+380">🇺🇦 +380</option>
              <option value="+374">🇦🇲 +374</option>
              <option value="+994">🇦🇿 +994</option>
              <option value="+90">🇹🇷 +90</option>
            </select>
            <input name="phone" value={formData.phone} onChange={handlePhoneChange} placeholder="598 45 65 25" style={{ flex: 1, padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.95rem', marginBottom: 0 }} />
          </div>
          <input name="linkedin" value={formData.linkedin} onChange={onChange} placeholder="LinkedIn (e.g. linkedin.com/in/username)" />
          <input name="github" value={formData.github} onChange={onChange} placeholder="GitHub (e.g. github.com/username)" />
        </div>
      )}
    </div>
  )
}

export default PersonalInfo
