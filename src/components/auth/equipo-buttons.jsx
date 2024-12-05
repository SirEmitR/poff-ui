'use client'
import Link from "next/link"
import { useUsuario } from "../context/usuario-context"

const EquipoButtons = () => {
    const {isAuthenticated, loading} = useUsuario()
    return (
        <>
            {
                loading ? <div className="flex gap-2 mt-4">
                    <div className="skeleton px-16 h-7 rounded"></div>
                    <div className="skeleton px-16 h-7 rounded"></div>
                    <div className="skeleton px-16 h-7 rounded"></div>
                </div> : 
                <>
                  {isAuthenticated && (
                    <div className="flex gap-2 mt-4">
                        <Link href='/equipos/crear' className="btn btn-info">Crear equipo</Link>
                        <button className="btn btn-tertiary">Mis equipos</button>
                    </div>
                )}
                </>
            }
        </>
    )
}

export default EquipoButtons