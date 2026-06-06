import { Trash2 } from 'lucide-react'
import ArrayListForm from '../shared/ArrayListForm'

function Skills({ data, onChange, onAdd, onRemove }) {
  return (
    <ArrayListForm
      data={data}
      onAdd={onAdd}
      addLabel="Add Skill"
      revealLabel="skills"
      renderItem={(item, index) => (
        <div key={index} className="array-item">
          <input value={item.name} onChange={(e) => onChange(index, 'name', e.target.value)} placeholder="e.g. Teamwork, Excel, Public speaking" />
          {data.length > 1 && (
            <button type="button" className="remove-btn" onClick={() => onRemove(index)} aria-label={`Remove skill ${index + 1}`}>
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
    />
  )
}

export default Skills
