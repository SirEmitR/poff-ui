import EquipoAdmin from "@/components/auth/admin/equipo-admin"
import Subfranquicias from "@/components/equipo/subfranquicias"
import Faq from "@/components/experience/faq"
import FormWrapper from "@/components/layout/form-wrapper"
import TeamHero from "@/components/layout/team-hero"
import request from "@/utils/request"

const EquipoNormalizado =  async ({params }) => {
    const { normalizado } = await params
    const response = await request(`/equipos/${normalizado}`)
    if(response.status === 'error') {
        throw new Error(response.message)
    }
    const {data} = response
    return (
        <main className="p-page">
            <TeamHero 
                nombre={data.franquicia} 
                logo={data.logo}
                tipoFondo={data.tipo_fondo}
                fondo={data.fondo}
            />
            <div className="my-2">
                <EquipoAdmin />
            </div>
            
            <section className="mt-6">
               <FormWrapper>
               <div>
                <h2 className="text-xl font-bold mb-2">Subfranquicias</h2>
                    <Subfranquicias id={data.id_folio_franquicia} normalizado={data.franquicia_normalizado} />
               </div>
                <div className="md:mt-8">
                    <Faq>
                        <Faq.Question title="¿Qué es una subfranquicia?">
                            <p>
                                Una subfranquicia es una división de un equipo para poder diferenciar y dividir a los jugadores, de manera que un mismo equipo pueda registrar una o más subfranquicias a una misma categoria de algun evento.
                            </p>
                        </Faq.Question>
                        <Faq.Question title="¿Cómo puedo editar mi equipo?">
                            <p>
                                Para editar tu equipo debes ir al {'"Panel de administración"'} y seleccionar la opción de {'"Editar equipo"'}.
                            </p>
                        </Faq.Question>
                        <Faq.Question title="¿Cómo puedo agregar un miembro (Jugador, Coach, Manager) a una subfranquicia?">
                            <p>
                                Para agregar un miembro a una subfranquicia debes seleccionar la subfranquicia y dar clic en el botón de agregar miembro.
                            </p>
                            <p className="text-sm text-gray-500">
                                Nota: Solo los administradores podrán agregar miembros a una subfranquicia.
                            </p>
                        </Faq.Question>

                        <Faq.Question title="¿Cómo puedo crear una subfranquicia?">
                            <p>
                                Para crear una subfranquicia debes llena el formulario con el nombre de la subfranquicia y dar clic en el botón de crear.
                            </p>
                        </Faq.Question>
                        <Faq.Question title="¿Qué información puedo ver de un equipo?">
                            <ul className="px-4">
                                <li>- Nombre del equipo</li>
                                <li>- Logo del equipo</li>
                                <li>- Subfranquicias</li>
                                <li>- Eventos inscritos</li>
                                <li>- Estadisticas</li>
                                <li>- Roster</li>
                            </ul>
                        </Faq.Question>
                        <Faq.Question title="¿Quién puede ver las asistencias de un equipo?">
                            <p>
                                Las asistencias de un equipo solo pueden ser vistas por los administradores del equipo y la liga.
                            </p>
                        </Faq.Question>
                    </Faq>
                </div>
               </FormWrapper>
            </section>
        </main>
    )
}

export default EquipoNormalizado