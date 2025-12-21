import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";


function ErrorMessage({ message }) {
    return (
        <View style={styles.container}>
            <Ionicons name="warning-outline" size={20} color="#c03d43" />
            <Text style={{ color: '#c03d43', fontSize: 15 }}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#feeeef',
        borderRadius: 10,
        gap: 5,
        marginTop: 30,
    },
});


export default ErrorMessage;