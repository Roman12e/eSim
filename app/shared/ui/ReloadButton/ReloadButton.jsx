import { Feather, Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";



function ReloadButton({ countContry, onPress }) {
    return (
        <TouchableOpacity style={styles.reloadButton} onPress={onPress}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Feather name="database" size={20} color="#235ad8" />
                <Text style={{ color: '#235ad8', fontSize: 15 }}>Showing {countContry} destinations</Text>
            </View>
            <Ionicons name="reload" size={20} color="#235ad8" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    reloadButton: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: '#eff1fd',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 12
    },
})

export default ReloadButton;