import { useLayoutEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../../hooks/useUser";

import { supabase } from "../../../shared/api/supabase/supabaseConfig";

import SafeButton from "../../../shared/ui/SafeButton/SafeButton";


export default function EditScreen() {
    const [name, setName] = useState('');
    const [lang, setLang] = useState('');

    const { user, setUser } = useUser();

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ title: "Edit" })
    }, [navigation]);

    const safeData = async () => {
        if (name || lang) {
            const { data, error } = await supabase
                .from("users")
                .update({ name: name })
                .eq("id", user.id)
                .select()
                .single();

            if (!error) {
                setUser(data);
                navigation.goBack();
            } else {
                console.log({ error });
            }
        }
    }

    if (!user) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <ActivityIndicator size={100} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20, alignItems: 'center' }}>
            {/* <TouchableOpacity style={styles.avatarContainer}>
                <Feather name="camera" size={30} color="#235ad8" />
            </TouchableOpacity>
            <Text style={{ flexDirection: 18, color: '#235ad8', marginBlock: 10 }}>Choose a photo</Text> */}
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder={user.name}
                    style={styles.input}
                    value={name}
                    onChangeText={(value) => setName(value)}
                />
                <View style={styles.line} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: '#9d9ea3', fontSize: 15, marginBlock: 15 }}>English</Text>
                    <Text style={{ color: '#9d9ea3' }}>In development</Text>
                </View>
            </View>
            <SafeButton onPress={safeData} />
        </View>
    )
}


const styles = StyleSheet.create({
    avatarContainer: {
        width: 95,
        height: 95,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eff1fd',
        borderRadius: 50,
        marginTop: '10%'
    },
    inputContainer: {
        width: '100%',
        backgroundColor: '#f8faf9',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 30,
        marginTop: 35,
    },
    line: {
        width: '100%',
        height: 1.3,
        backgroundColor: '#e8eae9',
        borderRadius: 10,
        alignSelf: 'center'
    },
    input: {
        fontSize: 15,
        color: '#9d9ea3',
        height: 50
    }
})