import { Trash2 } from 'lucide-react'
import ArrayListForm from '../shared/ArrayListForm'

function Training({ data, onChange, onAdd, onRemove }) {
  return (
    <ArrayListForm
      data={data}
      onAdd={onAdd}
      addLabel="Add Training"
      revealLabel="training entries"
      renderItem={(item, index) => (
        <div key={index} className="array-item">
          <input value={item.title} onChange={(e) => onChange(index, 'title', e.target.value)} placeholder="e.g. Google Analytics Certificate" />
          <input value={item.period} onChange={(e) => onChange(index, 'period', e.target.value)} placeholder="e.g. 2024" />
          <textarea value={item.description} onChange={(e) => onChange(index, 'description', e.target.value)} placeholder="Brief note — what you learned or why it matters" rows="2" />
          {data.length > 1 && (
            <button type="button" className="remove-btn" onClick={() => onRemove(index)} aria-label={`Remove training ${index + 1}`}>
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
    />
  )
}

export default Training
