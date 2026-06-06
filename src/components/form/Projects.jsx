import { Trash2 } from 'lucide-react'
import ArrayListForm from '../shared/ArrayListForm'

function Projects({ data, onChange, onAdd, onRemove }) {
  return (
    <ArrayListForm
      data={data}
      onAdd={onAdd}
      addLabel="Add Project"
      revealLabel="projects"
      renderItem={(item, index) => (
        <div key={index} className="array-item">
          <input value={item.title} onChange={(e) => onChange(index, 'title', e.target.value)} placeholder="e.g. Portfolio website redesign" />
          <textarea value={item.description} onChange={(e) => onChange(index, 'description', e.target.value)} placeholder="What you did and the outcome — 1–2 sentences" rows="2" />
          <input value={item.link} onChange={(e) => onChange(index, 'link', e.target.value)} placeholder="Link (optional) — github.com/you/project" />
          {data.length > 1 && (
            <button type="button" className="remove-btn" onClick={() => onRemove(index)} aria-label={`Remove project ${index + 1}`}>
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
    />
  )
}

export default Projects
