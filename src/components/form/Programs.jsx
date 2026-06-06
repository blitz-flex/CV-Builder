import { Trash2 } from 'lucide-react'
import ArrayListForm from '../shared/ArrayListForm'

function Programs({ data, onChange, onAdd, onRemove }) {
  return (
    <ArrayListForm
      data={data}
      onAdd={onAdd}
      addLabel="Add Program"
      revealLabel="programs"
      renderItem={(item, index) => (
        <div key={index} className="array-item">
          <input value={item.name} onChange={(e) => onChange(index, 'name', e.target.value)} placeholder="e.g. Microsoft Excel, Figma, Photoshop" />
          {data.length > 1 && (
            <button type="button" className="remove-btn" onClick={() => onRemove(index)} aria-label={`Remove program ${index + 1}`}>
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
    />
  )
}

export default Programs
