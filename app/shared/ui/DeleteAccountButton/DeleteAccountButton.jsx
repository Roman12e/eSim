import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { useNavigation } from "expo-router";

function DeleteAccountButton() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.btnContainer} onPress={() => navigation.navigate("deleteAccount/DeleteAccount")}>
            <FontAwesome6 name="trash-alt" size={18} color="#d55860" />
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#d55860' }}>Delete Account</Text>
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

export default DeleteAccountButton;