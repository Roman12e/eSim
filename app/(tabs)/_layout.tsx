import { Feather, Ionicons } from '@expo/vector-icons';
import { Tabs } from "expo-router";

import ExpoStripeProvider from "../providers/StripeProvider";
import UserProvider from "../providers/UserProvider";


export default function TabsLayout() {
    return (
        <ExpoStripeProvider>
            <UserProvider>
                <Tabs screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "#366bef",
                    tabBarInactiveTintColor: "#a0a4af",
                }}>
                    <Tabs.Screen
                        name="explore"
                        options={{
                            title: "Explore",
                            tabBarIcon: ({ color }) => (
                                <Ionicons name="earth" size={24} color={color} />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="my-eSims"
                        options={{
                            title: "My eSIMs",
                            tabBarIcon: ({ color }) => (
                                <Feather name="smartphone" size={24} color={color} />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="account"
                        options={{
                            title: "Account",
                            tabBarIcon: ({ color }) => (
                                <Feather name="user" size={24} color={color} />
                            ),
                        }}
                    />
                </Tabs>
            </UserProvider>
        </ExpoStripeProvider>
    );
}
