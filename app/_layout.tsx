import { Stack } from "expo-router";
import AuthProvider from "./providers/AuthProvider";

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </AuthProvider>
    );
}