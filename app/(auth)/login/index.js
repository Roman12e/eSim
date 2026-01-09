import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthButton from "../../shared/ui/AuthButton/AuthButton";
import ErrorMessage from "../../shared/ui/ErrorMessage/ErrorMessage";
import Icon from "../../shared/ui/Icon/Icon";
import TextButton from "../../shared/ui/TextButton/TextButton";
import AuthInputForm from "../../widgets/AuthInputForm/AuthInputForm";

import { useAuth } from "../../hooks/useAuth";


function LoginScreen() {
    const navigation = useNavigation();
    const router = useRouter();

    const { signIn } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);

    const handleLogin = async () => {
        if (email === "" || password === "") {
            setIsError(true);
            return;
        }
        setIsError(false);
        const response = await signIn(email, password);
        if (response.error) {
            switch (response.error.code) {
                case "email_address_invalid":
                case "validation_failed":
                    Alert.alert("Login Error", "Invalid email format.");
                    console.log("Неверный формат почты");
                    break;
                case "invalid_credentials":
                    Alert.alert("Login Error", "Incorrect email or password.");
                    console.log("Почта или пароль указаны неверно");
                    break;
                default:
                    Alert.alert("Login Error", "An unexpected error occurred. Please try again.");
                    console.log("Ошибка авторизации:", response.error);
                    break;
            }
            return;
        }
        console.log("Успешный вход");
        router.replace("/(tabs)/explore/")
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <Icon name="earth" isLogin={true} />
                    <View style={{ marginTop: 30, alignItems: 'center', gap: 8 }}>
                        <Text style={styles.headerTitle}>Welcome Back</Text>
                        <Text style={styles.subHeader}>Sign in to access your eSIM plans</Text>
                    </View>
                    {!isError ? null : <ErrorMessage message="Please enter both email and password." />}
                    <AuthInputForm
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        isLogin={true}
                    />
                    <AuthButton title={"Sign In"} onPress={handleLogin} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBlock: 40 }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#eeeeee' }} />
                        <Text style={{ color: '#a6a7ab' }}>Or</Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#eeeeee' }} />
                    </View>
                    <TouchableOpacity
                        onPress={() => router.replace('/(tabs)/explore/')}
                        style={styles.buttonBrowse}>
                        <Ionicons name="earth" size={24} color={"#366bef"} />
                        <Text style={styles.buttonBrowseText}>Browse Plans as Guest</Text>
                    </TouchableOpacity>
                    <TextButton
                        title="Don't have an account? "
                        paintedTitle="Sign Up"
                        onPress={() => { navigation.navigate('register') }}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        flex: 1,
        paddingTop: '25%',
    },
    scrollContent: {
        flexGrow: 1,
        width: '100%',
        alignItems: "center",
        paddingBottom: 50,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#0f1722',
    },
    subHeader: {
        fontSize: 16,
        color: '#8f9092',
    },
    buttonBrowse: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#f9fafc',
        borderColor: '#ededed',
        borderWidth: 1,
        paddingVertical: 15,
        borderRadius: 10,
        width: '100%',
        justifyContent: 'center',
        marginBottom: 20
    },
    buttonBrowseText: {
        color: '#366bef',
        fontSize: 17,
        fontWeight: '600',
    },
})


export default LoginScreen;