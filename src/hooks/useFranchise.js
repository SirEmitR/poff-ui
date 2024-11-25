import { useNotification } from "@/components/context/notification-context";
import request from "@/utils/request";
import { useCallback, useEffect, useState } from "react";

export default function useFranchise() {
    const {addNotification} = useNotification();
    const [franchises, setFranchises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [meta, setMeta] = useState({});
    const [query, setQuery] = useState('');
    const [offset, setOffset] = useState('');

    const fetchData = useCallback((query, pageFind) => {
        const offset1 = pageFind ? `&page=${pageFind}` : '';
        setQuery(query);
        setOffset(offset1);
    }, [])

    const handlePage = useCallback((page) => {
        const offset1 = page ? `&page=${page}` : '';
        console.log(offset1)
        setOffset(offset1);
    }, [])

    useEffect(() => {
        const max = '&maxResults=10';
        setLoading(true);
        request(`/equipos?search=${query}${max}${offset}`, 'GET')
        .then((response) => {
            if(response.status === 'error') {
                addNotification(response.message, 'error');
                return;
            }
            console.log(response)
            setFranchises(response.data);
            setMeta(response.meta);
        })
        .catch((error) => {
            addNotification('Ocurrió un error al cargar los equipos', 'error');
        })
        .finally(() => {
            setLoading(false);
        });
    }, [query, offset]);


    return {
        loading,
        fetchData,
        franchises,
        meta,
        handlePage
    };
}