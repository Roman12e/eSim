import axios from "axios";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const bearerToken = Constants.expoConfig.extra.bearerToken;


export const useGetRegions = (reloadKey, setReloadKey, setLoadingIndicator) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    if (reloadKey === 5) {
        Alert.alert("Too many request", "Please try again later");
        setReloadKey(0);
    }

    useEffect(() => {
        setLoadingIndicator(true);
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.bnesim.com/v2.0/enterprise/products/get-regions-countries', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${bearerToken}`
                    }
                });
                console.log('Regions and Countries fetched successfully');
                setData(response.data.areas);
            } catch (err) {
                console.error('Error fetching regions and countries:', err);
                setError(err);
            } finally {
                setLoading(false);
                setLoadingIndicator(false);
            }
        };

        fetchData();
    }, [reloadKey]);

    return { data, error, loading };
};