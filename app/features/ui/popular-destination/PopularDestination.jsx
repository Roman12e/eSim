import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

import PopularButton from "../../../shared/ui/PopularButton/PopularButton";


function PopularDestinations({ data }) {
    const router = useRouter();

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', gap: 20 }}>
                {data.map((item, index) => (
                    <PopularButton
                        isoCode={item.country_iso2}
                        countryName={item.country_name}
                        key={index}
                        onPress={() => router.push({
                            pathname: `/explore/listCountrySim/${item.country_name}`,
                            params: { countryName: item.country_name, isoCode: item.country_iso2.toLowerCase() }
                        })}
                    />
                ))}
            </View>
        </ScrollView>
    )
}


export default PopularDestinations;