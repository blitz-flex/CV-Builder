function PersonalInfo({ formData, onChange, onPhotoUpload }) {
  return (
    <div className="form-section">
      <h3>Personal Information</h3>
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
  )
}

export default PersonalInfo
