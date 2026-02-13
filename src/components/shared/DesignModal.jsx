import { X, Palette } from 'lucide-react'
import { FONTS } from '../../config/fonts'

const COLOR_PRESETS = [
  '#dc2626', '#2563eb', '#16a34a', '#d97706',
  '#7c3aed', '#db2777', '#0f172a', '#4b5563',
  '#0d9488', '#22c55e', '#f97316', '#64748b'
]

function DesignModal({ show, onClose, accentColor, setAccentColor, selectedFont, setSelectedFont }) {
  if (!show) return null

  return (
    <div className="design-panel-overlay" onClick={onClose}>
      <div
        className="design-panel"
        onClick={(e) => e.stopPropagation()}>

        <div className="panel-header">
          <div className="panel-info">
            <Palette size={18} />
            <h3>Customize Design</h3>
          </div>
          <button className="panel-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="panel-content">
          <div className="design-group">
            <label>Accent Color</label>
            <div className="color-grid-minimal">
              {COLOR_PRESETS.map(color => (
                <button
                  key={color}
                  className={`color-dot ${accentColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setAccentColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="design-group">
            <label>Typography</label>
            <div className="font-list-minimal">
              {FONTS.map(font => (
                <button
                  key={font.value}
                  className={`font-item-btn ${selectedFont === font.value ? 'active' : ''}`}
                  style={{ fontFamily: font.value }}
                  onClick={() => setSelectedFont(font.value)}
                >
                  <span>{font.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="panel-footer">
          <button className="done-btn" onClick={onClose} style={{ backgroundColor: accentColor }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default DesignModal
