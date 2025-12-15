import { ChevronDown, ChevronUp } from 'lucide-react'

function Profile({ value, onChange, collapsed, onToggle }) {
  return (
    <div className="form-section collapsible">
      <div className="section-header" onClick={onToggle}>
        <h3>Profile</h3>
        {collapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </div>
      {!collapsed && (
        <div style={{ marginTop: '1rem' }}>
          <textarea name="profile" value={value} onChange={onChange} placeholder="Profile/Summary" rows="3" />
        </div>
      )}
    </div>
  )
}

export default Profile
