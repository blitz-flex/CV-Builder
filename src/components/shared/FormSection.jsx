function FormSection({ name, Component, formData, collapsed, toggleSection, handleArrayChange, addItem, removeItem }) {
  return (
    <Component
      data={formData[name]}
      collapsed={collapsed[name]}
      onToggle={() => toggleSection(name)}
      onChange={(index, field, value) => handleArrayChange(name, index, field, value)}
      onAdd={() => addItem(name)}
      onRemove={(index) => removeItem(name, index)}
    />
  )
}

export default FormSection
