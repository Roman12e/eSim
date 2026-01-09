import { StyleSheet, Text, TouchableOpacity } from "react-native";


export default function SafeButton({ onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={{ fontSize: 17, color: '#235ad8' }}>Safe</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#f8faf9',
        width: '100%',
        height: 55,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '3%'
    }
})