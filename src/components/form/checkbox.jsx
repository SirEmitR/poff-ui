import React from 'react'

const CheckboxForm = ({
    label,
    name,
    value,
    required,
    onChange,
}) => {
  return (
    <div className='flex items-center gap-2'>
        <input type='checkbox' id={name} name={name} value={value} required={required} onChange={onChange}/>
        <label className='text-sm' htmlFor={name}>{label}</label>
    </div>
  )
}

export default CheckboxForm