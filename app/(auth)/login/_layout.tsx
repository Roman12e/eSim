import { Stack } from "expo-router";

function LoginLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                title: "Login"
            }}
        />
    );
}


export default LoginLayout;