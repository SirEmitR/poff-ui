'use client'
import { useNotification } from "@/components/context/notification-context"
import AntonFont from "@/components/fonts/anton"
import ButtonForm from "@/components/form/button"
import CheckboxForm from "@/components/form/checkbox"
import InputForm from "@/components/form/input"
import request from "@/utils/request"
import Link from "next/link"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useUsuario } from "@/components/context/usuario-context"
import { useSending } from "@/components/context/sending-context"

const AuthPage = () => {
    const {login} = useUsuario()
    const {showSender, hideSender, isSending} = useSending()
    const [method, setMethod] = useState('login')
    const [showPassword, setShowPassword] = useState(false)
    const {addNotification} = useNotification()
    const searchParams = useSearchParams()
    const returnUrl = searchParams.get('returnUrl') || '/'
    const router = useRouter()
    const toggleMethod = () => {
        if (method === 'login') {
            setMethod('register')
        } else {
            setMethod('login')
        }
    }

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const endpoint = method === 'login' ? '/auth/login' : '/auth/register'
        const formData = new FormData(e.target)
        const email = formData.get('email')
        const password = formData.get('password')
        const name = formData.get('name') || null
        showSender()
        request(endpoint, 'POST', {
            email,
            password,
            nombre: name
        })
        .then(res => {
            if(res.error){
                throw new Error(res.error)
            }
            const data = res.data;
            addNotification(data.message, data.success ? 'success' : 'error')
            if (data.success) {
                login(data.id);
                router.push(returnUrl)
            }
        })
        .catch(err => {
            addNotification(err.message, 'error')
        })
        .finally(() => {
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
            <p>{method === 'login' ? 'Inicia sesión para continuar' : 'Registrate para continuar'}</p>
        </div>
        <p className="text-sm mt-2 text-secondary">{method === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'} <button onClick={toggleMethod} className="font-semibold text-foreground">{method === 'login' ? 'Regístrate' : 'Inicia sesión'}</button></p>
        <form onSubmit={handleSubmit} className="mt-4">
            {method === 'register' && <InputForm type="text" id="name" name="name" placeholder="Nombre" required/>}
            <InputForm maxLength={255} type="email" id="email" name="email" placeholder="Correo electrónico" required/>
            <InputForm maxLength={72} minLength={method === 'register' ? 8 : undefined} type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Contraseña" required/>
            <div className="mt-2">
                <CheckboxForm label="Mostrar contraseña" name="showPassword" onChange={togglePassword}/>
            </div>
            <div className="mt-6">
                {method === 'login' && <p className="text-xs text-secondary">Olvide mi contraseña, <Link className="font-semibold text-foreground" href='/auth/forgot'>Recuperar</Link></p>}
            </div>
            <div className="mt-2">
                <ButtonForm disabled={isSending}>{method === 'login' ?  'Iniciar sesión': 'Regístrarme'}</ButtonForm>
            </div>
        </form>
    </div>
  )
}

export default AuthPage