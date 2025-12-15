import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react'

function Training({ data, collapsed, onToggle, onChange, onAdd, onRemove }) {
  return (
    <div className="form-section collapsible">
      <div className="section-header" onClick={onToggle}>
        <h3>Training & Certifications</h3>
        {collapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </div>
      {!collapsed && (
        <>
          {data.map((item, index) => (
            <div key={index} className="array-item">
              <input value={item.title} onChange={(e) => onChange(index, 'title', e.target.value)} placeholder="Title" />
              <input value={item.period} onChange={(e) => onChange(index, 'period', e.target.value)} placeholder="Period" />
              <textarea value={item.description} onChange={(e) => onChange(index, 'description', e.target.value)} placeholder="Description" rows="2" />
              {data.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => onRemove(index)}>
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={onAdd}>
            <Plus size={16} /> Add Training
          </button>
        </>
      )}
    </div>
  )
}

export default Training
