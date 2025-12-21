import axios from "axios";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { Alert } from "react-native";


const bearerToken = Constants.expoConfig.extra.bearerToken;

export const useGetProducts = (reloadKey, setReloadKey, countryName) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    if (reloadKey === 5) {
        Alert.alert("Too many request", "Please try again later");
        setReloadKey(0);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                formData.append('area', countryName);

                const response = await axios.post('https://api.bnesim.com/v2.0/enterprise/products/get-products', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${bearerToken}`,
                    },
                });

                console.log('Sim products fetched successfully');
                setData(response.data.products);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching regions and countries:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [reloadKey]);

    return { data, error, loading };
};