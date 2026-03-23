import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGetRegions } from "../../hooks/useGetRegions";

import CountryList from "../../features/ui/country-list/CountryList";
import RegionList from "../../features/ui/region-list/RegionList";
import HeaderExplore from "../../widgets/HeaderExplore/HeaderExplore";


function ExploreScreen() {
    const { data, loading, error } = useGetRegions();

    const [filteredCountry, setFilteredCountry] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [searchCountry, setSearchCountry] = useState("");

    useEffect(() => {
        if (data) {
            setFilteredCountry(data);
        }
    }, [data]);

    if (error) {
        return (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Text>Failed to load countries</Text>
                <TouchableOpacity onPress={retry}>
                    <Text>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

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
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>Loading countries...</Text>
                    <ActivityIndicator size="large" />
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
    },
})


export default ExploreScreen;