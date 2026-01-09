import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import AboutSection from "../../../widgets/AboutSection/AboutSection";
import AccountSection from "../../../widgets/AccountSection/AccountSection";
import PreferenceSection from "../../../widgets/PreferenceSection/PreferenceSection";
import SupportSection from "../../../widgets/SupportSection/SupportSection";

import { useUser } from "../../../hooks/useUser";



export default function Section() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = useUser();

    const { title, tag, section } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({ title: title })
    }, [navigation]);

    if (!user) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 10 }} edges={['left', 'right']}>
            {section === "account" ? <AccountSection tag={tag} user={user} /> : null}
            {section === "preference" ? <PreferenceSection tag={tag} user={user} /> : null}
            {section === "support" ? <SupportSection tag={tag} /> : null}
            {section === "about" ? <AboutSection tag={tag} /> : null}
        </SafeAreaView>
    );
};