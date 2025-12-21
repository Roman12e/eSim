import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import RegionLabel from "../../../shared/ui/RegionLabel/RegionLabel";
import { regionsData } from "./const/constants";


function RegionList({ filteredCountry, isSearch, loadingIndicator }) {
    const router = useRouter();

    if (!filteredCountry) {
        return (
            <View style={{ alignItems: 'center', marginBottom: '50%' }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>No countries available</Text>
            </View>
        );
    };

    return (
        <View style={{ width: '100%', gap: 15, marginBottom: 25 }}>
            {!isSearch && !loadingIndicator ?
                <Text style={{ fontSize: 17, fontWeight: '600', marginBottom: 5 }}>All Regions</Text> : null}
            {!loadingIndicator && !isSearch
                ? regionsData.map((r, index) => (
                    <RegionLabel
                        key={index}
                        regionName={r.regionName}
                        img={r.img}
                        onPress={() => router.push({
                            pathname: '/explore/regionCountries/RegionCountries',
                            params: { countryName: r.regionName, isoCode: r.isoCode.toLowerCase() }
                        })}
                    />
                )) : null}
        </View>
    );
};


export default RegionList;