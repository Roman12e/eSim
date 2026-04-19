import { useNavigation, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGetProducts } from "../../../hooks/useGetProducts";
import { handleError } from "../../../utils/handleError";

import CountryLabel from "../../../shared/ui/CountryLabel/CountryLabel";


export default function RegionCountries() {
    const { params } = useRoute();

    const router = useRouter();
    const navigation = useNavigation();

    const { data, loading, error, retry } = useGetProducts(params.countryName);

    if (error) {
        return handleError(error, retry);
    }

    useLayoutEffect(() => {
        navigation.setOptions({ title: params.countryName === "caribbean-2002" ? "Caribbean" : params.countryName })
    }, [navigation]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'white' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!data) {
        return null;
    }

    const uniqueCountries = () => {
        if (!Array.isArray(data)) return [];

        const map = {};

        data.forEach(item => {
            if (!Array.isArray(item.product_coverage)) return;

            item.product_coverage.forEach(country => {
                if (!country?.country_iso2) return;

                map[country.country_iso2] = country;
            });
        });

        return Object.values(map);
    };

    const countriesArr = uniqueCountries();

    const sortedCountries = [...countriesArr].sort((a, b) =>
        a.country_name.localeCompare(b.country_name)
    );

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 20 }} edges={['left', 'right']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ marginTop: 20 }}>
                <View style={{ width: "100%", gap: 15, marginBottom: 25 }}>
                    {sortedCountries.map(country => {
                        const isoCode = country.country_iso2.toLowerCase();
                        const countryName = country.country_name;
                        return (
                            <CountryLabel
                                key={isoCode}
                                countryTitle={countryName}
                                isoCode={isoCode}
                                onPress={() =>
                                    router.push({
                                        pathname: `/explore/listCountrySim/ListSim`,
                                        params: {
                                            countryName: countryName,
                                            isoCode,
                                        },
                                    })
                                }
                            />
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}