import { Tabs } from "expo-router";

import ExpoStripeProvider from "../providers/StripeProvider";


function TabsLayout() {
    return (
        <ExpoStripeProvider>
            <Tabs screenOptions={{ headerShown: false }}>
                <Tabs.Screen name="explore" />
                <Tabs.Screen name="account" />
            </Tabs>
        </ExpoStripeProvider>
    );
}


export default TabsLayout;