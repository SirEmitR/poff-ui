'use client'
import { useNotification } from '@/components/context/notification-context'
import { useSending } from '@/components/context/sending-context'
import AntonFont from '@/components/fonts/anton'
import ButtonForm from '@/components/form/button'
import CodigoInput from '@/components/form/codigo'
import InputForm from '@/components/form/input'
import Fases from '@/components/layout/fases'
import request from '@/utils/request'
import Link from 'next/link'
import { useRef, useState } from 'react'

const Forgot = () => {
    const {showSender, hideSender, isSending} = useSending()
    const {addNotification} = useNotification()
    const fasesRef = useRef()
    const [email, setEmail] = useState('')

    const sendCode = (email, next = false) => {
        showSender()
        request('/auth/forgot', 'POST', {email})
        .then((response) => {
            if(response.error){
                return addNotification(response.error, 'error')
            }
            addNotification('Se ha enviado un código a tu correo electrónico', 'success')
            setEmail(email)
            if(next){
                avanzarFase()
            }
        }).catch((error) => {
            addNotification('Ha ocurrido un error', 'error')
        }).finally(() => {
            hideSender()
        })
    }
    const avanzarFase = () => {
        fasesRef.current.irAdelante();
    };
    const completeCode = (code) => {
        showSender()
        request('/auth/forgot/verify', 'POST', {email, code})
        .then((response) => {
            if(response.error){
                return addNotification(response.error, 'error')
            }
            addNotification('Código verificado', 'success')
            avanzarFase()
        }).catch((error) => {
            addNotification('Ha ocurrido un error', 'error')
        }).finally(() => {
            hideSender()
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setEmail('')
        const formData = new FormData(e.target)
        const email = formData.get('email') || ''
        sendCode(email, true)
    }
    const handleResend = () => {
        if(isSending) return
        if(!email){
            return addNotification('Ingresa tu correo electrónico primero', 'error')
        }
        sendCode(email)
    }
    const handleChangePassword = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const password = formData.get('password') || ''
        const password_confirmation = formData.get('password_confirmation') || ''
        if(password !== password_confirmation){
            return addNotification('Las contraseñas no coinciden', 'error')
        }
        showSender()
        request('/auth/forgot/reset', 'POST', {email, password})
        .then((response) => {
            if(response.error){
                return addNotification(response.error, 'error')
            }
            addNotification('Contraseña actualizada', 'success')
            avanzarFase()
        }).catch((error) => {
            addNotification('Ha ocurrido un error', 'error')
        }).finally(() => {
            hideSender()
        })
    }
  return (
    <div>
        <div className="flex items-center gap-3">
            <h1 className="text-4xl">
                <AntonFont>
                    POFF
                </AntonFont>
            </h1>
            <p>Recupera tu contraseña</p>
            
        </div>
        <Fases ref={fasesRef} bloquearAdelante bloquearAtras>
            <Fases.Fase>
            <form onSubmit={handleSubmit}>
                <InputForm type="email" required id={'email'} name="email" placeholder="Correo electrónico" />
                <div className='mt-6'>
                    <ButtonForm disabled={isSending}>Solicitar codigo</ButtonForm>
                </div>
            </form>
            </Fases.Fase>
            <Fases.Fase>
                <div className='flex flex-col items-center gap-4 mt-4'>
                    <p className='text-secondary text-sm'>Ingresa el código que te hemos enviado a tu correo electrónico</p>
                    <CodigoInput onComplete={completeCode} isSending={isSending} />
                    <p className='text-secondary text-sm'>¿No has recibido el código? <button onClick={handleResend} className="font-semibold text-foreground">Reenviar código</button></p>
                </div>
            </Fases.Fase>
            <Fases.Fase>
                <form onSubmit={handleChangePassword}>
                    <InputForm type="password" id='password' required name="password" placeholder="Nueva contraseña" />
                    <InputForm type="password" required id='password_confirmation' name="password_confirmation" placeholder="Confirmar contraseña" />
                    <div className='mt-6'>
                        <ButtonForm disabled={isSending}>Restablecer contraseña</ButtonForm>
                    </div>
                </form>
            </Fases.Fase>
            <Fases.Fase>
                <div className='flex flex-col items-center gap-4 mt-4'>
                    <p className='text-secondary text-sm'>Tu contraseña ha sido actualizada</p>
                    <p className='text-secondary text-sm'>Inicia sesión con tu nueva contraseña, <Link className='font-semibold text-foreground' href='/auth'>Iniciar sesión</Link></p>
                </div>
            </Fases.Fase>
        </Fases>
    </div>
  )
}

export default Forgot