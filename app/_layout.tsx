import { Stack } from "expo-router";
import AuthProvider from "./providers/AuthProvider";

function RootLayout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </AuthProvider>
    );
}


export default RootLayout;