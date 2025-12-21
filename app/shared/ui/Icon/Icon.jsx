import { Feather, Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";


function Icon({ name, size = 60, color = "white", isLogin = false }) {
    return (
        <View style={styles.iconContainer}>
            {isLogin ? <Ionicons name={name} size={size} color={color} /> :
                <Feather name={name} size={size} color={color} />}
        </View>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2565eb',
        borderRadius: 25,
        width: 85,
        height: 85,
    }
});


export default Icon;