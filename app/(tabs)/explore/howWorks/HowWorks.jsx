import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native";
import * as Linking from "expo-linking";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGetProducts } from "../../../hooks/useGetProducts";
import { stepData } from "./const/constants";

import BuyButton from "../../../shared/ui/BuyButton/BuyButton";
import Step from "../../../shared/ui/Step/Step";


const fetchPaymentSheetParams = async (amount) => {
    return fetch('/api/payment-sheet', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
    }).then((res) => res.json());
}


function PlanDetails() {
    const { params } = useRoute();
    const navigation = useNavigation();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const { data } = useGetProducts(0, 0, params.countryName);
    const planId = Number(params.id);

    const countryData = data?.find(item => item.id === planId);

    useEffect(() => {
        const initializePaymentSheet = async () => {
            const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams(countryData?.price);

            const { error } = await initPaymentSheet({
                merchantDisplayName: "Expo, Inc.",
                customerId: customer,
                customerEphemeralKeySecret: ephemeralKey,
                paymentIntentClientSecret: paymentIntent,
                allowsDelayedPaymentMethods: true,
                defaultBillingDetails: {
                    name: "Jane Doe",
                    email: "jenny.rosen@example.com",
                    phone: "888-888-8888"
                },
                returnURL: Linking.createURL("stripe-redirect"),
                applePay: {
                    merchantCountryCode: "US"
                },
            });
            if (!error) {
                setLoading(true);
            }
        };
        initializePaymentSheet();
    }, [])


    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert("Error");
            console.log(error);

        } else {
            Alert.alert("Success", "Your order is confirmed!")
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 20 }} edges={['left', 'right']}>
            {data && countryData ? <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ marginTop: 20 }}>
                <View style={styles.headerContainer}>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>{countryData.name}</Text>
                        <CountryFlag isoCode={countryData.product_coverage.country_iso2} size={15} />
                    </View>
                    <Text style={{ fontSize: 15, color: '#707175', marginTop: 5 }}>{countryData.product_coverage.country_name} eSim</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ fontSize: 25, fontWeight: '700', marginTop: 20 }}>{countryData.volume >= 1024 ? countryData.volume / 1024 + " GB" : countryData.volume + " MB"}</Text>
                        <Text style={{ fontSize: 25, fontWeight: '700', color: '#2565e9', marginTop: 15 }}>${countryData.price}</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 18, fontWeight: '600', marginBlock: 15 }}>How it Works</Text>
                <View style={{ gap: 15 }}>
                    {stepData.map((item, index) => (
                        <Step
                            key={index}
                            index={index}
                            title={item.title}
                            desc={item.desc}
                        />
                    ))}
                </View>
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 40 }}>Compatible Devices</Text>
                <View style={styles.containerInfo}>
                    <Ionicons name="checkmark-circle-outline" size={25} color="#08b178" />
                    <Text numberOfLines={2} style={{ width: '90%' }}>Works with all eSim-compatible iPhone XS and newer</Text>
                </View>
                <BuyButton
                    amount={countryData.price}
                    onPress={openPaymentSheet}
                />
            </ScrollView> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={100} />
            </View>}
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: '#f8faf9',
        borderRadius: 20,
        marginBottom: 20
    },
    containerInfo: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        backgroundColor: '#f8faf9',
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginTop: 10
    }
})


export default PlanDetails;