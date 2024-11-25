'use client'
import EquipoButtons from "@/components/auth/equipo-buttons"
import AntonFont from "@/components/fonts/anton"
import List from "@/components/layout/list"
import useFranchise from "@/hooks/useFranchise"

const Equipos = () => {
  const {franchises} = useFranchise();
  return (
    <main className="p-page">
        <h1 className="text-2xl font-semibold"><AntonFont>Equipos</AntonFont></h1>
        <EquipoButtons />

      <section className="mt-6">
        <List>
          {
            franchises.map((franchise) => (
              <List.Item key={franchise.id_folio_franquicia} image={franchise.logo} name={franchise.franquicia} href={`/equipos/${franchise.franquicia_normalizado}`} />
            ))
          }
        </List>
      </section>
    </main>
  )
}

export default Equipos