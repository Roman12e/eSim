import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import { SafeAreaView } from "react-native-safe-area-context";

import ListCountrySim from "../../../widgets/ListCountrySim/ListCountrySim";

import { ScrollView } from "react-native";
import { useGetProducts } from "../../../hooks/useGetProducts";



function ListSim() {
    const { params } = useRoute();
    const navigation = useNavigation();

    const [reloadKey, setReloadKey] = useState(0);

    const { data, loading, error } = useGetProducts(reloadKey, setReloadKey, params.countryName);

    useLayoutEffect(() => {
        navigation.setOptions({ title: params.countryName })
    }, [navigation]);

    if (!data) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={100} />
        </View>
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 20 }} edges={['left', 'right']}>
            {data.length === 0 ? <Text style={{ fontSize: 20, fontWeight: '600', marginTop: '50%', alignSelf: 'center' }}>
                There are no available plans
            </Text> : <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ marginTop: 20 }}>
                <View style={styles.headerContainer}>
                    {params.img ? null : <CountryFlag isoCode={params.isoCode} size={35} />}
                    <View style={{ flexDirection: 'column', gap: 2 }}>
                        <Text style={{ fontSize: 24, fontWeight: '700' }}>{params.countryName}</Text>
                        <Text style={{ color: '#707175' }}>{data.length} plan(s) available</Text>
                    </View>
                </View>
                <ListCountrySim
                    data={data}
                    loading={loading}
                />
            </ScrollView>}
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#f8faf9',
        borderRadius: 20,
        marginBottom: 20
    }
})


export default ListSim;