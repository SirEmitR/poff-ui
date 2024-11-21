import React from 'react'

const Question = ({children, title}) => {
    return (
        <details className='faq'>
            <summary className='font-semibold bg-tertiary hover:bg-secondary py-4 px-2 cursor-pointer transition-colors'>{title}</summary>
            <div className='my-4'>
                {children}
            </div>
        </details>
    )
}

const Faq = ({ children}) => {
    return (
        <section className='flex flex-col gap-4 flex-1'>
            <h3 className='text-xl font-semibold'>Preguntas frecuentes</h3>
           <div>
            {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && child.type === Faq) {
                        return React.cloneElement(child);
                    }
                    return child;
                })}
           </div>
        </section>
    )
}
Faq.Question = Question;
export default Faq