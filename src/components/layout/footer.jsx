import React from 'react'
import AntonFont from '../fonts/anton'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-gray-100 flex-1 flex flex-col items-center p-page'>
        <h2 className='text-2xl font-bold'><AntonFont>POFF</AntonFont></h2>
        <h3 className=''>Perla de Occidente Flag Football</h3>
        <h4 className='text-sm text-secondary'>Liga de Flag Football en Guadalajara, Jalisco</h4>
        <h5 className='text-xs text-secondary'>© 2024 Liga POFF</h5>
        <p className='text-xs text-secondary mt-2'>
            Facebook: <Link className='text-foreground' href='https://www.facebook.com/profile.php?id=100063763621220'>POFF Perla de Occidente Flag Football</Link>
        </p>
        <p className='text-xs text-secondary'>
            Instagram: <Link className='text-foreground' href='https://www.instagram.com/liga.poff?utm_source=ig_web_button_share_sheet&igsh=OGQ5ZDc2ODk2ZA=='>@liga.poff</Link>
        </p>
        <div className='flex justify-center items-center mt-4 gap-4'>
            <Image src='/images/AFFAJ.png' alt='AFFAJ' width={30} height={30} />
            <Image src='/images/FMFA.png' alt='FMFA' width={30} height={30} />
        </div>
        <p className='text-secondary text-xs mt-4'>Desarrollado por Solsoftware</p>
    </footer>
  )
}

export default Footer