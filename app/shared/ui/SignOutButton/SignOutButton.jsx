import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

import { useAuth } from "../../../hooks/useAuth";


function SignOutButton() {
    const { signOut } = useAuth();

    const router = useRouter();

    const handlerOut = () => {
        Alert.alert("Sign Out", "Are you sure you want to sign out?", [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Sign Out",
                style: "destructive",
                onPress: () => {
                    signOut();
                    router.replace('/(auth)/login/')
                }
            }
        ])
    }

    return (
        <TouchableOpacity style={styles.btnContainer} onPress={handlerOut}>
            <MaterialCommunityIcons name="logout" size={20} color="#d55860" />
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#d55860' }}>Sign Out</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        backgroundColor: '#fdf3f2',
        height: 55,
        borderRadius: 20
    }
})

export default SignOutButton;