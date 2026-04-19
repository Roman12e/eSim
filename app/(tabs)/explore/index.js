import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGetRegions } from "../../hooks/useGetRegions";
import { handleError } from "../../utils/handleError";

import CountryList from "../../features/ui/country-list/CountryList";
import RegionList from "../../features/ui/region-list/RegionList";
import HeaderExplore from "../../widgets/HeaderExplore/HeaderExplore";


function ExploreScreen() {
    const { data, loading, error, retry } = useGetRegions();

    const [filteredCountry, setFilteredCountry] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [searchCountry, setSearchCountry] = useState("");

    useEffect(() => {
        if (data) {
            setFilteredCountry(data);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            return handleError(error, retry);
        }
    }, [error]);

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            {loading ? <View style={{ flex: 1, marginTop: 20, alignItems: 'center', backgroundColor: 'white' }}>
                <HeaderExplore
                    data={data}
                    loading={loading}
                    searchCountry={searchCountry}
                    setSearchCountry={setSearchCountry}
                    setFilteredCountry={setFilteredCountry}
                    setIsSearch={setIsSearch}
                    isSearch={isSearch}
                />
                <View style={{ alignItems: 'center', gap: 30, marginTop: '45%' }}>
                    <ActivityIndicator size="large" />
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>Loading countries...</Text>
                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'center' }}>If loading takes too long, please turn off vpn or check your internet connection.</Text>
                </View>
            </View> :
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ marginTop: 20 }}>
                    <HeaderExplore
                        data={data}
                        loading={loading}
                        searchCountry={searchCountry}
                        setSearchCountry={setSearchCountry}
                        setFilteredCountry={setFilteredCountry}
                        setIsSearch={setIsSearch}
                        isSearch={isSearch}
                    />
                    <RegionList
                        filteredCountry={filteredCountry}
                        isSearch={isSearch}
                        loadingIndicator={loading}
                    />
                    <CountryList
                        filteredCountry={filteredCountry}
                        isSearch={isSearch}
                        loadingIndicator={loading}
                    />
                </ScrollView>}
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        flex: 1
    }
})


export default ExploreScreen;