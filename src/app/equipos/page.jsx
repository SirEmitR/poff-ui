import EquipoButtons from "@/components/auth/equipo-buttons"
import AntonFont from "@/components/fonts/anton"

const Equipos = () => {
  return (
    <main className="p-page">
        <h1 className="text-2xl font-semibold"><AntonFont>Equipos</AntonFont></h1>
        <EquipoButtons />
    </main>
  )
}

export default Equipos