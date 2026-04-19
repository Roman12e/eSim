import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useMemo } from "react";
import { View } from "react-native";

import ListCountrySim from "../../../widgets/ListCountrySim/ListCountrySim";


const TabBarTop = createMaterialTopTabNavigator();

export default function TopNavigation({ data, loading }) {
    if (loading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <ActivityIndicator size="large" />
        </View>
    }

    const monthPlans = useMemo(
        () => (data || []).filter(item => item.duration === 30).sort((a, b) => a.price - b.price),
        [data]
    );
    const halfYearPlans = useMemo(
        () => (data || []).filter(item => item.duration === 180).sort((a, b) => a.price - b.price),
        [data]
    );

    const unlimitedPlans = useMemo(
        () => (data || []).filter(item => item.unlimited === 1).sort((a, b) => a.price - b.price),
        [data]
    );

    return (
        <View style={{ flex: 1 }}>
            <TabBarTop.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 15.5, fontWeight: '600' },
                    tabBarStyle: { backgroundColor: 'white', shadowColor: 'white', paddingTop: 10 },
                    tabBarInactiveTintColor: '#707175',
                    tabBarActiveTintColor: '#08b178',
                    tabBarIndicatorStyle: { backgroundColor: '#08b178', height: 3, borderRadius: 10 }
                }}
                initialRouteName="Month">
                <TabBarTop.Screen name="Month" options={{ title: '30 days' }}>
                    {() => <ListCountrySim data={monthPlans} />}
                </TabBarTop.Screen>
                <TabBarTop.Screen name="HalfYear" options={{ title: '180 days' }}>
                    {() => <ListCountrySim data={halfYearPlans} />}
                </TabBarTop.Screen>
                <TabBarTop.Screen name="Unlimited" options={{ title: 'Unlimited' }}>
                    {() => <ListCountrySim data={unlimitedPlans} />}
                </TabBarTop.Screen>
            </TabBarTop.Navigator>
        </View>
    );
};