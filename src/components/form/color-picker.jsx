'use client'
const colores = [
"#FF0000", // Rojo
  "#FFA500", // Naranja
  "#FFFF00", // Amarillo
  "#008000", // Verde
  "#0000FF", // Azul
  "#800080", // Púrpura
  "#FFC0CB", // Rosa
  "#808080", // Gris
  "#800000", // Marrón
  "#FF4500", // Anaranjado
  "#FFD700", // Oro
  "#00FFFF", // Cyan
  "#000080", // Azul marino
  "#FF00FF", // Magenta
  "#008080", // Verde azulado
  "#DC143C", // Carmesí
  "#7FFF00", // Verde chartreuse
  "#FF69B4", // Rosa claro
  "#B8860B", // Dorado oscuro
  "#D2B48C", // Beige
  "#556B2F", // Verde oliva oscuro
  "#8B008B", // Índigo
  "#2E8B57", // Verde mar oscuro
  "#4682B4", // Azul acero
  "#20B2AA", // Verde azulado claro
  "#6A5ACD", // Azul pizarra
  "#F4A460", // Marrón oscuro
  "#808000", // Oliva
  "#BDB76B", // Caqui
  "#32CD32", // Verde lima
  "#FA8072", // Salmon
  "#4169E1", // Azul real
  "#6B8E23", // Verde oliva
  "#A0522D", // Siena
  "#FF8C00", // Naranja oscuro
  "#BA55D3", // Orquídea
  "#FF6347", // Tomate
  "#8A2BE2", // Azul violeta
  "#4B0082", // Índigo oscuro
  "#9370DB", // Púrpura medio
  "#00FA9A", // Verde mar claro
  "#40E0D0", // Turquesa
  "#8B0000", // Rojo oscuro
  "#000000", // Negro
]
const ColorPicker = ({onChange}) => {
  return (
    <div className="flex flex-wrap gap-2">
        {
            colores.map((color, index) => (
                <div key={color} className="flex color-picker">
                    <input defaultChecked={index === 0} onChange={onChange} hidden value={color} name='color' id={color} type="radio" />
                    <label htmlFor={color} className="rounded p-3 w-max border-2 border-transparent" style={{backgroundColor: color}}></label>
                </div>
            ))
        }
    </div>
  )
}

export default ColorPicker