import { StyleSheet, Text, TouchableOpacity } from "react-native";


function TextButton({ title, paintedTitle, onPress }) {
    return (
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={onPress} activeOpacity={0}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.paintedTitle}>{paintedTitle}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: '#5e6168',
        fontWeight: '500',
    },
    paintedTitle: {
        fontSize: 16,
        color: '#366bef',
        fontWeight: '500',
    },
});


export default TextButton;