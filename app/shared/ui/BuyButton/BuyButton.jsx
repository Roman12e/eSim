import { StyleSheet, Text, TouchableOpacity } from "react-native";


function BuyButton({ amount, onPress }) {
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>Buy Now - ${amount}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2565e9',
        height: 55,
        borderRadius: 20,
        marginBlock: 20
    }
})

export default BuyButton;