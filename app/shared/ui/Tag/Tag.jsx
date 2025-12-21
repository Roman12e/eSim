import { Feather, Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";


function Tag({ title, type }) {
    return (
        <View style={[styles.tagContainer, type === "country" ? { backgroundColor: '#eff1fd' } : { backgroundColor: '#e9faf4' }]}>
            {type === "country" ? <Ionicons name="earth" size={16} color="#235ad8" /> :
                <Feather name="wifi" size={16} color="#08b178" />}
            <Text style={{ color: type === "country" ? "#235ad8" : "#08b178", fontWeight: '500' }}>{title}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    tagContainer: {
        flexDirection: "row",
        gap: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignItems: "center"
    }
})


export default Tag;