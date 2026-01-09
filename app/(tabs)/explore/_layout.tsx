import { Stack } from "expo-router";

export default function ExploreLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    title: "The Best eSIM",
                }} />
            <Stack.Screen
                name="listCountrySim/[listSim]"
                options={{
                    headerBackTitle: "Explore",
                    headerShown: true,
                    headerShadowVisible: false,
                }} />
            <Stack.Screen
                name="howWorks/HowWorks"
                options={{
                    headerBackTitle: "Back",
                    headerShown: true,
                    headerShadowVisible: false,
                    title: 'How it Works',
                }} />
            <Stack.Screen
                name="regionCountries/RegionCountries"
                options={{
                    headerBackTitle: "Explore",
                    headerShown: true,
                    headerShadowVisible: false,
                }} />
        </Stack>
    );
}
