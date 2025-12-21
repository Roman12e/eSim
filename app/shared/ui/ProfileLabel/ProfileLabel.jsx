import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


function ProfileLabel({ title, img, onPress }) {
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <View style={styles.imgContainer}>
                    {img}
                </View>
                <Text style={{ fontSize: 16 }}>{title}</Text>
            </View>
            <Feather name="arrow-right" size={20} color="#9e9fa4" />
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15,
        height: 65,
        borderRadius: 15,
        backgroundColor: '#f8faf9',
        alignItems: 'center'
    },
    imgContainer: {
        backgroundColor: '#e6eef9',
        padding: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default ProfileLabel;