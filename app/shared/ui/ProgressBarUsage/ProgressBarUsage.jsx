import { StyleSheet, View } from "react-native";


export default function PorgressBarUsage({ usedData, totalData, color }) {
    const progressPercent = Math.round(usedData * 100 / totalData, 2);
    return (
        <View style={styles.barContainer}>
            <View style={[styles.progress, { width: `${progressPercent}%`, backgroundColor: color }]} />
        </View>
    );
}


const styles = StyleSheet.create({
    barContainer: {
        width: '100%',
        height: 10,
        borderRadius: 20,
        backgroundColor: '#e7e8ea',
        marginTop: 5,
        marginBottom: 12
    },
    progress: {
        height: 10,
        borderRadius: 20,
        backgroundColor: '#19b683'
    }
})