import { useState, useEffect, useRef } from 'react'
import { Palette, ChevronDown, Type } from 'lucide-react'
import { FONTS } from '../../config/fonts'

const COLOR_PRESETS = [
  '#22c55e', '#f97316', '#64748b',
  '#84cc16', '#06b6d4', '#14b8a6',
  '#8b5cf6', '#ec4899', '#000000'
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
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3><Palette size={24} /> Customize Design</h3>
        </div>
        <div className="design-options">
          <div className="option">
            <label><Palette size={14} /> Theme Color</label>
            <div className="color-picker-wrapper" ref={colorDropdownRef}>
              <button 
                className={`color-picker-button ${colorDropdownOpen ? 'open' : ''}`}
                onClick={() => setColorDropdownOpen(!colorDropdownOpen)}
              >
                <div className="color-preview" style={{ background: accentColor }}></div>
                <span>Select Color</span>
                <ChevronDown size={18} />
              </button>
              {colorDropdownOpen && (
                <div className="color-dropdown">
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
                  <div className="color-input-wrapper">
                    <input 
                      type="text" 
                      value={accentColor} 
                      onChange={(e) => {
                        const value = e.target.value
                        if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                          setAccentColor(value)
                        }
                      }}
                      placeholder="#000000"
                      maxLength={7}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="option">
            <label><Type size={14} /> Font Family</label>
            <div className="font-picker-wrapper" ref={fontDropdownRef}>
              <button 
                className={`font-picker-button ${fontDropdownOpen ? 'open' : ''}`}
                onClick={() => setFontDropdownOpen(!fontDropdownOpen)}
              >
                <span>{FONTS.find(f => f.value === selectedFont)?.label}</span>
                <ChevronDown size={18} />
              </button>
              {fontDropdownOpen && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignModal
