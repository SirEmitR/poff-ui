import React from 'react'

const Sending = ({
    position = 'top',
    visible = false
}) => {
  return (
    <div
        style={{
            top: position === 'top' ? '0' : 'auto',
            bottom: position === 'bottom' ? '0' : 'auto',
            display: visible ? 'block' : 'none'
        }} 
        className='absolute left-0 right-0 p-1 bar-loader'></div>
  )
}

export default Sending