import { StyleSheet, Text, TouchableOpacity } from "react-native";
import CountryFlag from "react-native-country-flag";


function PopularButton({ isoCode, countryName, onPress }) {
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
            <CountryFlag isoCode={isoCode} size={20} />
            <Text style={{ fontSize: 17, fontWeight: '500' }} numberOfLines={1}>{countryName}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        width: 150,
        height: 100,
        borderRadius: 15,
        backgroundColor: '#f8faf9',
        justifyContent: 'center',
        gap: 10,
        paddingHorizontal: 20
    }
})


export default PopularButton;