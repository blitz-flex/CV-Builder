import { Trash2 } from 'lucide-react'
import ArrayListForm from '../shared/ArrayListForm'

function Education({ data, onChange, onAdd, onRemove }) {
  return (
    <ArrayListForm
      data={data}
      onAdd={onAdd}
      addLabel="Add Education"
      revealLabel="education entries"
      renderItem={(item, index) => (
        <div key={index} className="array-item">
          <input value={item.degree} onChange={(e) => onChange(index, 'degree', e.target.value)} placeholder="e.g. BA Business Administration" />
          <input value={item.school} onChange={(e) => onChange(index, 'school', e.target.value)} placeholder="e.g. University name" />
          <input value={item.period} onChange={(e) => onChange(index, 'period', e.target.value)} placeholder="e.g. 2019 – 2023" />
          {data.length > 1 && (
            <button type="button" className="remove-btn" onClick={() => onRemove(index)} aria-label={`Remove education ${index + 1}`}>
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
    />
  )
}

export default Education
