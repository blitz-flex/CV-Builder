function Profile({ value, onChange }) {
  return (
    <div className="form-section">
      <h3>Profile</h3>
      <textarea name="profile" value={value} onChange={onChange} placeholder="Profile/Summary" rows="3" />
    </div>
  )
}

export default Profile
