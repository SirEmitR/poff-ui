'use client'
import Link from "next/link"
import { useUsuario } from "../context/usuario-context";

const AuthButton = () => {
  const {isAuthenticated, logout, loading} = useUsuario();
  return (
    <>
      {
        loading ? <div className="skeleton px-14 h-7 rounded"></div> : 
        <>
          {!isAuthenticated ? (
            <Link href={'/auth'} className="btn btn-tertiary">
              Iniciar sesión
          </Link>
        ): (
            <button onClick={logout} className="btn btn-tertiary">
                Cerrar sesión
            </button>
        )}
        </>
      }
    </>
  )
}

export default AuthButton