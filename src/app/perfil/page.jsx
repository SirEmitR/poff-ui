'use client'
import { useNotification } from "@/components/context/notification-context";
import { useSending } from "@/components/context/sending-context";
import { useUsuario } from "@/components/context/usuario-context";
import Faq from "@/components/experience/faq";
import FieldView from "@/components/experience/field-view";
import Messages from "@/components/experience/messages";
import Modal from "@/components/experience/modal";
import AntonFont from "@/components/fonts/anton";
import ButtonForm from "@/components/form/button";
import ImageInput from "@/components/form/image-input";
import InputForm from "@/components/form/input";
import FormWrapper from "@/components/layout/form-wrapper";
import ProtectedRoute from "@/components/layout/protected-route"
import Credencial from "@/components/usuario/credencial"
import request from "@/utils/request";
import { useRef, useState } from "react";

const Perfil = () => {
  const {showSender, hideSender, isSending} = useSending();
  const imageRef = useRef(null);
  const {addNotification} = useNotification();
  const {usuario, loadingUsuario, editUsuario} = useUsuario();
  const [open, setOpen] = useState({
    nombre: false,
    correo: false,
    curp: false
  });
  const [openFoto, setOpenFoto] = useState(false);
  const toggleOpen = (field) => {
    setOpen({
      ...open,
      [field]: !open[field]
    })
  }

  const toggleOpenFoto = () => {
    setOpenFoto(!openFoto)
  }
  const handleUpdate = (e) => {
    e.preventDefault();
    if(!usuario) return;
    const field = e.target.name;
    const formData = new FormData(e.target);
    const data = formData.get(field) || null; 
    showSender();
    request(`/usuarios/${usuario.id}?field=${field}`, 'PUT', {data})
    .then(response => {
        if(response?.error){
          addNotification(response.error, 'error');
          return
        }
        if(response.status !== 'Ok'){
          addNotification(response.message, 'warning');
          return
        }
        addNotification(response.message, 'success');
        editUsuario(field, data);
    })
    .catch(error => {
      addNotification(error.message, 'error');
    })
    .finally(() => {
      hideSender();
      toggleOpen();
    })
  }

  const handleChangeFoto = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if(!imageRef.current.file){
      addNotification('La imagen es requerida', 'error');
      return;
    }
    formData.append('file', imageRef.current.file);
    if(!usuario) return;
    showSender();
    request(`/usuarios/${usuario.id}/foto`, 'PUT', formData, true)
    .then(response => {
      if(response?.error){
        addNotification(response.error, 'error');
        return
      }
      if(response.status !== 'Ok'){
        addNotification(response.message, 'warning');
        return
      }
      addNotification(response.message, 'success');
      editUsuario('foto', response.data.url);
    }).catch(error => {
      addNotification(error.message, 'error');
    }).finally(() => {
      hideSender();
      toggleOpenFoto();
    })
  }
  return (
    <ProtectedRoute route="/perfil">
      <FormWrapper>
        <section className="flex flex-col gap-4">
          {loadingUsuario ? 
          <>
            <div className="skeleton h-12 w-1/3 rounded"></div>
            <div>
              <div className="skeleton h-9 w-2/3 rounded"></div>
              <Credencial nombre="Cargando..." foto={null} />
            </div>
            <div className="skeleton h-9 w-2/3 rounded"></div>
            <div className="grid gap-2">
            <div className="skeleton h-6 w-2/3 rounded"></div>
            <div className="skeleton h-6 w-2/3 rounded"></div>
            </div>
            <div className=""></div>
            
          </> :
          <>
            <h1 className="text-2xl font-semibold"><AntonFont>Perfil</AntonFont></h1>
            <div>
              <h2 className="text-lg font-semibold">Credencial <AntonFont>POFF</AntonFont></h2>
              {
                !usuario?.vinculado ? <Messages type='warning'>
                No se puede generar tu credencial <AntonFont>POFF</AntonFont>, necesitas vincular tu cuenta a un <AntonFont>MIEMBRO POFF</AntonFont> (en caso de exixstir) actualizando tu CURP.
                </Messages> : <Credencial nombre={usuario?.nombre} foto={usuario?.foto || null} />
              }
            </div>
            <h2 className="text-lg font-semibold">Datos personales</h2>
            <div className="grid gap-2">
              <FieldView title='Nombre' value={usuario?.nombre} onClick={() => toggleOpen('nombre')} />
              <FieldView title='Correo electronico' value={usuario?.email} />
              <FieldView title='CURP' value={usuario?.curp} onClick={() => toggleOpen('curp')} />
            </div>
            <button onClick={toggleOpenFoto} className="px-8 py-2 text-sm w-max bg-info text-white rounded transition-colors hover:bg-primary">
              Cambiar fotografia
            </button>
            <Modal 
              props={{
                open: openFoto,
                onClose: toggleOpenFoto,
                title: 'Cambiar fotografia',
                size: 'md',
                position: 'center',
                disabled: isSending
              }}
            >
              <form onSubmit={handleChangeFoto} className="mt-8">
                <ImageInput ref={imageRef} label="Seleccionar" id="foto" name="foto" />
              </form>
            </Modal>
          </>}
        </section>
        <section className="md:mt-12">
          <Faq>
            <Faq.Question title="¿Qué es la credencial POFF?">
              <p>La credencial POFF es un documento que te identifica como miembro de la comunidad POFF, se utiliza para acceder a eventos de la liga.</p>
            </Faq.Question>
            <Faq.Question title="¿Cómo puedo generar mi credencial POFF?">
              <p>Para generar tu credencial POFF, necesitas vincular tu cuenta a un MIEMBRO POFF, posteriormente podrás generar tu credencial desde tu perfil.</p>
            </Faq.Question>
            <Faq.Question title="¿Cómo puedo actualizar mi fotografia?">
              <p>Para actualizar tu fotografia, da clic en el botón de cambiar fotografia, selecciona tu fotografia y da clic en el botón de guardar.</p>
              <p className="text-sm text-gray-500">Nota: La fotografia que utilices, si tu cuenta está vinculada a un MIEMBRO POFF, será la misma que aparezca en tu credencial POFF.</p>
            </Faq.Question>
            <Faq.Question title="¿Cómo puedo actualizar mi nombre?">
                <p>Para actualizar tu nombre, da clic en el campo de nombre y escribe tu nuevo nombre, posteriormente da clic en el botón de guardar.</p>
            </Faq.Question>
            <Faq.Question title="¿Cómo vincular mi cuenta a un MIEMBRO POFF?">
              <p>Para vincular tu cuenta a un MIEMBRO POFF, actualiza tu CURP en el campo correspondiente, en caso de existir un MIEMBRO POFF con el mismo CURP, tu cuenta se vinculará automáticamente.</p>
            </Faq.Question>
            <Faq.Question title="¿De qué sirve estar vinculado a un MIEMBRO POFF?">
              <p>Al vincular tu cuenta a un MIEMBRO POFF, podrás generar tu credencial POFF, ligar estadisticas, asistencias a tu perfil y recibir reconocimientos por eventos.</p>
            </Faq.Question>
          </Faq>
        </section>
      </FormWrapper>
      <Modal
        props={{
          open: open.nombre,
          onClose: () => toggleOpen('nombre'),
          title: 'Actualizar nombre',
          size: 'md',
          position: 'center',
          disabled: isSending
        }}
      >
        <form name="nombre" onSubmit={handleUpdate}>
          <InputForm label="Nombre" required defaultValue={usuario?.nombre} type="text" placeholder="Nombre" id='nombre' name='nombre' />
          <div className="mt-8">
            <ButtonForm disabled={isSending}>Guardar</ButtonForm>
          </div>
        </form>
      </Modal>
      <Modal
        props={{
          open: open.curp,
          onClose: () => toggleOpen('curp'),
          title: 'Actualizar CURP',
          size: 'md',
          position: 'center',
          disabled: isSending
        }}
      >
        <form name="curp" onSubmit={handleUpdate}>
          <InputForm label="CURP" defaultValue={usuario?.curp} type="text" placeholder="CURP" id='curp' name='curp' />
          <div className="mt-8">
            <ButtonForm disabled={isSending}>Guardar</ButtonForm>
          </div>
        </form>
      </Modal>
    </ProtectedRoute>
  )
}

export default Perfil