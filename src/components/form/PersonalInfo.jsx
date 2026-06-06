function PersonalInfo({ formData, onChange }) {
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    const formatted = value.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4').trim()
    onChange({ target: { name: 'phone', value: formatted } })
  }

  return (
    <>
      <input name="fullName" value={formData.fullName} onChange={onChange} placeholder="e.g. Nino Beridze" />
      <input name="jobTitle" value={formData.jobTitle} onChange={onChange} placeholder="e.g. Marketing Specialist" />
      <input name="email" type="email" value={formData.email} onChange={onChange} placeholder="e.g. name@email.com" />
      <div className="form-phone-row">
        <select name="phoneCode" value={formData.phoneCode || '+995'} onChange={onChange}>
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
        <input name="phone" value={formData.phone} onChange={handlePhoneChange} placeholder="e.g. 555 12 34 56" />
      </div>
      <input name="location" value={formData.location || ''} onChange={onChange} placeholder="City, Country" />
      <input name="linkedin" value={formData.linkedin} onChange={onChange} placeholder="LinkedIn (e.g. linkedin.com/in/username)" />
      <input name="github" value={formData.github} onChange={onChange} placeholder="GitHub (e.g. github.com/username)" />
    </>
  )
}

export default PersonalInfo
