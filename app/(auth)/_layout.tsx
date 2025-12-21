import { Stack } from "expo-router";

function AuthLayout() {
    return <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
            name="login"
        />
        <Stack.Screen
            name="register"
        />
    </Stack>;
}


export default AuthLayout;