const InputForm = ({
    label,
    type,
    name,
    value,
    required,
    onChange,
    placeholder,
    className,
    id,
    maxLength,
    minLength,
    min,
    max,
    defaultValue,
    ...rest
}) => {
  return (
    <div className='input-container'>
        <input maxLength={maxLength} defaultValue={defaultValue} minLength={minLength} min={min} max={max} type={type} id={id} name={name} required={required} placeholder={placeholder}/>
        <label htmlFor={id}>{placeholder}</label>
    </div>
  )
}

export default InputForm