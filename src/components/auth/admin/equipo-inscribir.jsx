'use client'
import { useUsuario } from '@/components/context/usuario-context'
import Link from 'next/link'

const EquipoInscribir = ({normalizado, nombre}) => {
    const {isAuthenticated, loading} = useUsuario()
    return (
        <>
            {
                isAuthenticated && (
                    <div className='my-2'>
                        <Link href={`/eventos/inscribir?evento=${normalizado}&nombre=${nombre}`} className="btn btn-info">Inscribir mi equipo</Link>
                    </div>
                )
            }
        </>
    )
}

export default EquipoInscribir