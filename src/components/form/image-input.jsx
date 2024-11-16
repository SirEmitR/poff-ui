'use client';

import { forwardRef, useState } from 'react';
import ImageLoad from '../experience/image-load';
import ButtonForm from './button';

const ImageInput = forwardRef(({
  id,
  name,
  label,
  onChange,
  error,
  disabled,
  required
}, ref) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      if(ref) ref.current = file;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='grid grid-cols-2 gap-2 items-center'>
      <div className=' flex justify-center col-span-2 items-center'>
        <div className='h-52 w-52'>
          <ImageLoad src={preview} alt={label} />
        </div>
      </div>
      <span className='col-span-2 text-secondary text-xs'>Vista previa en tamaño 208x208px</span>
      <label className="px-4 py-2 text-center cursor-pointer rounded bg-info text-white" htmlFor={id}>{label}</label>
      <ButtonForm>Guardar</ButtonForm>
      <input
        hidden
        type="file"
        id={id}
        name={name}
        onChange={(e) => {
          handleChange(e);
          if (onChange) onChange(e);
        }}
        disabled={disabled}
        required={required}
        accept='image/*'
      />
    </div>
  );
});

ImageInput.displayName = 'ImageInput';
export default ImageInput;
