import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderProfile from "../../features/ui/header-profile/HeaderProfile";
import SignOutButton from "../../shared/ui/SignOutButton/SignOutButton";
import ProfileLayout from "../../widgets/ProfileLayout/ProfileLayout";

import { useRouter } from "expo-router";
import { useUser } from "../../hooks/useUser";


function AccountScreen() {
    const { user } = useUser();
    const router = useRouter();

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
        )
        return (
            <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderProfile user={user} />
                <ProfileLayout />
                <SignOutButton />
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
})



export default AccountScreen;