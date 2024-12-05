import React from 'react'
import ImageLoad from '../experience/image-load'
import Link from 'next/link'
import AntonFont from '../fonts/anton'
import splitName from '@/utils/split-name'
import Pagination from '../experience/pagination'

const ImageDisplay = ({image, text}) => {
  if(image) return <ImageLoad src={image} alt={text} />
  return <h2 className='flex justify-center items-center h-full text-lg'><AntonFont>{splitName(text)}</AntonFont></h2>
}

const ListItem = ({values, href, hasImage }) => {
  return (
    <li className='flex w-full'>
      {
        href  ? (
          <Link href={href} className='flex-1 flex justify-between text-left px-2 bg-gray-50 rounded items-center gap-4'>
            {hasImage && <div className='w-10 h-10 rounded overflow-hidden'>
              <ImageDisplay image={values[0]} text={values[1]} />
            </div>}
            {
              values.slice(hasImage ? 1 : 0).map((value, index) => (
                <div key={index} className=''>{value}</div>
              ))
            }
          </Link>
        ) : (
          <div className='flex-1 flex justify-between text-left px-2 items-center gap-4'>
            {hasImage && <div className='w-10 h-10 rounded overflow-hidden'>
              <ImageDisplay image={values[0]} text={values[1]} />
            </div>}
            {
              values.slice(hasImage ? 1 : 0).map((value, index) => (
                <p key={index} className=''>{value}</p>
              ))
            }
          </div>
        )
      }
    </li>
  )
}

const ItemLoading = ({hasImage}) => {
  return (
    <li className='flex w-full'>
      <div className='flex-1 flex bg-gray-50 rounded items-center gap-4'>
        {
          hasImage && <div className='w-10 h-10 rounded overflow-hidden skeleton'></div>
        }
        <p className='bg-gray-300 skeleton py-3 px-20'></p>
      </div>
    </li>
  )
}

const List = ({children,isLoading, meta, handlePage,hasImage}) => {
  return (
   <>
     <div className=' py-4 pb-10 shadow-sm px-4 rounded border border-tertiary'>
        <ul className='flex flex-col gap-2'>
          {
            isLoading ? Array.from({length: 4}).map((_, index) => (
              <ItemLoading key={index} hasImage={hasImage} />
            )) : <>{children}</>
          }
        </ul>
        
      </div>
      <div className='mt-4'>
        {meta && (
        <Pagination pages={meta.totalPages} currentPage={meta.currentPage} handlePage={handlePage}/>
        )}
      </div>
   </>
  )
}

List.Item = ListItem
export default List