import request from "@/utils/request";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function useFranchise() {
    const [franchises, setFranchises] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback((query) => {
        setLoading(true);
        request(`/equipos?search=${query}`, 'GET')
        .then((response) => {
            setFranchises(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [])

    return {
        loading,
        fetchData,
        franchises
    };
}