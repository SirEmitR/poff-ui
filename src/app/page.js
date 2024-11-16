import AntonFont from "@/components/fonts/anton";
import Square from "@/components/layout/square";
import OswaldFont from "@/components/fonts/oswald";
import Link from "next/link";
import Tooltip from "@/components/experience/tooltip";

export default function Home() {
  return (
    
   <main className="p-page">
      <section className="grid grid-cols-2 grid-rows-2 gap-6">
        <Square cols={2} rows={1}>
          <video className=' w-full h-full object-cover pointer-events-none rounded' playsInline autoPlay loop muted>
            <source src='/videos/poffvideo25.mp4' type='video/mp4' />
          </video>
          <div className="absolute left-0 right-0 top-0 bottom-0 w-full h-full backdrop-blur-[3px] bg-black/30 flex flex-col justify-between items-center p-8">
            <div>
              <h1 className='text-white sm:text-4xl text-3xl uppercase text-center mt-6 sm:pt-0'>
                <AntonFont>Perla de Occidente Flag Football</AntonFont>
              </h1>
              <h2 className='mt-8 max-w-sm text-sm text-gray-200 p-poff uppercase text-center mx-auto'>
                El mejor nivel, la mejor liga.
              </h2>
            </div>
            <Link href='/contacto' className="uppercase font-semibold bg-black text-white px-8 transition-shadow py-2 rounded hover:shadow-sm hover:shadow-white/20">
             <OswaldFont>
              ¡Quiero jugar!
              </OswaldFont>
            </Link>
          </div>
        </Square>
        <Square cols={1} rows={1}>
          <div className="w-full h-full flex flex-col gap-2 items-center p-4">
            <img 
              style={{
                filter: 'drop-shadow(0 0 0.5rem rgba(0,0,0,0.2))'
              }}
              src="/images/infantiles.png" alt="Infantiles" className="w-full h-auto object-contain rounded transform translate-x-14 translate-y-12 scale-125" />
            <div className="absolute left-0 right-0 top-0 bottom-0 w-full h-full flex flex-col justify-between items-center p-8">
            <div className="absolute top-4 right-4">
              <Tooltip message="U8, U10, U12, U14, U16" position="left">
                ?
              </Tooltip>
            </div>
            <div>
              <h3 className='text-2xl uppercase text-center sm:pt-0'>
                <AntonFont>Infantiles</AntonFont>
              </h3>
              <h4 className='max-w-sm text-secondary text-sm text-center mx-auto'>
                Los ayudamos a crecer
              </h4>
            </div>
            <Link href='/contacto' className="uppercase font-semibold bg-black text-white px-8 transition-shadow py-2 rounded hover:shadow-sm hover:shadow-white/20">
             <OswaldFont>
              ¡Me interesa!
              </OswaldFont>
            </Link>
          </div>
          </div>
        </Square>
        <Square cols={1} rows={1}>
          <div className="w-full h-full flex flex-col bg-foreground gap-2 items-center p-4">
            <img 
              style={{
                filter: 'drop-shadow(0 0 0.5rem rgba(0,0,0,0.2))'
              }}
              src="/images/nocturno.png" alt="Nocturno" className="w-auto h-auto object-contain rounded transform translate-x-14 translate-y-6" />
            <div className="absolute left-0 right-0 top-0 bottom-0 w-full h-full flex flex-col justify-between items-center p-8">
            <div className="absolute top-4 right-4">
              <Tooltip message="Varonil, Femenil y Mixto libre" position="left" color="white">
                ?
              </Tooltip>
            </div>
            <div>
              <h3 className='text-2xl text-background uppercase text-center sm:pt-0'>
                <AntonFont>Nocturno</AntonFont>
              </h3>
              <h4 className='max-w-sm text-secondary text-sm text-center mx-auto'>
                Miercoes y Jueves
              </h4>
            </div>
            <Link href='/contacto' className="uppercase font-semibold bg-black text-white px-8 transition-shadow py-2 rounded hover:shadow-sm hover:shadow-white/20">
             <OswaldFont>
              ¡Me interesa!
              </OswaldFont>
            </Link>
          </div>
          </div>
        </Square>
      </section>
   </main>
  );
}
