'use client'
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { CheckIcon, ChevronRightIcon } from '../icons';

const Fase = ({ children }) => {
  return <div>{children}</div>;
};

const Fases = forwardRef(({ children, bloquearAdelante = false, bloquearAtras = false }, ref) => {
  const [faseActual, setFaseActual] = useState(0);
  const totalFases = React.Children.count(children);

  const irAdelante = () => {
    if (faseActual < totalFases - 1 ) {
      setFaseActual((prev) => prev + 1);
    }
  };

  const irAtras = () => {
    if (faseActual > 0 ) {
      setFaseActual((prev) => prev - 1);
    }
  };

  useImperativeHandle(ref, () => ({
    irAdelante,
    irAtras
  }));

  return (
    <div className=''>
    <div style={{ flex: 1, textAlign: 'center' }}>
        {React.Children.toArray(children)[faseActual]}
      </div>
    <div className='grid grid-cols-8 items-center'>
      <div className='col-span-8 flex justify-center gap-2 mt-6'>
        {
          Array.from({ length: totalFases - 1 }).map((_, index) => (
            <div
              key={index}
              className={`p-1 flex justify-center items-center mx-1 ${faseActual === index ? 'text-info font-bold' : 'text-secondary'}`}  
            >
              <p className='size-5 text-center'>{index + 1}</p>
            </div>
          ))
        }
        <div
          className={`p-1 flex justify-center items-center rounded-full mx-1 ${faseActual === totalFases - 1 ? 'bg-success text-white' : 'text-secondary'}`}
        >
          <CheckIcon className='size-5' />
        </div>
      </div>
        {faseActual > 0 && !bloquearAtras && (
            <button onClick={irAtras} className='col-start-1 mt-2'>
              <ChevronRightIcon style={{ transform: 'rotate(180deg)' }} />
            </button>
        )}
        {faseActual < totalFases - 1 && !bloquearAdelante && (
            <button onClick={irAdelante} className='col-start-8 mt-2 flex justify-end'>
                <ChevronRightIcon />
            </button>
        )}
    </div>
    </div>
  );
});

Fases.displayName = 'Fases';
Fases.Fase = Fase;

export default Fases;
