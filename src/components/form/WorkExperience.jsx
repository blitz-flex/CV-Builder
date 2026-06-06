import { Trash2 } from 'lucide-react'
import ArrayListForm from '../shared/ArrayListForm'

function WorkExperience({ data, onChange, onAdd, onRemove }) {
  return (
    <ArrayListForm
      data={data}
      onAdd={onAdd}
      addLabel="Add Experience"
      revealLabel="experiences"
      renderItem={(item, index) => (
        <div key={index} className="array-item">
          <input value={item.period} onChange={(e) => onChange(index, 'period', e.target.value)} placeholder="e.g. 2022 – Present" />
          <input value={item.title} onChange={(e) => onChange(index, 'title', e.target.value)} placeholder="e.g. Sales Assistant" />
          <input value={item.company} onChange={(e) => onChange(index, 'company', e.target.value)} placeholder="e.g. Company name" />
          <textarea value={item.description} onChange={(e) => onChange(index, 'description', e.target.value)} placeholder="One result per line, e.g.&#10;Increased sales by 15% in Q3&#10;Trained 3 new team members" rows="3" />
          {data.length > 1 && (
            <button type="button" className="remove-btn" onClick={() => onRemove(index)} aria-label={`Remove experience ${index + 1}`}>
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
    />
  )
}

export default WorkExperience
