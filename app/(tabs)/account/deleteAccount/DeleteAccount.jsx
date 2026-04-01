import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useAuth } from "../../../hooks/useAuth";

export default function DeleteAccount() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();
    const userEmail = user?.user_metadata.email;

    const handleSubmit = async () => {
        if (!phoneNumber) {
            Alert.alert("Something went wrong...", "Please enter a valid phone number");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch("https://esimserver.onrender.com/delete-account-request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail, phone: phoneNumber }),
            });

            const data = await res.json();

            if (!res.ok) {
                Alert.alert("Something went wrong...", "Failed to send delete account request. Please try again later.");
                console.log(data);
            }

            Alert.alert("Success", "Request sent successfully!");
            setPhoneNumber("");

        } catch (e) {
            console.log(e)
            Alert.alert("Something went wrong...", e.message || "Failed to send delete account request. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Request to Delete Account</Text>
            <View style={styles.emailContainer}>
                <Text style={{ fontSize: 16, color: '#a8a8b0' }}>{userEmail}</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Your phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.button} onPress={loading ? null : handleSubmit}>
                <Text style={styles.buttonText}>{loading ? "Sending..." : "Send Request"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 30,
        marginTop: '50%'
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: '#e5e5e5',
        borderWidth: 1.2,
        borderRadius: 15,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        color: '#a8a8b0',
    },
    emailContainer: {
        width: '100%',
        height: 50,
        borderColor: '#e5e5e5',
        borderWidth: 1.2,
        borderRadius: 15,
        paddingHorizontal: 15,
        marginBottom: 15,
        justifyContent: 'center'
    },
    button: {
        marginTop: 10,
        backgroundColor: '#366bef',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});