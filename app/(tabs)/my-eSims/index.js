import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import UserESim from "../../features/ui/user-eSim/UserESim";

import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useUser } from "../../hooks/useUser";


const getServerUrl = () => {
    return `https://esimserver.onrender.com`;
};

const fetchActivate = async (iccid) => {
    const url = `${getServerUrl()}/get-simcard-detail`;
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ iccid }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch: ${text}`);
    }
    return res.json();
};


function MyEsims() {
    const [loadingIndicator, setLoadingIndicator] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const [userSims, setUserSims] = useState([]);
    const [countries, setCountries] = useState([]);

    const navigation = useNavigation();
    const router = useRouter();

    const { user } = useUser();

    if (!user) {
        Alert.alert(
            "Error",
            "You should log in",
            [
                { text: "Close" },
                {
                    text: "Log In",
                    onPress: () => router.replace("/(auth)/login/")
                }
            ]
        );
    }

    useEffect(() => {
        if (!user?.sims) return;

        let mounted = true;

        const load = async () => {
            setLoadingIndicator(true);
            setIsLoaded(false);
            setUserSims([]);
            setCountries([]);

            for (const sim of user.sims) {
                if (!sim?.iccid) continue;

                const res = await fetchActivate(sim.iccid);
                if (!mounted) return;

                setUserSims(prev => [...prev, res]);
                setCountries(prev => [...prev, sim.product.country]);
            }

            if (mounted) {
                setLoadingIndicator(false);
                setIsLoaded(true);
            }
        };

        load();
        return () => mounted = false;
    }, [user?.sims.length]);

    if (!isLoaded || loadingIndicator) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (isLoaded && userSims.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                <View style={styles.iconContainer}>
                    <Feather name="smartphone" size={50} color="#a0a4af" />
                </View>
                <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 20 }}>No eSIMs Yet</Text>
                <Text style={{ color: '#6d6e70', width: '75%', textAlign: 'center', marginTop: 8, fontSize: 15 }} numberOfLines={2}>Purchase your first eSIM to stay connected while traveling abroad</Text>
                <TouchableOpacity
                    style={styles.exploreBtn}
                    onPress={() => navigation.navigate("explore")}
                >
                    <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>Explore Plans</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ marginTop: 10, paddingBottom: 30 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 17, fontWeight: '600' }}>Your eSims</Text>
                    <Text style={{ color: '#68676d' }}>1 active</Text>
                </View>
                {userSims.map((item, index) => (
                    <UserESim
                        key={index}
                        idx={index}
                        data={item}
                        country={countries[index]}
                    />
                ))}
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
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fb',
        borderRadius: 60,
        width: 100,
        height: 100,
        marginTop: '15%'
    },
    exploreBtn: {
        width: 160,
        height: 60,
        backgroundColor: '#366bef',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 20
    }
})


export default MyEsims;