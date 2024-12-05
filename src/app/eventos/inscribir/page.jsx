'use client'
import FieldView from "@/components/experience/field-view"
import AntonFont from "@/components/fonts/anton"
import Fases from "@/components/layout/fases"
import FormWrapper from "@/components/layout/form-wrapper"
import { useSearchParams } from "next/navigation"
const Inscirbir = () => {
  const [normalizadoParam, nombreParam] = useSearchParams()
  const normalizado = normalizadoParam[1]
  const nombre = nombreParam[1]

  //Logica para inscribir
  // 1.- Seleccionar y almacenar la franquicia
  const [franquicia, setFranquicia] = useState(null)
  // 1.1.- Manejar el cambio de franquicia
  const handleFranquiciaChange = (e) => {
    setFranquicia(e.target.value)
  }

  return (
    <main className="p-page">
      <h1 className="text-2xl font-semibold"><AntonFont>Inscripción</AntonFont></h1>
      <FormWrapper className='mt-4'>
        <section>
          <FieldView title="Evento" value={nombre} />
          <div className="mt-4">
            <Fases>
              <Fases.Fase>
                <p className="text-secondary">Selecciona una franquicia</p>
              </Fases.Fase>
              <Fases.Fase>
                <p className="text-secondary">Selecciona todas las subfranquicias que participarán</p>
              </Fases.Fase>
              <Fases.Fase>
                <p className="text-secondary">Selecciona todas las ramas en las que participarán</p>
              </Fases.Fase>
            </Fases>
          </div>
        </section>
      </FormWrapper>
    </main>
  )
}

export default Inscirbir

const SeleccionarFranquicia = ({onChange}) => {
  return (
    <section>
      <h2 className="text-lg font-semibold">Selecciona una franquicia</h2>
    </section>
  )
}