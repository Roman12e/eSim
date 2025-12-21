import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import HowWorksButton from '../../../shared/ui/HowWorksButton/HowWorksButton';


function CountryPlans({ data }) {
    const router = useRouter();

    return (
        <View style={styles.planContainer}>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, fontWeight: '600' }}>{data.volume >= 1024 ? data.volume / 1024 + " GB" : data.volume + " MB"}</Text>
                <Text style={{ fontSize: 20, fontWeight: '600', color: '#2565e9' }}>${data.price}</Text>
            </View>
            <Text style={{ fontSize: 15, color: '#707175', marginTop: 5 }}>{data.name}</Text>
            <View style={styles.line} />
            <View style={{ gap: 8 }}>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                    <Ionicons name="pricetag-outline" size={17} color="#2565e9" />
                    <Text style={{ fontSize: 16.5, color: '#707175' }}>${data.price}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                    <AntDesign name="clock-circle" size={17} color="#2565e9" />
                    <Text style={{ fontSize: 16.5, color: '#707175' }}>{data.duration} day(s)</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                    <Feather name="database" size={17} color="#2565e9" />
                    <Text style={{ fontSize: 16.5, color: '#707175' }}>{data.volume >= 1024 ? data.volume / 1024 + " GB" : data.volume + " MB"}</Text>
                </View>
            </View>
            <HowWorksButton
                onPress={() => router.push({
                    pathname: `/explore/howWorks/HowWorks`,
                    params: { id: data.id, countryName: data.product_coverage.country_name }
                })}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    planContainer: {
        backgroundColor: '#f8faf9',
        padding: 18,
        borderRadius: 20,
        borderColor: '#2664eb',
        marginBlock: 10
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#e8eae9',
        marginBlock: 15
    }
})

export default CountryPlans;