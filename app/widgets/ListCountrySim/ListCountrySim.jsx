import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import CountryPlans from "../../features/ui/country-plans/CountryPlans";


function ListCountrySim({ data }) {
    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Text style={{ fontSize: 17, fontWeight: '600', color: 'black' }}>Available Plans</Text>
                <Ionicons name="checkmark-circle-outline" size={20} color="#08b178" />
            </View>
            {data.map((item, index) => (
                <CountryPlans
                    key={index}
                    data={item}
                />
            ))}
        </View>
    );
};


export default ListCountrySim;