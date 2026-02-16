import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { useGetProducts } from "../../../hooks/useGetProducts";
import { useUser } from "../../../hooks/useUser";

import BuyButton from "../../../shared/ui/BuyButton/BuyButton";
import Step from "../../../shared/ui/Step/Step";

import { stepData } from "./const/constants";


const getServerUrl = () => {
    return `https://esimserver.onrender.com`;
};

const fetchPaymentSheetParams = async (countryData, currency, userId, planId) => {
    const url = `${getServerUrl()}/payment-sheet`;
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ countryData, currency, userId, planId }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch payment sheet params: ${text}`);
    }
    return res.json();
};

export default function PlanDetails() {
    const { params } = useRoute();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const navigation = useNavigation();

    const [initializing, setInitializing] = useState(true);
    const [sheetReady, setSheetReady] = useState(false);
    const [isPaying, setIsPaying] = useState(false);
    const [paymentIntentId, setPaymentIntentId] = useState(null);

    const { data } = useGetProducts(0, 0, params.countryName);
    const { user, refetchUser } = useUser();

    const planId = Number(params.id);
    const countryData = data?.find((item) => item.id === planId);

    const price = (countryData?.price * 1.5).toFixed(2);

    useEffect(() => {
        if (!countryData || !user) return;

        let isMounted = true;

        const initializePaymentSheet = async () => {
            try {
                setInitializing(true);

                const {
                    paymentIntentClientSecret,
                    paymentIntentId,
                    ephemeralKey,
                    customer,
                } = await fetchPaymentSheetParams(
                    countryData,
                    user.currency,
                    user.id,
                    planId
                );

                if (!isMounted) return;

                const { error } = await initPaymentSheet({
                    merchantDisplayName: "The Best eSIM",
                    customerId: customer,
                    customerEphemeralKeySecret: ephemeralKey,
                    paymentIntentClientSecret,
                    allowsDelayedPaymentMethods: true,
                    defaultBillingDetails: {
                        name: user.name,
                        email: user.email,
                    },
                    returnURL: Linking.createURL("stripe-redirect"),
                    applePay: {
                        merchantCountryCode: "AE"
                    }
                });

                if (error) throw new Error(error.message);

                setPaymentIntentId(paymentIntentId);
                setSheetReady(true);
            } catch (e) {
                Alert.alert(
                    "Oops... Something went wrong.",
                    "Please try again in a moment.", [
                    {
                        text: "Ok",
                        onPress: () => navigation.goBack()
                    }
                ]
                );
                console.log(e.message);
            } finally {
                isMounted && setInitializing(false);
            }
        };

        initializePaymentSheet();

        return () => {
            isMounted = false;
        };
    }, [countryData, user?.id]);


    const openPaymentSheet = async () => {
        if (!sheetReady || !paymentIntentId) {
            Alert.alert("Payment not ready");
            return;
        }

        try {
            setIsPaying(true);

            const { error } = await presentPaymentSheet();

            if (error) {
                Alert.alert("Payment failed", "", [
                    {
                        text: "Ok",
                        onPress: () => navigation.goBack()
                    }
                ]);
                return;
            }

            const res = await fetch(`${getServerUrl()}/confirm-payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    paymentIntentId,
                    userId: user.id,
                }),
            });

            const result = await res.json();

            if (!result || result.error) {
                Alert.alert("Error", result?.error || "Something went wrong.", [
                    {
                        text: "Ok",
                        onPress: () => navigation.goBack()
                    }
                ]);
            }

            if (result.status === "active") {
                await refetchUser();

                Alert.alert(
                    "Success 🎉",
                    "Your eSIM has been activated successfully!",
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.goBack()
                        }
                    ]
                );
            }

            if (result.status === "processing") {
                await refetchUser();

                Alert.alert(
                    "Activation in progress ⏳",
                    "Your eSIM is being activated. It will appear shortly in My eSIMs.\n\nThis may take a few time.",
                    [
                        {
                            text: "Go to My eSIMs",
                            onPress: () => navigation.navigate("MyEsims")
                        }
                    ]
                );
            }

        } catch (e) {
            console.error(e);
            Alert.alert("Error", "Payment error occurred", [
                {
                    text: "Ok",
                    onPress: () => navigation.goBack()
                }
            ]);
        } finally {
            setIsPaying(false);
        }
    };


    if (isPaying) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                <ActivityIndicator size="large" />
                <Text style={{ color: '#707175', marginTop: 10 }}>Processing payment…</Text>
            </View>
        );
    }

    if (initializing || !countryData) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ marginTop: 30 }}>
                <View style={styles.headerContainer}>
                    <View style={styles.row}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>{countryData.name}</Text>
                        {countryData?.product_coverage?.country_iso2 && (
                            <CountryFlag
                                isoCode={countryData.product_coverage.country_iso2}
                                size={15}
                            />
                        )}
                    </View>
                    <Text style={{ fontSize: 15, color: '#707175', marginTop: 5 }}>
                        {countryData.product_coverage.country_name} eSim
                    </Text>
                    <View style={styles.priceRow}>
                        <Text style={{ fontSize: 25, fontWeight: '700', marginTop: 20 }}>
                            {countryData.volume >= 1024 ? countryData.volume / 1024 + " GB" : countryData.volume + " MB"}
                        </Text>
                        <Text style={styles.price}>€{price}</Text>
                    </View>
                </View>
                <Text style={styles.sectionTitle}>How it Works</Text>
                <View style={{ gap: 15 }}>
                    {stepData.map((item, index) => (
                        <Step key={index} index={index} title={item.title} desc={item.desc} />
                    ))}
                </View>
                <Text style={styles.sectionTitle}>Compatible Devices</Text>
                <View style={styles.containerInfo}>
                    <Ionicons name="checkmark-circle-outline" size={25} color="#08b178" />
                    <Text numberOfLines={2} style={{ width: '90%' }}>
                        Works with all eSim-compatible iPhone XS and newer
                    </Text>
                </View>
                <BuyButton amount={price} onPress={openPaymentSheet} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 20
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    headerContainer: {
        width: '100%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: '#f8faf9',
        borderRadius: 20,
        marginBottom: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    price: {
        fontSize: 25,
        fontWeight: '700',
        color: '#2565e9',
        marginTop: 15
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 15
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
    },
});

