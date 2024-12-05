import EquipoInscribir from "@/components/auth/admin/equipo-inscribir";
import RamasCategorias from "@/components/eventos/ramas-categorias";
import AntonFont from "@/components/fonts/anton"
import request from "@/utils/request";

const EventoNormalizado = async ({
    params
}) => {
    const {normalizado} = await params;
    const response = await request(`/eventos/${normalizado}`);
    if(response.status === 'error') {
        throw new Error(response.message);
    }
    const {data} = response;
  return (
    <main className="p-page">
        <h1 className="text-2xl font-semibold"><AntonFont>{data.nombre}</AntonFont></h1>
        <EquipoInscribir normalizado={data.nombre_normalizado} nombre={data.nombre} />
        <section className="mt-6">
            <RamasCategorias id={data.id_folio_evento} normalizado={normalizado} />
        </section>
    </main>
  )
}

export default EventoNormalizado