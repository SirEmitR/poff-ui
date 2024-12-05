'use client'
import Faq from "@/components/experience/faq"
import Tooltip from "@/components/experience/tooltip"
import AntonFont from "@/components/fonts/anton"
import FormWrapper from "@/components/layout/form-wrapper"
import List from "@/components/layout/list"
import useFetch from "@/hooks/useFetch"

const Eventos = () => {
    const {data, loading, meta, handlePage} = useFetch({
        endpoint: '/eventos'
    })
  return (
    <main className="p-page">
        <h1 className="text-2xl font-semibold"><AntonFont>Eventos</AntonFont></h1>
        <FormWrapper>
            <section className="mt-2">
                <List isLoading={loading} meta={meta} handlePage={handlePage} hasImage>
                {
                    data?.map((item) => (
                    <List.Item key={item.id_folio_evento} values={[item.imagen, item.nombre, <Tooltip color='info' key={item.id_folio_evento}>
                        {item.tipo}
                    </Tooltip>]} hasImage href={`/eventos/${item.nombre_normalizado}`} />
                    ))
                }
                {
                    data?.length === 0 && (
                    <p className='text-center text-secondary'>No se encontraron resultados</p>
                    )
                }
                </List>
            </section>
            <section className="mt-2">
                <Faq>
                    <Faq.Question title="¿Qué es un evento?">
                        <p>
                            Un evento es una competencia (Temporada o Torneo) en la que los equipos pueden inscribirse para competir en diferentes categorias.
                        </p>
                    </Faq.Question>
                    <Faq.Question title="¿Cómo puedo inscribir mi equipo a un evento?">
                        <p>
                            Para inscribirte a un evento debes buscar el evento en la lista de eventos y hacer click en el boton {`"Inscribir mi equipo"`}.
                        </p>
                        <p className="text-sm text-secondary">Nota: Solo puedes inscribir tu equipo a un evento si eres administrador de un equipo, existen subfranquicias en el equipo y aun no ha pasado la fecha limite para las inscripciones.</p>
                    </Faq.Question>
                    <Faq.Question title="¿Qué información puedo ver de un evento?">
                        <ul className="px-4">
                            <li>- Nombre del evento</li>
                            <li>- Tipo de evento</li>
                            <li>- Categorias</li>
                            <li>- Equipos inscritos</li>
                            <li>- Fecha limite para inscribir equipos</li>
                            <li>- Fecha limite para registrar jugadores</li>
                            <li>- Estadisticas</li>
                            <li>- Calendario</li>
                            <li>- Roster</li>
                        </ul>
                    </Faq.Question>
                </Faq>
            </section>
        </FormWrapper>
    </main>
  )
}

export default Eventos