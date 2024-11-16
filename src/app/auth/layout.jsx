import React from 'react'

const LaoyutAuth = ({
    children
}) => {
  return (
    <main className='p-page flex justify-center items-center h-[70dvh]'>
        <div className='shadow-md p-10 border border-gray-100 rounded relative overflow-hidden'>
            {children}
        </div>
    </main>
  )
}

export default LaoyutAuth