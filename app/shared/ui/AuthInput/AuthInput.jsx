import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


function AuthInput({
    placeholder,
    keyboardType = "default",
    isPassword = false,
    value,
    onChangeText,
    type
}) {
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    return (
        <View style={{ width: '100%', marginBottom: 5 }}>
            <Text style={styles.label}>{placeholder}</Text>
            <View style={styles.inputContainer}>
                <Feather name={type} size={22} color="#a3a7aa" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={(value) => onChangeText(value)}
                    secureTextEntry={isPassword ? secureTextEntry : false}
                />
                {isPassword && <TouchableOpacity style={{ padding: 5 }}>
                    <Feather
                        name={secureTextEntry ? "eye-off" : "eye"}
                        size={22}
                        color="#a3a7aa"
                        style={styles.icon}
                        onPress={() => setSecureTextEntry(!secureTextEntry)}
                    />
                </TouchableOpacity>}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#5f6064',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 8,
        height: 50,
        width: '100%',
        backgroundColor: '#f9fafc',
    },
    icon: { marginRight: 10 },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#9d9ea3',
    },
});

export default AuthInput;