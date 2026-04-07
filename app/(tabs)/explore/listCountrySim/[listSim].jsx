import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import { SafeAreaView } from "react-native-safe-area-context";

import TopNavigation from "./TopNavigation";

import { useGetProducts } from "../../../hooks/useGetProducts";


export default function ListSim() {
    const { params } = useRoute();
    const navigation = useNavigation();

    const { data, loading, error } = useGetProducts(params.countryName);

    if (error) {
        Alert.alert("Oops... Something went wrong.", "Please try again in a moment.");
        return null;
    }

    useLayoutEffect(() => {
        navigation.setOptions({ title: params.countryName })
    }, [navigation]);

    if (!data || loading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <ActivityIndicator size="large" />
        </View>
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 20 }} edges={['left', 'right']}>
            {data.length === 0 ? <Text style={{ fontSize: 20, fontWeight: '600', marginTop: '50%', alignSelf: 'center' }}>
                There are no available plans
            </Text> : <View style={{ marginTop: 20, flex: 1 }}>
                <View style={styles.headerContainer}>
                    {params.img ? null : <CountryFlag isoCode={params.isoCode} size={35} />}
                    <View style={{ flexDirection: 'column', gap: 2 }}>
                        <Text style={{ fontSize: 24, fontWeight: '700' }}>{params.countryName}</Text>
                        <Text style={{ color: '#707175' }}>{data.length} plan(s) available</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Text style={{ fontSize: 17, fontWeight: '600', color: 'black' }}>Available Plans</Text>
                    <Ionicons name="checkmark-circle-outline" size={20} color="#08b178" />
                </View>
                <TopNavigation
                    data={data}
                    loading={loading}
                />
            </View>}
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
