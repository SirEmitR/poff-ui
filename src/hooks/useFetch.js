import { useNotification } from "@/components/context/notification-context";
import request from "@/utils/request";
import { useCallback, useEffect, useState } from "react";

export default function useFetch({
    endpoint,
}) {
    const {addNotification} = useNotification();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [meta, setMeta] = useState({});
    const [offset, setOffset] = useState('');

    const addItem = useCallback((newItem) => {
        setData(prev => {
            return [newItem, ...prev];
        });
    }, []);


    const fetchData = useCallback(({
        page,
        search,
        maxResults = 10,
        orderBy
    }) => {
        let query = '';
        query += page ? `&page=${page}` : '';
        query += search ? `&search=${search}` : '';
        query += maxResults ? `&maxResults=${maxResults}` : '';
        query += orderBy ? `&orderBy=${orderBy}` : '';
        setOffset(query);
    }, []);

    const handlePage = useCallback((page) => {
        const off = page ? `&page=${page}` : '';
        setOffset(prev => {
            if (prev.includes('&page')) {
                return prev.replace(/&page=\d+/, off);
            }else{
                return prev + off;
            }
        });
    }, [])

    useEffect(() => {
        if (!endpoint) {
            return;
        }
        setLoading(true);
        request(`${endpoint}?${offset.replace('&','')}`, 'GET')
            .then((response) => {
                if (response.status === 'error') {
                    throw new Error(response.message);
                }
                setData(response.data);
                setMeta(response.meta);
            })
            .catch((error) => {
                addNotification(err.message, 'error');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [offset, endpoint, addNotification]);

    return {
        loading,
        fetchData,
        handlePage,
        data,
        meta,
        addItem
    };
}