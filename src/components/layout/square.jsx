import React from 'react'

const Square = ({
    children,
    cols = 1,
    rows = 1,
}) => {
  return (
    <div 
        className={`rounded shadow-md shadow-secondary max-h-[40dvh] relative overflow-hidden`}
        style={{
            gridRow: `span ${rows}`,
            gridColumn: `span ${cols}`,
        }}
    >
        {children}
    </div>
  )
}

export default Square