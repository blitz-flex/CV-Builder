import '../../styles/editor/EditorLoadingSkeleton.css'

function EditorLoadingSkeleton() {
  return (
    <div className="editor-skeleton u-dvh-screen" role="status" aria-label="Loading editor">
      <header className="editor-skeleton__header u-safe-top">
        <div className="editor-skeleton__title skeleton" />
        <div className="editor-skeleton__badge skeleton" />
      </header>

      <div className="editor-skeleton__progress skeleton" aria-hidden="true" />

      <div className="editor-skeleton__pills" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="editor-skeleton__pill skeleton" />
        ))}
      </div>

      <div className="editor-skeleton__sections" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="editor-skeleton__section skeleton" />
        ))}
      </div>

      <footer className="editor-skeleton__footer u-safe-bottom" aria-hidden="true">
        <div className="editor-skeleton__btn skeleton" />
      </footer>
    </div>
  )
}

export default EditorLoadingSkeleton
