import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";


const Notifications = ({ toggleSwitchEmail, toggleSwitchPush, isEnabledPush, isEnabledEmail }) => {
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ gap: 2 }}>
                    <Text style={{ fontSize: 16 }}>Push Notifications</Text>
                    <Text style={{ color: '#707175' }}>Receive alerts about your eSIM status</Text>
                </View>
                <Switch
                    ios_backgroundColor="transparent"
                    onValueChange={toggleSwitchPush}
                    value={isEnabledPush}
                    style={{ transform: [{ scaleX: .9 }, { scaleY: .9 }] }}
                />
            </View>
            <View style={styles.line} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ gap: 2 }}>
                    <Text style={{ fontSize: 16 }}>Email Notifications</Text>
                    <Text style={{ color: '#707175' }}>Get updates about new deals and offers</Text>
                </View>
                <Switch
                    ios_backgroundColor="transparent"
                    onValueChange={toggleSwitchEmail}
                    value={isEnabledEmail}
                    style={{ transform: [{ scaleX: .9 }, { scaleY: .9 }] }}
                />
            </View>
        </>
    );
};


const LanguageRegion = () => {
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16 }}>Language</Text>
                <Text style={{ color: '#707175', fontSize: 15 }}>English</Text>
            </View>
            <View style={styles.line} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16 }}>Currency</Text>
                <Text style={{ color: '#707175', fontSize: 15 }}>USD ($)</Text>
            </View>
        </>
    );
};



function PreferenceSection({ tag, user }) {
    const [isEnabledPush, setIsEnabledPush] = useState(false);
    const [isEnabledEmail, setIsEnabledEmail] = useState(false);

    const toggleSwitchPush = () => setIsEnabledPush(previousState => !previousState);
    const toggleSwitchEmail = () => setIsEnabledEmail(previousState => !previousState);

    return (
        <View style={styles.prefrenceContainer}>
            {tag === "notify" ? <Notifications
                toggleSwitchEmail={toggleSwitchEmail}
                toggleSwitchPush={toggleSwitchPush}
                isEnabledEmail={isEnabledEmail}
                isEnabledPush={isEnabledPush} /> : null}
            {tag === "lang-region" ? <LanguageRegion /> : null}
        </View>
    );
};


const styles = StyleSheet.create({
    prefrenceContainer: {
        backgroundColor: '#f8faf9',
        paddingHorizontal: 20,
        paddingVertical: 25,
        borderRadius: 15,
        marginTop: 20
    },
    line: {
        width: '100%',
        height: 1.5,
        backgroundColor: '#e8eae9',
        borderRadius: 10,
        marginBlock: 10
    }
})


export default PreferenceSection;