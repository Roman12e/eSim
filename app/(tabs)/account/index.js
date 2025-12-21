import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderProfile from "../../features/ui/header-profile/HeaderProfile";
import SignOutButton from "../../shared/ui/SignOutButton/SignOutButton";
import ProfileLayout from "../../widgets/ProfileLayout/ProfileLayout";


function AccountScreen() {
    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderProfile />
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