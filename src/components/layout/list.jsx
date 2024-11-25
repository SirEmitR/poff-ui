import React from 'react'
import ImageLoad from '../experience/image-load'
import Link from 'next/link'
import AntonFont from '../fonts/anton'
import splitName from '@/utils/split-name'

const ImageDisplay = ({image, text}) => {
  if(image) return <ImageLoad src={image} alt={text} />
  return <h2 className='flex justify-center items-center h-full text-lg'><AntonFont>{splitName(text)}</AntonFont></h2>
}

const ListItem = ({ image, name, href }) => {
  return (
    <li className='flex w-full'>
      {
        href  ? (
          <Link href={href} className='flex-1 flex bg-gray-50 rounded items-center gap-4'>
            <div className='w-10 h-10 rounded overflow-hidden'>
              <ImageDisplay image={image} text={name} />
            </div>
            <h3 className=''>{name}</h3>
          </Link>
        ) : (
          <div className='flex-1 flex items-center gap-4'>
            <div className='w-10 h-10 rounded overflow-hidden'>
              <ImageDisplay image={image} text={name} />
            </div>
            <h3 className=''>{name}</h3>
          </div>
        )
      }
    </li>
  )
}

const List = ({children, hasMore, onLoadMore}) => {
  return (
    <div className=' py-4 pb-10 shadow-sm px-4 rounded border border-tertiary'>
      <ul className='flex flex-col gap-2'>
        {children}
      </ul>
      <div>
        {hasMore && (
          <button  className='w-full py-2 bg-transparent text-sm rounded mt-4'>Ver más</button>
        )}
      </div>
    </div>
  )
}

List.Item = ListItem
export default List