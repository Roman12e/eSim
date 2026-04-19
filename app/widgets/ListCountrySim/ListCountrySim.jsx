import { ScrollView, Text, View } from "react-native";

import CountryPlans from "../../features/ui/country-plans/CountryPlans";

export default function ListCountrySim({ data }) {
    if (data.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                <Text style={{ fontSize: 16, color: '#707175' }}>There is no available data yet.</Text>
            </View>
        )
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
            {data.map((item, index) => (
                <CountryPlans
                    key={index}
                    data={item}
                />
            ))}
        </ScrollView>
    );
};