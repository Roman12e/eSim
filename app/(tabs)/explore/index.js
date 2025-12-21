import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CountryList from "../../features/ui/country-list/CountryList";
import RegionList from "../../features/ui/region-list/RegionList";
import HeaderExplore from "../../widgets/HeaderExplore/HeaderExplore";


function ExploreScreen() {
    const [filteredCountry, setFilteredCountry] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [loadingIndicator, setLoadingIndicator] = useState(true);
    const [searchCountry, setSearchCountry] = useState("");


    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ marginTop: 20 }}>
                <HeaderExplore
                    searchCountry={searchCountry}
                    setSearchCountry={setSearchCountry}
                    setFilteredCountry={setFilteredCountry}
                    setIsSearch={setIsSearch}
                    isSearch={isSearch}
                    setLoadingIndicator={setLoadingIndicator}
                    loadingIndicator={loadingIndicator}
                />
                <RegionList
                    filteredCountry={filteredCountry}
                    isSearch={isSearch}
                    loadingIndicator={loadingIndicator}
                />
                <CountryList
                    filteredCountry={filteredCountry}
                    isSearch={isSearch}
                    loadingIndicator={loadingIndicator}
                />
            </ScrollView>
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