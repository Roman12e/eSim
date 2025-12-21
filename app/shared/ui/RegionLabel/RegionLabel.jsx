import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


function RegionLabel({ regionName, onPress, img }) {
    return (
        <TouchableOpacity style={styles.labelContainer} onPress={onPress}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                {img}
                <Text style={{ fontSize: 15 }}>{regionName}</Text>
            </View>
            <Feather name="arrow-right" size={20} color="#9e9fa4" />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15,
        height: 65,
        borderRadius: 15,
        backgroundColor: '#f8faf9',
        alignItems: 'center'
    }
})

export default RegionLabel;