'use client'

import { PencilSquareIcon } from "../icons"

const FieldView = ({title, value, onClick}) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4 w-full max-w-md">
        <div className="bg-gray-100 py-2 px-4 pe-10 rounded pt-4 shadow-sm col-span-3">
            <h3 className="text-secondary text-xs">{title}</h3>
            <p>{value}</p>
        </div>
        {
            onClick && <button onClick={onClick} className="">
                <PencilSquareIcon  className='size-6 text-primary'/>
            </button>
        }
    </div>
  )
}

export default FieldView