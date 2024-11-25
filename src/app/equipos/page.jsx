'use client'
import EquipoButtons from "@/components/auth/equipo-buttons"
import AntonFont from "@/components/fonts/anton"
import SearchInput from "@/components/form/search"
import List from "@/components/layout/list"
import useFranchise from "@/hooks/useFranchise"

const Equipos = () => {
  const {franchises, loading, fetchData} = useFranchise();
  return (
    <main className="p-page">
        <h1 className="text-2xl font-semibold"><AntonFont>Equipos</AntonFont></h1>
        <EquipoButtons />
      <div className="mt-6">
        <SearchInput length={3} endpoint='/equipos' fetchData={fetchData} />
      </div>
      <section className="mt-2">
        <List isLoading={loading}>
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