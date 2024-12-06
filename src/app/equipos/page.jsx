'use client'
import EquipoButtons from "@/components/auth/equipo-buttons"
import AntonFont from "@/components/fonts/anton"
import SearchInput from "@/components/form/search"
import List from "@/components/layout/list"
import useFetch from "@/hooks/useFetch"

const Equipos = () => {
  const {data, loading, fetchData, meta, handlePage} = useFetch({
    endpoint: '/equipos',
  });
  return (
    <main className="p-page">
        <h1 className="text-2xl font-semibold"><AntonFont>Equipos</AntonFont></h1>
        <EquipoButtons />
      <div className="mt-6">
        <SearchInput length={3} endpoint='/equipos' fetchData={fetchData} />
      </div>
      <section className="mt-2">
        <List isLoading={loading} meta={meta} handlePage={handlePage} hasImage>
          {
            data?.map((item) => (
              <List.Item key={item.id_folio_franquicia} values={[item.logo, item.franquicia]} hasImage href={`/equipos/${item.franquicia_normalizado}`} />
            ))
          }
          {
            data?.length === 0 && (
              <p className='text-center text-secondary'>No se encontraron resultados</p>
            )
          }
        </List>
      </section>
    </main>
  )
}

export default Equipos