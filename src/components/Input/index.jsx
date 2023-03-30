import '../Input/styles.css'

export const Input = ({ className, label, value, onChange, placeholder, min, max, type, step }) => {
  const handleChange = (e) => {
    const inputValue = e.target.value
    const numericValue = inputValue.replace(/[^0-9]/g, '')

    if (numericValue !== '') {
      onChange(numericValue)
    }
  }

  return (
    <div className="input">
      <label className="input__label">{label}</label>
      <input className="input__field" type={type} step={step} min={min} max={max} value={value} onChange={handleChange} />
    </div>
  )
}
