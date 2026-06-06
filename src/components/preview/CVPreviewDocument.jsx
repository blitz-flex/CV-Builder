import CVHeader from './CVHeader'
import CVLeftColumn from './CVLeftColumn'
import CVRightColumn from './CVRightColumn'
import { hasPersonalHeader, hasMainContent, hasSideContent, hasContactInfo } from '../../utils/cvHelpers'
import { isSidebarLayout, isSidebarLeft } from '../../utils/cvLayoutHelpers'

function CVPreviewDocument({
  formData,
  accentColor,
  selectedFont,
  cvRef,
  className = '',
  layoutVariant = 'classic',
  templateId = ''
}) {
  const hasHeader = hasPersonalHeader(formData)
  const hasMain = hasMainContent(formData)
  const hasSide = hasSideContent(formData)
  const sidebarLayout = isSidebarLayout(layoutVariant)
  const sidebarLeft = isSidebarLeft(layoutVariant)
  const showSideCol = hasSide || (sidebarLayout && hasContactInfo(formData))
  const showMainCol = hasMain
  const showLayout = showMainCol || showSideCol
  const showSidebarShell = sidebarLayout && (hasHeader || showLayout)

  const header = (
    <CVHeader
      formData={formData}
      accentColor={accentColor}
      isPlaceholder={!hasHeader}
      layoutVariant={layoutVariant}
    />
  )

  const sideColumn = showSideCol ? (
    <div className="cv-side-col">
      <CVLeftColumn
        formData={formData}
        accentColor={accentColor}
        layoutVariant={layoutVariant}
      />
    </div>
  ) : null

  return (
    <div
      className={[
        'cv-preview',
        `cv-preview--layout-${layoutVariant}`,
        templateId ? `cv-preview--tpl-${templateId}` : '',
        className
      ].filter(Boolean).join(' ')}
      ref={cvRef}
      style={{ fontFamily: selectedFont, '--cv-accent': accentColor }}
    >
      <div className="accent-bar" style={{ backgroundColor: accentColor }} />
      <div className={`cv-inner${showSidebarShell ? ' cv-inner--sidebar-shell' : ''}`}>
        {showSidebarShell ? (
          <div className={`cv-sidebar-shell${sidebarLeft ? ' cv-sidebar-shell--left' : ''}`}>
            {sidebarLeft && sideColumn}
            <div className="cv-main-stack">
              {header}
              {showMainCol && (
                <CVRightColumn formData={formData} accentColor={accentColor} />
              )}
            </div>
            {!sidebarLeft && sideColumn}
          </div>
        ) : (
          <>
            {header}
            {showLayout && (
              <div
                className={[
                  'cv-layout',
                  showMainCol && !showSideCol ? 'cv-layout--main-only' : '',
                  showSideCol && !showMainCol ? 'cv-layout--side-only' : ''
                ].filter(Boolean).join(' ')}
              >
                {showMainCol && (
                  <div className="cv-main-col">
                    <CVRightColumn formData={formData} accentColor={accentColor} />
                  </div>
                )}
                {showSideCol && sideColumn}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CVPreviewDocument
