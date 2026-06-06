import { useState, useCallback } from 'react'
import { FORM_TEMPLATES, INITIAL_FORM_DATA, INITIAL_COLLAPSED_STATE } from '../config/formTemplates'

/**
 * Encapsulates all form data mutations and collapsed-section state.
 * Keeps CVForm focused on routing/hydration/layout, not field logic.
 */
export function useFormData(initialData = INITIAL_FORM_DATA) {
  const [formData, setFormData]   = useState(initialData)
  const [collapsed, setCollapsed] = useState(INITIAL_COLLAPSED_STATE)

  const resetCollapsed = useCallback(() => setCollapsed({ ...INITIAL_COLLAPSED_STATE }), [])

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const handleArrayChange = useCallback((section, index, field, value) => {
    setFormData((prev) => {
      const next = [...prev[section]]
      next[index] = { ...next[index], [field]: value }
      return { ...prev, [section]: next }
    })
  }, [])

  const addItem = useCallback((section, onAdded) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...FORM_TEMPLATES[section] }]
    }))
    setCollapsed((prev) => ({ ...prev, [section]: false }))
    onAdded?.(section)
  }, [])

  const removeItem = useCallback((section, index) => {
    setFormData((prev) => {
      if (prev[section].length <= 1) return prev
      return {
        ...prev,
        [section]: prev[section].filter((_, i) => i !== index)
      }
    })
  }, [])

  const toggleSection = useCallback((section, onToggled) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }))
    onToggled?.(section)
  }, [])

  const openSection = useCallback((section) => {
    setCollapsed((prev) => ({ ...prev, [section]: false }))
  }, [])

  return {
    formData,
    setFormData,
    collapsed,
    resetCollapsed,
    handleChange,
    handleArrayChange,
    addItem,
    removeItem,
    toggleSection,
    openSection,
  }
}
