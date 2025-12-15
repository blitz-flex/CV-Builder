import { Palette } from 'lucide-react'
import { FONTS } from '../../config/fonts'

function DesignModal({ show, onClose, accentColor, setAccentColor, selectedFont, setSelectedFont }) {
  if (!show) return null

  return (
    <div className="modal-overlay-left" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3><Palette size={24} /> Customize Design</h3>
        <div className="design-options">
          <div className="option">
            <label>Theme Color</label>
            <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
          </div>
          <div className="option">
            <label>Font Family</label>
            <select value={selectedFont} onChange={(e) => setSelectedFont(e.target.value)}>
              {FONTS.map(font => (
                <option key={font.value} value={font.value}>{font.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignModal
