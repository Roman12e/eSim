import { StyleSheet, Text, View } from "react-native";


export default function SimStatusLabel({ status }) {
    return (
        <View style={[styles.statusContainer, { backgroundColor: status === "ACTIVE" ? "#ddf2eb" : "#fdf3f2" }]}>
            <View style={[styles.statusCircle, { backgroundColor: status === "ACTIVE" ? "#19b683" : "#d55860" }]} />
            <Text style={{ fontSize: 14.5, fontWeight: '500', color: status === "ACTIVE" ? '#19b683' : "#d55860" }}>{status === "ACTIVE" ? "Active" : "Inactive"}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    statusContainer: {
        width: 90,
        height: 28,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6
    },
    statusCircle: {
        width: 8,
        height: 8,
        borderRadius: 10
    }
})