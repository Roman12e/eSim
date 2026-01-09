import { Stack } from "expo-router";

export default function AccountLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShadowVisible: false, headerTitle: 'Account' }} />
            <Stack.Screen name="section/Section" options={{ headerShadowVisible: false }} />
            <Stack.Screen name="edit/EditScreen" options={{ headerShadowVisible: false }} />
        </Stack>
    );
}
