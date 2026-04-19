import axios from "axios";
import { useEffect, useState } from "react";


const getServerUrl = () => {
    return `https://esimserver.onrender.com`;
};


export const useGetProducts = (countryName) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await axios.get(`${getServerUrl()}/get-products`, {
                params: { country: countryName },
                timeout: 10000
            });

            if (countryName === "Europe") {
                const newProducts = res.data.map(product => {
                    const coverage = product.product_coverage || [];
                    const georgiaExists = coverage.some(
                        c => c.country_iso2 === "GE"
                    );

                    if (!georgiaExists) {
                        return {
                            ...product,
                            product_coverage: [
                                ...coverage,
                                {
                                    country_iso2: "GE",
                                    country_name: "Georgia"
                                }
                            ]
                        };
                    }

                    return product;
                });

                setData(newProducts);
            } else {
                setData(res.data);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [countryName]);

    return { data, error, loading, retry: fetchData };
};