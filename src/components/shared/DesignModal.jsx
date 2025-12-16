import { useState, useEffect, useRef } from 'react'
import { Palette, ChevronDown, Type } from 'lucide-react'
import { FONTS } from '../../config/fonts'

const COLOR_PRESETS = [
  '#22c55e', '#f97316', '#64748b',
  '#84cc16', '#14b8a6', '#8b5cf6',
  '#ec4899', '#000000'
]

function DesignModal({ show, onClose, accentColor, setAccentColor, selectedFont, setSelectedFont }) {
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false)
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false)
  const colorDropdownRef = useRef(null)
  const fontDropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorDropdownRef.current && !colorDropdownRef.current.contains(event.target)) {
        setColorDropdownOpen(false)
      }
      if (fontDropdownRef.current && !fontDropdownRef.current.contains(event.target)) {
        setFontDropdownOpen(false)
      }
    }

    if (colorDropdownOpen || fontDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [colorDropdownOpen, fontDropdownOpen])

  if (!show) return null

  return (
    <div className="modal-overlay-left" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}>
        <div className="design-options">
          <div className="option">
            <div className="option-header">
              <Palette size={20} />
              <h4>Theme Color</h4>
            </div>
            <div className="color-presets">
              {COLOR_PRESETS.map(color => (
                <button
                  key={color}
                  className={`color-preset ${accentColor === color ? 'active' : ''}`}
                  style={{ background: color }}
                  onClick={() => setAccentColor(color)}
                />
              ))}
            </div>
          </div>
          <div className="option">
            <div className="option-header">
              <Type size={20} />
              <h4>Font Family</h4>
            </div>
            <div className="font-dropdown">
              {FONTS.map(font => (
                <button
                  key={font.value}
                  className={`font-option ${selectedFont === font.value ? 'active' : ''}`}
                  onClick={() => setSelectedFont(font.value)}
                >
                  {font.label}
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
