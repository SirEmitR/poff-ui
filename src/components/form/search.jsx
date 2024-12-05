import React, { useEffect, useState } from 'react'

const SearchInput = ({length, fetchData}) => {
    const [query, setQuery] = useState(""); // Lo que el usuario escribe
    const [debouncedQuery, setDebouncedQuery] = useState(""); // El query que se envía al servidor
    // Actualiza los resultados filtrados cuando el query cambia
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300); // Tiempo de espera (300 ms)

        return () => {
            clearTimeout(handler); // Limpia el timeout si el usuario sigue escribiendo
        };
    }, [query]);

    useEffect(() => {
        if (debouncedQuery.length >= length) {
            fetchData({
                search: debouncedQuery
            });
        }else{
            fetchData({search: ''});
        }
    }, [length, debouncedQuery, fetchData]);
  
    return (
    <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className='px-4 py-2 w-full border border-gray-300 rounded outline-none'
      />
    );
  };

export default SearchInput