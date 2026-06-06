import { Trash2 } from 'lucide-react'
import ArrayListForm from '../shared/ArrayListForm'

function Languages({ data, onChange, onAdd, onRemove }) {
  return (
    <ArrayListForm
      data={data}
      onAdd={onAdd}
      addLabel="Add Language"
      revealLabel="languages"
      renderItem={(item, index) => (
        <div key={index} className="array-item">
          <input value={item.name} onChange={(e) => onChange(index, 'name', e.target.value)} placeholder="e.g. English" />
          <input value={item.level} onChange={(e) => onChange(index, 'level', e.target.value)} placeholder="e.g. Professional Working Proficiency" />
          {data.length > 1 && (
            <button type="button" className="remove-btn" onClick={() => onRemove(index)} aria-label={`Remove language ${index + 1}`}>
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
    />
  )
}

export default Languages
