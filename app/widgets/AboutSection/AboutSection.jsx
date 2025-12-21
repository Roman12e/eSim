import { StyleSheet, Text, View } from "react-native";


const PrivacyPolicy = () => {
    return (
        <>
            <Text style={{ fontSize: 16, color: '#707175' }}>We are committed to protecting your privacy. Your personal information is stored securely and never shared with third parties without your consent.</Text>
            <Text style={{ color: '#acacb6', marginTop: 15 }}>Last updated: December 2024</Text>
        </>
    );
};



const TermsService = () => {
    return (
        <>
            <Text style={{ fontSize: 16, color: '#707175' }}>By using The Best eSIM? you agree to our terms of service. We provide reliable eSIM services for travelers worldwide.</Text>
            <Text style={{ color: '#acacb6', marginTop: 15 }}>Last updated: December 2024</Text>
        </>
    );
};


function AboutSection({ tag }) {
    return (
        <View style={styles.container}>
            {tag === "privacy-policy" ? <PrivacyPolicy /> : <TermsService />}
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
})


export default AboutSection;