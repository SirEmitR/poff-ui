import request from "@/utils/request";
import { useEffect, useState } from "react";

export default function useFranchise() {
    const [franchises, setFranchises] = useState([]);

    useEffect(() => {
        request('/equipos', 'GET')
        .then((response) => {
            console.log(response);
            setFranchises(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return {
        franchises
    };
}