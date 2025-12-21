import { Feather } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";


function SearchInput({ value, onChangeText }) {
    return (
        <View style={styles.searchContainer}>
            <Feather name="search" size={24} color="#bfc0c5" />
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder="Search..."
                style={{
                    width: '100%',
                    height: 55,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    color: '#a8a8b0',
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
        marginBlock: 15,
        backgroundColor: '#f9fbfa',
        borderColor: '#e5e5e5',
        borderWidth: 1.2,
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 50
    },
})


export default SearchInput;