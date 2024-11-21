import React from 'react'
import AntonFont from '../fonts/anton'
import ImageLoad from '../experience/image-load'
import splitName from '@/utils/split-name'
import Square from './square'

const TeamHero = ({nombre, tipoFondo, fondo, logo}) => {
  return (
    <header>
        <Square cols={2} rows={1}>
        <div className='relative rounded py-6 px-6'
            style={{backgroundColor: tipoFondo === 'color' && fondo}}
        >
          <div className='absolute left-0 right-0 top-0 bottom-0 -z-10'>
            <ImageLoad src={fondo} alt={nombre} />
          </div>
        <div className='w-32 h-32 skeleton rounded  shadow-lg'>
            {
                logo ? <ImageLoad src={logo} alt={nombre} /> : <h2 className='flex justify-center items-center h-full text-4xl'><AntonFont>{splitName(nombre)}</AntonFont></h2>
            }
        </div>
        </div>
        
        </Square>
        <h1 className='text-2xl mt-4'><AntonFont>{nombre}</AntonFont></h1>
    </header>
  )
}

export default TeamHero