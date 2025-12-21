import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


function HowWorksButton({ onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.btnContainer}>
            <Text style={{ fontSize: 16, color: 'white', fontWeight: '600' }}>How it Works</Text>
            <Feather name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        width: '100%',
        flexDirection: 'row',
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2565e9',
        gap: 5,
        marginTop: 20
    }
})

export default HowWorksButton;