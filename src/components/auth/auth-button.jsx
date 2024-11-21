'use client'
import Link from "next/link"
import { useUsuario } from "../context/usuario-context";
import splitName from "@/utils/split-name";

const AuthButton = () => {
  const {isAuthenticated, logout, loading, usuario} = useUsuario();
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
            <div className="flex gap-2 items-center">
              <Link href={'/perfil'} className="btn btn-secondary inverse">
                {splitName(usuario?.nombre)}
              </Link>
              <button onClick={logout} className="btn btn-tertiary">
                  Cerrar sesión
              </button>
            
            </div>
        )}
        </>
      }
    </>
  )
}

export default AuthButton