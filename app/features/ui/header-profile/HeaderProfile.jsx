import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";


export default function HeaderProfile({ user }) {
    const navigation = useNavigation();

    return (
        <View style={styles.headerContainer}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <View style={styles.userAvatar}>
                    <Text style={{ fontSize: 17, fontWeight: '600', color: 'white' }}>
                        {user?.name?.[0] ?? ''}
                    </Text>
                </View>
                <View style={{ gap: 3 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>
                        {user?.name ?? '—'}
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                        {user?.email ?? ''}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("edit/EditScreen")}
                style={styles.editBtnContainer}>
                <Feather name="edit-2" size={18} color="#2565e9" />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f8f9fb',
        padding: 18,
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 30
    },
    userAvatar: {
        backgroundColor: '#2962ed',
        alignItems: 'center',
        justifyContent: 'center',
        width: 55,
        height: 55,
        borderRadius: 40
    },
    editBtnContainer: {
        backgroundColor: '#e6eef9',
        width: 40,
        height: 40,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
