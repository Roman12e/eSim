import { Stack } from "expo-router";

export default function MyEsimsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    title: "My eSIMs",
                }} />
            <Stack.Screen
                name="ESimInfo/ESimInfo"
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                }} />
        </Stack>
    );
}
