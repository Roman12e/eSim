import { ScrollView } from "react-native";

import CountryPlans from "../../features/ui/country-plans/CountryPlans";

export default function ListCountrySim({ data }) {
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