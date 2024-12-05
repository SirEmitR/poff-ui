'use client'

import AntonFont from "@/components/fonts/anton"

const Error = ({ error, reset }) => {
  return (
    <main className="p-page">
        <h1 className="text-2xl font-semibold text-red-500"><AntonFont>Ha ocurrido un error</AntonFont></h1>
        <p className="mt-4 text-secondary">Lo sentimos, ha ocurrido un error inesperado.</p>
        <p className="mb-4">{error.message}</p>
        <button onClick={reset} className="btn bg-foreground text-white">Recargar</button>
    </main>
  )
}

export default Error