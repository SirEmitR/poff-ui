'use client'

import useFetch from "@/hooks/useFetch"
import FormWrapper from "../layout/form-wrapper"
import Square from "../layout/square"
import List from "../layout/list"

const RamasCategorias = ({id, normalizado}) => {
    console.log(id, normalizado)
    return (
        <FormWrapper>
            <Ramas id={id} normalizado={normalizado} />
        </FormWrapper>
    )
}

export default RamasCategorias


const Ramas = ({id, normalizado }) => {
    const {data, loading} = useFetch({endpoint: `/eventos/ramas/${id}`})
    return (
        <>
            {
                loading ? (
                    <>
                        <Square isLoading></Square>
                        <Square isLoading></Square>
                        <Square isLoading></Square>
                    </>
                ) : (
                    <>
                        {
                            data?.map((item) => (
                                <Square key={item.id_rama}>
                                    <div className="p-6 h-full relative">
                                        <h2 className="text-xl font-bold text-gray-700 mb-6">{item.rama}</h2>
                                        <Categorias evento={id} rama={item} normalizado={normalizado} />
                                    </div>
                                </Square>
                            ))
                        }
                        {
                            data?.length === 0 && (
                                <p className='text-center text-secondary'>No se encontraron resultados</p>
                            )
                        }
                    </>
                )
            }
        </>
    )
}


const Categorias = ({evento, rama, normalizado}) => {
    const {data, loading} = useFetch({endpoint: `/eventos/categorias/${evento}/${rama.id_rama}`})
    return (
        <List isLoading={loading}>
            {
                data?.map((item) => (
                    <List.Item key={item.id_categoria} values={[item.categoria]} href={`/eventos/${normalizado}/${rama.rama_normalizado}/${item.categoria_normalizado}`} />
                ))
            }
            {
                data?.length === 0 && (
                    <p className='text-center text-secondary'>No se encontraron resultados</p>
                )
            }
        </List>
    )
}