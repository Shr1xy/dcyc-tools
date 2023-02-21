import '../Selector/styles.css'

export const Selector = ({ label, options, onChange, value }) => {
  const handleChange = (e) => {
    onChange(e.target.value)
  }
  return (
    <div className="selector">
      <label className="selector__label">{label}</label>
      <select onChange={handleChange} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}
