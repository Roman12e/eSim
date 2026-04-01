import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import HeaderProfile from "../../features/ui/header-profile/HeaderProfile";
import DeleteAccountButton from "../../shared/ui/DeleteAccountButton/DeleteAccountButton";
import SignOutButton from "../../shared/ui/SignOutButton/SignOutButton";
import ProfileLayout from "../../widgets/ProfileLayout/ProfileLayout";

import { useRouter } from "expo-router";
import { useUser } from "../../hooks/useUser";


function AccountScreen() {
    const { user } = useUser();
    const router = useRouter();

    if (!user) {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 20 }}>Please log in or sign in</Text>
                <Text style={{ color: '#6d6e70', width: '75%', textAlign: 'center', marginTop: 8, fontSize: 15 }} numberOfLines={2}>You need to log in or sign up to continue using the app.</Text>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => router.replace("/(auth)/login/")}
                >
                    <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>Log in</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderProfile user={user} />
                <ProfileLayout />
                <View style={{ marginTop: 30, gap: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#d55860' }}>Danger Zone</Text>
                    <SignOutButton />
                    <DeleteAccountButton />
                </View>
                <Text style={{ fontSize: 15, color: '#bbbcbe', marginBlock: 30, alignSelf: 'center' }}>The Best eSIM v1.0.0</Text>
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
    loginBtn: {
        width: 200,
        height: 52,
        backgroundColor: '#366bef',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 20
    }
})



export default AccountScreen;