import { isInvertedHeader, isSidebarLayout } from '../../utils/cvLayoutHelpers'
import CVContactItems from './CVContactItems'

function CVHeader({ formData, accentColor, isPlaceholder = false, layoutVariant = 'classic' }) {
  const inverted = isInvertedHeader(layoutVariant)
  const contactInSidebar = isSidebarLayout(layoutVariant)
  const centered = layoutVariant === 'centered'
  const bannerHeader = layoutVariant === 'banner'

  return (
    <div
      className={[
        'cv-header',
        isPlaceholder ? 'cv-header--placeholder' : '',
        inverted ? 'cv-header--inverted' : '',
        bannerHeader ? 'cv-header--banner' : '',
        contactInSidebar ? 'cv-header--sidebar' : '',
        centered ? 'cv-header--centered' : ''
      ].filter(Boolean).join(' ')}
      style={{ '--cv-accent': accentColor }}
    >
      <div className="h-main">
        <h1>{formData.fullName || 'Full Name'}</h1>
        <div className="h-divider" style={{ backgroundColor: accentColor, opacity: isPlaceholder ? 0.35 : 1 }} />
        <p className="job-title">{formData.jobTitle || 'Job Title'}</p>
      </div>
      {!contactInSidebar && (
        <CVContactItems formData={formData} className="h-contact" />
      )}
    </div>
  )
}

export default CVHeader
