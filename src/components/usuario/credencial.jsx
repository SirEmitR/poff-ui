import PoffImage from '/public/images/poff.png';
import CirculosPoff from '/public/images/circulospoff.png';
import ImageLoad from '../experience/image-load';
import AntonFont from '../fonts/anton';

const Credencial = ({
    nombre,
    foto
}) => {
  return (
    <div className="flex flex-col items-center my-4">
        <div className="relative max-w-[360px] w-full bg-white h-[200px] rounded-md shadow-md shadow-gray-700 overflow-hidden">
            <img src={PoffImage.src} alt="poff" className="w-[260px] absolute -bottom-6 -left-8 opacity-10" />
            <img src={PoffImage.src} alt="poff" className="w-[60px] z-10 absolute top-6 right-6" />
            <div className='absolute left-6 top-4 w-[100px] h-[110px] border-t-4 border-[#D8D8D8]'>
            {
                foto ? <ImageLoad 
                src={foto} 
                alt="Foto del jugador" 
                fillMode='cover' />
                : <div className='skeleton w-full h-full'/>
            }
            </div>
            <img src={CirculosPoff.src} alt="circulos" className="w-[150px] absolute top-0 right-0" />
            <div className="bg-[#D8D8D8] w-[60%] h-[10px] absolute bottom-[45%] right-0"></div>
            <h2 className='absolute text-black bottom-10 left-6 text-lg z-10'><AntonFont>PERLA DE OCCIDENTE FLAG FOOTBALL</AntonFont></h2>
            <h3 className='absolute text-black bottom-[22px] z-10 left-6'>Credencial oficial</h3>
            <p className='absolute text-black bottom-[46%] left-36 z-10 text-xs w-max'>{nombre}</p>
            <div className="bg-[#B7B7B7] w-[75%] h-[25px] absolute bottom-8"></div>
            <div className="bg-[#D8D8D8] w-[45%] h-[3px] absolute bottom-4 right-0"></div>
            <div className="bg-black w-[2px] h-[65%] absolute top-0 left-28"></div>
        </div>
    </div>
  )
}

export default Credencial