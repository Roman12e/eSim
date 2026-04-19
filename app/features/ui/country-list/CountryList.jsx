import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import CountryLabel from "../../../shared/ui/CountryLabel/CountryLabel";


function CountryList({ filteredCountry, isSearch, loadingIndicator }) {
    const router = useRouter();

    if (!filteredCountry) {
        return (
            <View style={{ alignItems: 'center', marginBottom: '50%' }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>No countries available</Text>
            </View>
        );
    };

    const sortedCountries = [...filteredCountry].sort((a, b) =>
        a.country_name.localeCompare(b.country_name)
    );

    return (
        <View style={{ width: '100%', gap: 15, marginBottom: 25 }}>
            {filteredCountry.length > 0 && !isSearch && !loadingIndicator ?
                <Text style={{ fontSize: 17, fontWeight: '600', marginBottom: 5 }}>All Countries</Text> : null}
            {sortedCountries && !loadingIndicator && sortedCountries.length > 0
                ? sortedCountries.map((r, index) => (
                    <CountryLabel
                        key={index}
                        countryTitle={r.country_name}
                        isoCode={r.country_iso2.toLowerCase()}
                        onPress={() => router.push({
                            pathname: `/explore/listCountrySim/ListSim`,
                            params: { countryName: r.country_name, isoCode: r.country_iso2.toLowerCase() }
                        })}
                    />
                ))
                : (
                    <View style={{ flex: 1, marginTop: '10%', alignItems: 'center', backgroundColor: 'white', gap: 30 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#6d6e70' }}>There is no such country...</Text>
                        </View>
                    </View>
                )}
        </View>
    );
};


export default CountryList;