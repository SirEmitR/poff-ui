'use client'
import { useNotification } from '@/components/context/notification-context';
import { useSending } from '@/components/context/sending-context';
import { useUsuario } from '@/components/context/usuario-context';
import Faq from '@/components/experience/faq';
import Modal from '@/components/experience/modal';
import AntonFont from '@/components/fonts/anton'
import ButtonForm from '@/components/form/button';
import CodigoInput from '@/components/form/codigo';
import ColorPicker from '@/components/form/color-picker';
import ImageInput from '@/components/form/image-input';
import InputForm from '@/components/form/input'
import RadioGroup from '@/components/form/radio-group';
import { ImageIcon, SwatchIcon } from '@/components/icons';
import Fases from '@/components/layout/fases';
import FormWrapper from '@/components/layout/form-wrapper';
import TeamHero from '@/components/layout/team-hero';
import uploadFile from '@/utils/file';
import request from '@/utils/request';
import Link from 'next/link';
import { useRef, useState } from 'react';

const CrearEquipo = () => {
    const {showSender, hideSender, isSending} = useSending();
    const {usuario} = useUsuario();
    const fasesRef = useRef();
    const {addNotification} = useNotification();
    const imageRef = useRef(null);
    const fondoRef = useRef(null);
    const formRef = useRef(null);
    const [openFoto, setOpenFoto] = useState(false);
    const [openFotoFondo, setOpenFotoFondo] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [teamData, setTeamData] = useState({
        nombre: '',
        logo: null,
        tipoFondo: 'color',
        fondo: '#FF0000'
    })

    const toggleOpenFoto = () => {
        setOpenFoto(!openFoto)
    }

    const toggleOpenFotoFondo = () => {
        setOpenFotoFondo(!openFotoFondo)
    }

    const toggleTipoFondo = (tipo) => {
        setTeamData({
            ...teamData,
            tipoFondo: tipo
        })
    }

    const handleColor = (e) => {
        setTeamData({
            ...teamData,
            fondo: e.target.value
        })
    }

    const toggleOpenView = () => {
        if(!openView){
            let newTeamData = {...teamData}
            if(formRef.current){
                if(formRef.current.checkValidity()){
                    const formData = new FormData(formRef.current)
                    const nombre = formData.get('nombre')
                    if(imageRef.current){
                        if(!imageRef.current.preview){
                            addNotification('El logo del equipo es requerido', 'error')
                            return
                        }else{
                            newTeamData.logo = imageRef.current?.preview
                        }
                    }
                    if(teamData.tipoFondo === 'foto'){
                        if(fondoRef.current){
                            if(!fondoRef.current.preview){
                                addNotification('La foto de fondo es requerida', 'error')
                                return
                            }else{
                                newTeamData.fondo = fondoRef.current?.preview
                            }
                        }
                    }
                    setTeamData({
                        ...newTeamData,
                        nombre
                    })
                }else{
                    addNotification('El nombre del equipo es requerido', 'error')
                    return
                }
            }
        }
        setOpenView(!openView)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!usuario) return
        const formData = new FormData(formRef.current)
        const nombre = formData.get('nombre')
        let logo = null
        if(imageRef.current){
            if(imageRef.current.file){
                logo = imageRef.current.file
            }
        }
        let fondo = teamData.fondo
        if(teamData.tipoFondo === 'foto'){
            if(fondoRef.current){
                if(fondoRef.current.file){
                    fondo = fondoRef.current.file
                }else{
                    addNotification('La foto de fondo es requerida', 'error')
                    return
                }
            }else{
                addNotification('La foto de fondo es requerida', 'error')
                return
            }
        }

        const data = {
            nombre,
            logo,
            fondo,
            tipoFondo: teamData.tipoFondo
        }
        setTeamData(data)
        showSender()
        request('/equipos/verifyName', 'POST', {nombre: data.nombre})
        .then(res => {
            if(res.status === 'success'){
                fasesRef.current.irAdelante()
            }else{
                addNotification(res.message, 'error')
            }
        })
        .catch(err => {
            addNotification(err.message, 'error')
        })
        .finally(() => {
            hideSender()
        })
    }

    const completeCode = async (code) => {
        if(!usuario) return
        showSender()
        try{
            const res = await request('/codigos/validate', 'POST', {codigo: code})
            if(!res.data){
                addNotification('Ocurrio un error al realizar la solicitud', 'error')
                hideSender()
                return
            }
            if(res.data.status === 'success'){
                let logo = null
                let fondo = teamData.fondo
                if(teamData.logo){
                    logo = await uploadFile(teamData.logo, 'equipos/logos')
                }
                if(teamData.tipoFondo === 'foto'){
                    if(teamData.fondo){
                        fondo = await uploadFile(teamData.fondo, 'equipos/fondos')
                    }else{
                        addNotification('La foto de fondo es requerida', 'error')
                        hideSender()
                        fasesRef.current.irAtras()
                        return
                    }
                }

                const data = {
                    franquicia: teamData.nombre,
                    logo,
                    creador: usuario.email,
                    fondo,
                    tipoFondo: teamData.tipoFondo
                }

                const response = await request('/equipos', 'POST', data)
                if(response.status === 'success'){
                    addNotification(response.data.message, 'success')
                    fasesRef.current.irAdelante()
                    hideSender()
                }else{
                    addNotification(response.data, 'error')
                    hideSender()
                    fasesRef.current.irAtras()
                    return
                }
            }else{
                addNotification(res.data.message, 'error')
                hideSender()
                return
            }
        }catch(err){
            hideSender()
            addNotification(err.message, 'error')
        }
    }

    return (
        <main className='p-page'>
            <h1 className="text-2xl font-semibold"><AntonFont>Crear equipo</AntonFont></h1>
            <FormWrapper>
                <Fases ref={fasesRef} bloquearAdelante bloquearAtras >
                    <Fases.Fase>
                        <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-4'>
                            <InputForm placeholder='Nombre del equipo' name='nombre' id='nombre' required maxLength={40} />
                            <div className='flex items-center gap-4'>
                                <button type='button' onClick={toggleOpenFoto} className="px-8 py-2 text-sm w-max bg-info text-white rounded transition-colors hover:bg-primary">
                                    Logo del equipo
                                </button>
                                <RadioGroup name='tipoFondo' title={`Tipo de fondo: ${teamData.tipoFondo}`}>
                                    <RadioGroup.Option defaultChecked onChange={() => toggleTipoFondo('color')} value='color' id='tipoFoto'><SwatchIcon className='size-5'/></RadioGroup.Option>
                                    <RadioGroup.Option onChange={() => toggleTipoFondo('foto')} value='foto' id='tipoColor'><ImageIcon className='size-5'/></RadioGroup.Option>
                                </RadioGroup>
                            </div>
                            {teamData.tipoFondo === 'color' ? <ColorPicker onChange={handleColor} /> :
                            <button type='button' onClick={toggleOpenFotoFondo} className="px-8 py-2 text-sm w-max bg-info text-white rounded transition-colors hover:bg-primary">
                                Seleccionar foto de fondo
                            </button>}
                        <button type='button' onClick={toggleOpenView} className="px-8 py-2 text-sm w-max bg-tertiary rounded">
                            Vista previa del equipo
                        </button>
                            <div className='mt-4'>
                                <ButtonForm disabled={isSending}>Crear mi equipo</ButtonForm>
                            </div>
                        </form>
                        <Modal 
                            props={{
                            open: openView,
                            onClose: toggleOpenView,
                            title: 'Vista previa del equipo',
                            size: 'md',
                            position: 'center',
                            externalClose: true
                            }}
                        >
                            <div className='mt-8'>
                                <TeamHero {...teamData} />
                            </div>
                        </Modal>
                        <Modal 
                            props={{
                            open: openFoto,
                            onClose: toggleOpenFoto,
                            title: 'Logo del equipo',
                            size: 'md',
                            position: 'center'
                            }}
                        >
                            <div className='mt-8'>
                                <ImageInput ref={imageRef} withButton={false} label="Seleccionar" id="foto" name="foto" />
                            </div>
                        </Modal>
                        <Modal 
                            props={{
                            open: openFotoFondo,
                            onClose: toggleOpenFotoFondo,
                            title: 'Foto de fondo',
                            size: 'md',
                            position: 'center'
                            }}
                        >
                            <div className='mt-8'>
                                <ImageInput ref={fondoRef} withButton={false} label="Seleccionar" id="fondo" name="fondo" />
                            </div>
                        </Modal>
                    </Fases.Fase>
                    <Fases.Fase>
                        <div className='flex flex-col justify-center items-center gap-2 mt-4'>
                            <p className='text-secondary text-sm'>Ingresa el código que te hemos proporcionado para la creación de tu equipo.</p>
                            <CodigoInput onComplete={completeCode} isSending={isSending} />
                            <p className='text-secondary text-sm'>Si no tienes un código, puedes solicitar uno <Link href='#' className='font-bold text-foreground'>aquí</Link>.</p>
                        </div>
                    </Fases.Fase>
                    <Fases.Fase>
                        <div className='flex flex-col items-center gap-4 mt-4'>
                            <p className='text-secondary text-sm'>Se ha creado tu equipo con éxito.</p>
                            <p className='text-secondary text-sm'>Ahora puedes ver tu equipo en la sección de equipos, <Link href={`/equipos`} className='font-semibold text-foreground'>Ver equipos</Link></p>
                        </div>
                    </Fases.Fase>
                </Fases>
                <Faq>
                    <Faq.Question title='¿Cómo crear un equipo?'>
                        <p>Para crear un equipo, debes completar el formulario con el nombre del equipo, un logo y un color de fondo. Luego, podrás ver una vista previa del equipo.</p>
                    </Faq.Question>
                    <Faq.Question title='¿Qué pasa si no completo el formulario?'>
                        <p>Si no completas el formulario, no podrás ver la vista previa del equipo.</p>
                    </Faq.Question>
                    <Faq.Question title='¿Puedo cambiar el logo o el color de fondo?'>
                        <p>Sí, puedes cambiar el logo y el color de fondo del equipo en cualquier momento.</p>
                    </Faq.Question>
                </Faq>
            </FormWrapper>
        </main>
  )
}

export default CrearEquipo