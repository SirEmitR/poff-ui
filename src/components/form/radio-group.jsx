import React from 'react'

const Option = ({value,children, name, id, index, lenght, onChange, defaultChecked}) => {

    return (
        <div className='radio-option flex'>
            <input defaultChecked={defaultChecked} onChange={onChange} type="radio" id={id} hidden name={name} value={value} />
            <label className={`${index === 0 && 'rounded-s'} flex justify-center items-center px-4 py-2 h-full ${index === lenght - 1 && 'rounded-e'}`} htmlFor={id}>
               {children}
            </label>
        </div>
    )
}

const RadioGroup = ({name, title, children}) => {
    return (
        <div className='flex items-center gap-2'>
            <div className="bg-gray-50 flex items-center justify-center w-max rounded shadow-md">
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child) && child.type === Option) {
                    return React.cloneElement(child, { name, index, lenght: React.Children.count(children) });
                }
                return child;
            })}
            </div>
            <p className='text-sm'>{title}</p>
        </div>
)
}
RadioGroup.Option = Option;
RadioGroup.displayName = 'RadioGroup'
export default RadioGroup