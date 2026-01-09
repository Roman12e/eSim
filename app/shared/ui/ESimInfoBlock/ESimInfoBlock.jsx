import { StyleSheet, View } from "react-native";


export default function ESimInfoBlock({ children }) {
    return (
        <View style={styles.blockContainer}>
            {children}
        </View>
    )
}


const styles = StyleSheet.create({
    blockContainer: {
        width: '100%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: '#f8faf9',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 20
    }
})