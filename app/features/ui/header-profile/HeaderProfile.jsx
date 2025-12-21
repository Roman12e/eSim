import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { supabase } from "../../../shared/api/supabase/supabaseConfig";


function HeaderProfile() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();

            if (!data?.user) return;

            setUserData(data.user.user_metadata ?? {});
        };

        fetchUser();
    }, []);

    return (
        <View style={styles.headerContainer}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <View style={styles.userAvatar}>
                    <Text style={{ fontSize: 17, fontWeight: '600', color: 'white' }}>
                        {userData?.name?.[0] ?? ''}
                    </Text>
                </View>
                <View style={{ gap: 3 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>
                        {userData?.name ?? '—'}
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                        {userData?.email ?? ''}
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.editBtnContainer}>
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


export default HeaderProfile;