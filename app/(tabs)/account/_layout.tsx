import { Stack } from "expo-router";

function AccountLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShadowVisible: false, headerTitle: 'Account' }} />
            <Stack.Screen name="section/Section" options={{ headerShadowVisible: false }} />
        </Stack>
    );
}


export default AccountLayout;