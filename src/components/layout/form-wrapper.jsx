import React from 'react'

const FormWrapper = ({children, className}) => {
  return (
    <div className={`form-wrapper gap-6 ${className}`}>
        {children}
    </div>
  )
}

export default FormWrapper