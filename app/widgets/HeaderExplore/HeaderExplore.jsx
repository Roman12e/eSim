import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

import SearchInput from "../../shared/ui/SearchInput/SearchInput";

import { useGetRegions } from "../../hooks/useGetRegions";

import PopularDestinations from "../../features/ui/popular-destination/PopularDestination";


function HeaderExplore({
    searchCountry,
    setSearchCountry,
    setFilteredCountry,
    setIsSearch,
    isSearch,
    loadingIndicator,
    setLoadingIndicator
}) {
    const [allCountries, setAllCountries] = useState([]);

    const { data, loading, error } = useGetRegions(setLoadingIndicator);

    const destinationData = data?.filter(item =>
        ["US", "FR", "GB", "DE", "JP", "TH"].includes(item.country_iso2)
    ) || [];

    useEffect(() => {
        if (!loading && data) {
            setAllCountries(data.slice(17));
            setFilteredCountry(data.slice(17));
        }
    }, [loading, data]);

    if (error) {
        Alert.alert("Oops... Something went wrong.", "Please try again in a moment.");
        return null;
    }

    if (loading || !data) {
        return null;
    }

    const filterContries = (text) => {
        setSearchCountry(text);
        if (!text) {
            setFilteredCountry(allCountries);
            setIsSearch(false);
            return;
        }
        setIsSearch(true);
        const lowercasedText = text.toLowerCase();
        const updated = allCountries.filter((country) =>
            country.country_name.toLowerCase().includes(lowercasedText)
        );
        setFilteredCountry(updated);
    };

    return (
        <View style={{ width: '100%' }}>
            <SearchInput
                value={searchCountry}
                onChangeText={filterContries}
            />
            {!loadingIndicator && !isSearch ?
                <View style={{ marginBottom: 25 }}>
                    <Text style={{ fontSize: 17, fontWeight: '600', marginTop: 25 }}>Popular Destinations</Text>
                    <PopularDestinations data={destinationData} />
                </View> : null}
        </View>
    )
}

export default HeaderExplore;