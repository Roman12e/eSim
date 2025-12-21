import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import ReloadButton from "../../shared/ui/ReloadButton/ReloadButton";
import SearchInput from "../../shared/ui/SearchInput/SearchInput";
import Tag from "../../shared/ui/Tag/Tag";

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
    const [reloadKey, setReloadKey] = useState(0);
    const [allCountries, setAllCountries] = useState([]);

    const { data, loading } = useGetRegions(reloadKey, setReloadKey, setLoadingIndicator);

    const destinationData = data?.filter(item =>
        ["US", "FR", "GB", "DE", "JP", "TH"].includes(item.country_iso2)
    ) || [];

    useEffect(() => {
        if (!loading && data) {
            setAllCountries(data.slice(17));
            setFilteredCountry(data.slice(17));
        }
    }, [loading, data]);

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
            <ReloadButton
                countContry={data.length - 17}
                onPress={() => setReloadKey(prev => prev + 1)}
            />
            <SearchInput
                value={searchCountry}
                onChangeText={filterContries}
            />
            <View style={{ flexDirection: "row", gap: 10, alignSelf: "flex-start" }}>
                <Tag title={`${data.length - 17} Countries`} type="country" />
                <Tag title="Live Data" type="wifi" />
            </View>
            {!loadingIndicator && !isSearch ?
                <View style={{ marginBottom: 25 }}>
                    <Text style={{ fontSize: 17, fontWeight: '600', marginTop: 25 }}>Popular Destinations</Text>
                    <PopularDestinations data={destinationData} />
                </View> : null}
        </View>
    )
}

export default HeaderExplore;