import React from 'react'

const Messages = ({
    type,
    children
}) => {
  return (
    <div className={`w-full p-4 rounded mensaje ${type} text-sm`}>
        {children}
    </div>
  )
}

export default Messages