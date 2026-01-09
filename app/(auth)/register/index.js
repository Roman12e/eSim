import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthButton from "../../shared/ui/AuthButton/AuthButton";
import ErrorMessage from "../../shared/ui/ErrorMessage/ErrorMessage";
import Icon from "../../shared/ui/Icon/Icon";
import TextButton from "../../shared/ui/TextButton/TextButton";
import AuthInputForm from "../../widgets/AuthInputForm/AuthInputForm";

import { useAuth } from "../../hooks/useAuth";


function RegisterScreen() {
    const navigation = useNavigation();
    const router = useRouter();

    const { signUp } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async () => {
        if (email === "" || password === "" || name === "" || confirmPassword === "") {
            setErrorMsg('Please fill in all fields.')
            setIsError(true);
            return;
        } else if (password !== confirmPassword) {
            setErrorMsg("Your password fields aren't the same")
            setIsError(true);
            return;
        }
        setIsError(false);

        const response = await signUp(email, password, name);
        if (response?.error && !response.exists) {
            switch (response.error?.code) {
                case "weak_password":
                    Alert.alert("Error", "Password must be at least 6 characters long.");
                    console.log("Длина пароля должна быть не менее 6 символов");
                    break;
                case "validation_failed":
                    Alert.alert("Error", "Invalid email format.");
                    console.log("Формат почты указан неверно");
                    break;
                case "user_already_exists":
                    Alert.alert("Error", "User already exists");
                    console.log("Такой пользователь уже существует");
                    break;
                default:
                    Alert.alert("Error", "An error occurred during registration.");
                    console.log("Произошла ошибка:", response.error);
                    break;
            }
            return;
        }
        if (response.exists) {
            Alert.alert("Error", "A user with this email already exists.");
            console.log("Пользователь с такой почтой уже существует", response.data);
            return;
        }
        console.log("Успешная регистрация");
        router.replace("/(tabs)/explore/")
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <Icon name="user-plus" size={50} />
                    <View style={{ marginTop: 30, alignItems: 'center', gap: 8 }}>
                        <Text style={styles.headerTitle}>Create Account</Text>
                        <Text style={styles.subHeader}>Sign up to get started with travel eSIMs</Text>
                    </View>
                    {!isError ? null : <ErrorMessage message={errorMsg} />}
                    <AuthInputForm
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        name={name}
                        setName={setName}
                        isLogin={false}
                    />
                    <AuthButton title={"Sign Up"} onPress={handleLogin} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBlock: 30 }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#eeeeee' }} />
                        <Text style={{ color: '#a6a7ab' }}>Or</Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#eeeeee' }} />
                    </View>
                    <TextButton
                        title="Already have an account? "
                        paintedTitle="Sign In"
                        onPress={() => { navigation.navigate('login') }}
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


export default RegisterScreen;