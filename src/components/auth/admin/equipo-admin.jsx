'use client'

import { useUsuario } from "@/components/context/usuario-context"
import Link from "next/link"

const EquipoAdmin = () => {
    const {isAuthenticated, loading} = useUsuario()
    return (
        <div>
            <Link href='/equipos/admin' className="btn btn-info">Panel de administrador</Link>
        </div>
    )
}

export default EquipoAdmin