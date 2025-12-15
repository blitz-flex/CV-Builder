function CVHeader({ fullName, photo, accentColor }) {
  return (
    <div className="cv-header" style={{ borderBottomColor: accentColor }}>
      <h1>{fullName || 'Your Name'}</h1>
      {photo && (
        <div className="cv-photo">
          <img src={photo} alt="Profile" />
        </div>
      )}
    </div>
  )
}

export default CVHeader
