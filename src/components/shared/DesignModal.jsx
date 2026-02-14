import { X, Palette, Pipette } from 'lucide-react'
import { FONTS } from '../../config/fonts'
import '../../styles/DesignModal.css'

const COLOR_PRESETS = [
  '#2563eb', '#0f172a', '#16a34a', '#dc2626', '#7c3aed'
]

function DesignModal({ show, onClose, accentColor, setAccentColor, selectedFont, setSelectedFont }) {
  if (!show) return null

  // Check if current accentColor is one of the presets
  const isCustomColor = !COLOR_PRESETS.includes(accentColor);

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

              {/* Custom Color Picker as 6th option */}
              <div
                className={`color-dot custom-picker-wrapper ${isCustomColor ? 'active' : ''}`}
                style={isCustomColor ? { background: accentColor } : {}}
              >
                <input
                  type="color"
                  value={isCustomColor ? accentColor : '#ffffff'}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="custom-color-input"
                />
                {!isCustomColor && <Pipette size={21} className="pipette-icon" />}
              </div>
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

      </div>
    </div>
  )
}

export default DesignModal
