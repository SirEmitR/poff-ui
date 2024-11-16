'use client'
import { useEffect, useRef } from "react"
import { Anton } from "next/font/google"

const anton = Anton({ subsets: ['latin'] , weight: "400" })

const setWith = (size, position) => {
    switch (size) {
        case 'sm':
            if(position === 'center'){
                return 'sm:w-1/4 min-h-32 sm:max-h-[30dvh] w-full'
            }
            if(position !== 'top' && position !== 'bottom') {
                return 'w-1/4 min-h-32'
            }else{
                return 'w-full h-1/4'
            }
        case 'md':
            if(position === 'center'){
                return 'sm:w-1/2 min-h-32 sm:max-h-[50dvh] w-full'
            }
            if(position !== 'top' && position !== 'bottom') {
                return 'w-1/2 min-h-32'
            }else{
                return 'w-full h-1/2'
            }    

        case 'lg':
            if(position === 'center'){
                return 'sm:w-3/4 min-h-32 max-h-[70dvh] w-full'
            }
            if(position !== 'top' && position !== 'bottom') {
                return 'w-3/4 min-h-32'
            }else{
                return 'w-full h-3/4'
            }
        case 'xl':
            if(position === 'center'){
                return 'w-full min-h-32 max-h-[90dvh] w-full'
            }
            if(position !== 'top' && position !== 'bottom') {
                return 'w-full min-h-32'
            }else{
                return 'w-full h-full'
            }
        default:
            return 'w-1/2 min-h-32'
    }
}

const Modal = ({
    props,
    children
}) => {
    const modalRef = useRef(null)
    useEffect(() => {
        if(props.open && props.overflow === 'hidden') {
            document.body.style.overflow = 'hidden'
        }else{
            document.body.style.overflow = 'auto'
        }
    }, [props])
    
    const handleExternalClose = (e) => {
        if(props.externalClose && e.target === e.currentTarget) {
            props.onClose()
        }
        e.stopPropagation()
    }

    useEffect(() => {
        if(props.open){
            if(modalRef.current){
                //remove close class
                modalRef.current.classList.remove('close')

                //add open class
                modalRef.current.classList.add('open')
            }else{
            }
        }else{
            if(modalRef.current){
                //add close class
                modalRef.current.classList.add('close')
            }
        }
    }, [props.open])

    const handleAnimationEnd = () => {
        if(!props.open){
            if(modalRef.current){
                //remove open class
                modalRef.current.classList.remove('open')
            }
        }
    }

    return (
        <div ref={modalRef} style={{zIndex: props?.zIndex || 30}} onAnimationEnd={handleAnimationEnd} className={`w-full h-full min-h-dvh fixed left-0 right-0 top-0 bottom-0 modal ${props.position}`}>
            <div className="flex relative w-full h-full">
                <div onClick={handleExternalClose} className="absolute z-0 left-0 right-0 top-0 bottom-0 external"></div>
                <div className={`${props.position} ${setWith(props.size, props.position)} h-auto min-w-64 content absolute z-10 flex flex-col bg-white shadow-md p-6 overflow-y-auto`}>
                    <div className="flex justify-between items-center">
                        <h2 style={anton.style} className="text-xl">{props.title}</h2>
                        <button onClick={props.onClose} disabled={props.disabled} className="btn btn-tertiary justify-self-end">Cerrar</button>
                    </div>
                  {children}
                </div>
            </div>
        </div>
    )
}

export default Modal