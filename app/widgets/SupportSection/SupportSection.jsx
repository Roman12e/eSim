import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const HelpCenter = () => {
    return (
        <>
            <Text style={{ fontSize: 17, fontWeight: '600' }}>Frequently Asked Questions</Text>
            <View style={{ marginTop: 15 }}>
                <View style={{ gap: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>How do I install my eSIM?</Text>
                    <Text style={{ color: '#707175' }}>Go to Settings, then Cellural/Mobile Data, and tap Add eSIM. Follow the on-screen instructions.</Text>
                </View>
                <View style={styles.line} />
                <View style={{ gap: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>When should I activate my eSIM?</Text>
                    <Text style={{ color: '#707175' }}>We recommend activating your eSIM when you arrive at your destination to maximize validity.</Text>
                </View>
                <View style={styles.line} />
                <View style={{ gap: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>Can I use my eSIM for calls?</Text>
                    <Text style={{ color: '#707175' }}>Our eSIMs are data-only. You can use apps like WhatsApp or Skype for calls</Text>
                </View>
            </View>
        </>
    );
};


const ContactSupport = () => {
    return (
        <>
            <Text style={{ fontSize: 15, color: '#707175' }}>Our support team is availabel 24/7 to help you with any questions</Text>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 15 }}>
                <Feather name="mail" size={24} color="#2565e9" />
                <Text style={{ fontSize: 15 }}>support@thebestsim.app</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 15 }}>
                <MaterialCommunityIcons name="chat-outline" size={24} color="#2565e9" />
                <Text style={{ fontSize: 15 }}>Live Chat</Text>
            </View>
        </>
    );
};


function SupportSection({ tag }) {
    return (
        <View style={styles.container}>
            {tag === "help-center" ? <HelpCenter /> : <ContactSupport />}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8faf9',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 15,
        marginTop: 20
    },
    line: {
        width: '100%',
        height: 1.5,
        backgroundColor: '#e8eae9',
        borderRadius: 10,
        marginBlock: 10
    },
})


export default SupportSection;