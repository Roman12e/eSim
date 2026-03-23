import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import SearchInput from "../../shared/ui/SearchInput/SearchInput";


import PopularDestinations from "../../features/ui/popular-destination/PopularDestination";


function HeaderExplore({
    data,
    loading,
    searchCountry,
    setSearchCountry,
    setFilteredCountry,
    setIsSearch,
    isSearch
}) {
    const [allCountries, setAllCountries] = useState([]);
    const [destination, setDestination] = useState([]);

    useEffect(() => {
        if (!loading && data) {
            const popular = data
                .slice(10)
                .filter(item => item.popularity_position <= 5 && item.popularity_position != null);

            setDestination(popular);
            setAllCountries(data.slice(10));
            setFilteredCountry(data.slice(10));
        }
    }, [loading, data]);

    const filterContries = (text) => {
        setSearchCountry(text);

        if (!text) {
            setFilteredCountry(allCountries);
            setIsSearch(false);
            return;
        }

        setIsSearch(true);

        const updated = allCountries.filter((country) =>
            country.country_name.toLowerCase().includes(text.toLowerCase())
        );

        setFilteredCountry(updated);
    };

    return (
        <View style={{ width: '100%' }}>
            <SearchInput
                value={searchCountry}
                onChangeText={filterContries}
            />

            {!loading && !isSearch && (
                <View style={{ marginBottom: 25 }}>
                    <Text style={{ fontSize: 17, fontWeight: '600', marginTop: 25 }}>
                        Popular Destinations
                    </Text>
                    <PopularDestinations data={destination} />
                </View>
            )}
        </View>
    );
}

export default HeaderExplore;