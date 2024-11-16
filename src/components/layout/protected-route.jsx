'use client'
import { useEffect } from "react"
import { useUsuario } from "../context/usuario-context"
import { useRouter } from "next/navigation"
import { useNotification } from "../context/notification-context"

export default function ProtectedRoute({
    children,
    route = '/',
}){
    const {isAuthenticated, loading} = useUsuario()
    const {addNotification} = useNotification()
    const router = useRouter()

    useEffect(() => {
        if(!loading && !isAuthenticated){
            router.push(`/auth?returnUrl=${route}`)
            addNotification('Necesitas iniciar sesión para acceder a esta página', 'warning')
        }
    }, [isAuthenticated, loading])

    return (
      <main className="p-page">
          {
              isAuthenticated ? children : <>
                {
                    loading ? <p className="text-center text-secondary">Estamos obteniendo la información de tu cuenta.
                    </p> : <p className="text-center">Te estamos redirigiendo a la página de inicio de sesión</p>
                }
              </>
          }
      </main>
    )
}


