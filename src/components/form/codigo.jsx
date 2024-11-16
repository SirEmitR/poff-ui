'use client'
import React, { useRef, useState } from 'react';

const CodigoInput = ({ length = 6, onComplete, isSending = false }) => {
  const [codigo, setCodigo] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const newCodigo = [...codigo];
    newCodigo[index] = e.target.value.toUpperCase();
    setCodigo(newCodigo);

    // Moverse al siguiente cuadro automáticamente si el carácter está completo
    if (e.target.value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    // Llamar a onComplete si se ha llenado todo el código
    if (newCodigo.every((char) => char !== '')) {
      onComplete(newCodigo.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (codigo[index] === '' && index > 0) {
        // Moverse al cuadro anterior si el actual está vacío
        inputsRef.current[index - 1].focus();
      }

      const newCodigo = [...codigo];
      newCodigo[index] = ''; // Eliminar el carácter actual
      setCodigo(newCodigo);
    }
  };

  const handleFocus = (index) => {
    inputsRef.current[index].select();
  };

  return (
    <div className='flex gap-2'>
      {codigo.map((_, index) => (
        <input
          key={index}
          type="text"
          disabled={isSending}
          maxLength="1"
          value={codigo[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={() => handleFocus(index)}
          ref={(el) => (inputsRef.current[index] = el)}
          className='w-10 h-10 text-center border rounded active:border-secondary transition-colors focus:border-secondary outline-none disabled:bg-gray-100'
        />
      ))}
    </div>
  );
};

export default CodigoInput;
