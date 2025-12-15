import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react'

function Languages({ data, collapsed, onToggle, onChange, onAdd, onRemove }) {
  return (
    <div className="form-section collapsible">
      <div className="section-header" onClick={onToggle}>
        <h3>Languages</h3>
        {collapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </div>
      {!collapsed && (
        <>
          {data.map((item, index) => (
            <div key={index} className="array-item">
              <input value={item.name} onChange={(e) => onChange(index, 'name', e.target.value)} placeholder="Language" />
              {data.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => onRemove(index)}>
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={onAdd}>
            <Plus size={16} /> Add Language
          </button>
        </>
      )}
    </div>
  )
}

export default Languages
