import React from 'react'

const ButtonForm = ({
    children,
    disabled = false
}) => {
  return (
    <button disabled={disabled} className='bg-foreground text-background px-6 py-2 rounded w-full disabled:bg-secondary disabled:text-tertiary'>
        {children}
    </button>
  )
}

export default ButtonForm