import { StyleSheet, Text, TouchableOpacity } from "react-native";


function ViewAllButton({ onPress }) {
    return (
        <TouchableOpacity style={styles.viewAllBtnContainer}>
            <Text style={{ fontSize: 17, fontWeight: '500', color: '#235ad8' }}>View All Countries</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    viewAllBtnContainer: {
        width: '100%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginBlock: 20,
        borderColor: '#235ad8',
        borderWidth: 2,
        borderRadius: 20
    }
})


export default ViewAllButton;