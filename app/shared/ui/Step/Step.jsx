import { StyleSheet, Text, View } from "react-native";


function Step({ index, title, desc }) {
    return (
        <View style={{ gap: 12 }}>
            <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.stepContainer}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>{index + 1}</Text>
                </View>
                <View style={{ gap: 2 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>{title}</Text>
                    <Text style={{ color: '#707175' }}>{desc}</Text>
                </View>
            </View>
            {index === 2 ? null :
                <View style={{ height: 2, backgroundColor: '#e6ecea', width: '100%', borderRadius: 10 }} />}
        </View>
    )
}


const styles = StyleSheet.create({
    stepContainer: {
        width: 35,
        height: 35,
        backgroundColor: '#2565e9',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default Step;