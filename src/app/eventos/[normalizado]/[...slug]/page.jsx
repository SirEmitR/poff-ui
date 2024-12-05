import AntonFont from '@/components/fonts/anton';
import React from 'react'

const Categorias = async ({params}) => {
    const {normalizado, slug} = await params;
    return (
      <main className='p-page'>
          <h1 className="text-2xl font-semibold"><AntonFont></AntonFont></h1>
      </main>
    )
}

export default Categorias