import axios from "axios";
import { useEffect, useState } from "react";


const getServerUrl = () => {
    return `https://esimserver.onrender.com`;
};


export const useGetRegions = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);

            const url = `${getServerUrl()}/get-regions`;
            const res = await axios.get(url);

            setData(res.data?.areas);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, error, loading, retry: fetchData };
};