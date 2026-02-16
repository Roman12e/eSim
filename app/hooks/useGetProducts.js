import axios from "axios";
import { useEffect, useState } from "react";


const getServerUrl = () => {
    return `http://192.168.0.100:5000`;
};


export const useGetProducts = (countryName) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${getServerUrl()}/get-products`, {
                    params: { country: countryName }
                });
                setData(res.data.products);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [countryName]);

    return { data, error, loading };
};