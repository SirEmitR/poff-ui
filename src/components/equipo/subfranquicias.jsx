'use client'
import useFetch from '@/hooks/useFetch'
import List from '../layout/list'
import InputForm from '../form/input'
import ButtonForm from '../form/button'
import request from '@/utils/request'
import { useUsuario } from '../context/usuario-context'
import { useNotification } from '../context/notification-context'
import { useSending } from '../context/sending-context'

const Subfranquicias = ({id, normalizado}) => {
    const {data, isLoading, meta, handlePage, addItem} = useFetch({
        endpoint: `/equipos/subfranquicias/${id}`
    })
    const {usuario} = useUsuario()
    const {showSender, hideSender, isSending} = useSending();
    const {addNotification} = useNotification()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!usuario ) {
            return
        }
        const formData = new FormData(e.target)
        const nombre = formData.get('nombre')
        if (!nombre) {
            addNotification('El nombre de la subfranquicia es requerido', 'error')
            return
        }
        showSender()
        request(`/equipos/subfranquicia`, 'POST', {
            subfranquicia: nombre,
            creador: usuario.email,
            franquiciaNormalizado: normalizado,
            id
        })
        .then((response) => {
            if (response.status === 'error') {
                throw new Error(response.message)
            }
            addItem(response.data)
            addNotification('Subfranquicia creada', 'success')
            e.target.reset()
        })
        .catch((error) => {
            addNotification(error.message, 'error')
        })
        .finally(() => {
            hideSender()
        })
    }

  return (
    <section>
        <form onSubmit={handleSubmit} className="pt-6 px-4 pb-4 rounded border border-secondary flex items-end gap-4 mb-4">
            <InputForm label={'Nombre de la subfranquicia'} required={true} placeholder={'Nombre de la subfranquicia'} type={'text'} id={'nombre'} name={'nombre'} />
            <ButtonForm disabled={isSending} type={'submit'}>Crear</ButtonForm>
        </form>
        <List meta={meta} handlePage={handlePage} isLoading={isLoading}>
            {
                data?.map((item) => {
                    return <List.Item key={item.subfranquicia_normalizado} values={[item.subfranquicia, `${item.miembros} miembros`]} href={'/'} />
                })
            }
            {
                !isLoading && data?.length === 0  && (
                    <p className='text-center text-secondary'>No se encontraron resultados</p>
                )
            }
        </List>
    </section>
  )
}

export default Subfranquicias