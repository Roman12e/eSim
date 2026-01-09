import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import PercentageCircle from 'react-native-expo-circle-progress';
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation, useRoute } from "@react-navigation/native";

import { useUser } from "../../../hooks/useUser";

import { supabase } from "../../../shared/api/supabase/supabaseConfig";

import ESimInfoBlock from "../../../shared/ui/ESimInfoBlock/ESimInfoBlock";
import SimStatusLabel from "../../../shared/ui/SimStatusLabel/SimStatusLabel";


export default function ESimInfo() {
    const route = useRoute();
    const {
        country,
        status,
        iso2,
        totalMb,
        remainingMb,
        usedMb,
        next_renewal,
        iccid,
        days_left,
        purchase_date,
        isInstall,
        installLink,
        qrcode,
        barColor
    } = route.params;
    const navigation = useNavigation();
    const { user, setUser } = useUser()

    const [openQrcode, setOpenQrcode] = useState(isInstall);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: country,
            headerRight: () => (
                <TouchableOpacity
                    style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => setOpenQrcode(prev => !prev)}>
                    <MaterialCommunityIcons
                        name="qrcode-scan"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            ),

            headerShadowVisible: false,
            headerBackTitleVisible: true,
        });
    }, [navigation]);

    const deleteSim = async () => {
        try {
            const currentSims = user.sims || [];
            const updatedSims = currentSims.filter(sim => sim.iccid !== iccid);

            const { data, error } = await supabase
                .from("users")
                .update({ sims: updatedSims })
                .eq("id", user.id)
                .select()
                .single();

            if (error) {
                console.log({ error });
                Alert.alert("Error", "Failed to delete eSIM on server.");
                return;
            }

            setUser(data);

            Alert.alert("Deleted", "eSIM was successfully deleted");

            navigation.goBack();
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Failed to delete eSIM. Please try again later.");
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Do you really want to delete",
            "Do you really want to delete without the possibility of recovery",
            [
                {
                    text: "Yes",
                    onPress: deleteSim
                },
                { text: "No" }
            ]
        )
    }

    const openLink = useCallback(async () => {
        const url = await Linking.canOpenURL(installLink);

        if (url) {
            await Linking.openURL(installLink);
            setUser(prev => ({
                ...prev,
                sims: prev.sims.map(sim =>
                    sim.iccid === iccid
                        ? { ...sim, isInstall: true }
                        : sim
                )
            }));
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [installLink]);

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            {openQrcode ?
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ marginTop: 20 }}>
                    <ESimInfoBlock>
                        <CountryFlag isoCode={iso2} size={50} />
                        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15, marginTop: 20 }}>{country}</Text>
                        <SimStatusLabel status={status} />
                    </ESimInfoBlock>
                    <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 10 }}>Data Usage</Text>
                    <ESimInfoBlock>
                        <PercentageCircle
                            radius={65}
                            borderWidth={10}
                            percent={Math.round(usedMb * 100 / totalMb)}
                            color={barColor}
                            bgcolor="#e7e8ea"
                        >
                            <View style={{ backgroundColor: '#f8faf9', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: '600' }}>{Math.round(usedMb * 100 / totalMb)}%</Text>
                                <Text style={{ color: '#68676d' }}>used</Text>
                            </View>
                        </PercentageCircle>
                        <View style={styles.footerDataUsage}>
                            <View style={{ gap: 5, alignItems: 'center' }}>
                                <Text style={{ color: '#68676d' }}>Data Used</Text>
                                <Text style={{ fontSize: 17, fontWeight: '600' }}>{usedMb} MB</Text>
                            </View>
                            <View style={{ gap: 5, alignItems: 'center' }}>
                                <Text style={{ color: '#68676d' }}>Remaining</Text>
                                <Text style={{ fontSize: 17, fontWeight: '600', color: '#19b683' }}>{Math.round(remainingMb / 1024)} GB</Text>
                            </View>
                            <View style={{ gap: 5, alignItems: 'center' }}>
                                <Text style={{ color: '#68676d' }}>Total</Text>
                                <Text style={{ fontSize: 17, fontWeight: '600' }}>{totalMb / 1024} GB</Text>
                            </View>
                        </View>
                    </ESimInfoBlock>
                    <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 10 }}>Plan Details</Text>
                    <ESimInfoBlock>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <Feather name="calendar" size={17} color="#9e9fa4" />
                                <Text style={{ fontSize: 15.5, color: '#9e9fa4' }}>Purchase Date</Text>
                            </View>
                            <Text>{purchase_date}</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <Feather name="clock" size={17} color="#9e9fa4" />
                                <Text style={{ fontSize: 15.5, color: '#9e9fa4' }}>Expiry Date</Text>
                            </View>
                            <Text>{next_renewal}</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <Feather name="activity" size={17} color="#9e9fa4" />
                                <Text style={{ fontSize: 15.5, color: '#9e9fa4' }}>Days Remaining</Text>
                            </View>
                            <Text>{days_left < 180 ? days_left.toString() + "days" : "Unlimited"}</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <Feather name="hash" size={17} color="#9e9fa4" />
                                <Text style={{ fontSize: 15.5, color: '#9e9fa4' }}>ICCID</Text>
                            </View>
                            <Text>{iccid}</Text>
                        </View>
                    </ESimInfoBlock>
                    <TouchableOpacity
                        onPress={handleDelete}
                        style={styles.btnDelete}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#d55860' }}>Delete</Text>
                    </TouchableOpacity>
                </ScrollView>
                :
                <View style={{ alignItems: 'center', flex: 1, marginTop: '20%' }}>
                    <Image
                        source={qrcode}
                        style={{ width: '75%', height: '45%' }}
                        cachePolicy="memory-disk"
                        contentFit="contain"
                        transition={200}
                    />
                    <Text style={{ fontSize: 18, color: '#68676d', textAlign: 'center', width: '75%' }}>Scan qrcode to install eSim or do this mannually</Text>
                    <TouchableOpacity style={styles.mannually} onPress={openLink}>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>Mannually</Text>
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        flex: 1
    },
    blockContainer: {
        width: '100%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: '#f8faf9',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 20
    },
    footerDataUsage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%',
        marginTop: 20
    },
    btnDelete: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        backgroundColor: '#fdf3f2',
        height: 55,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 30
    },
    line: {
        width: '100%',
        height: 1.5,
        backgroundColor: '#e8eae9',
        borderRadius: 10,
        marginBlock: 10
    },
    mannually: {
        width: '100%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8faf9',
        borderRadius: 20,
        marginTop: '10%'
    }
})