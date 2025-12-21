import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import AboutSection from "../../../widgets/AboutSection/AboutSection";
import AccountSection from "../../../widgets/AccountSection/AccountSection";
import PreferenceSection from "../../../widgets/PreferenceSection/PreferenceSection";
import SupportSection from "../../../widgets/SupportSection/SupportSection";

import { supabase } from "../../../shared/api/supabase/supabaseConfig";


function Section() {
    const [userData, setUserData] = useState(null);

    const navigation = useNavigation();
    const route = useRoute();

    const { title, tag, section } = route.params;

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();

            if (!data?.user) return;
            setUserData(data.user ?? {});
        };

        fetchUser();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({ title: title })
    }, [navigation]);

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 20 }} edges={['left', 'right']}>
            {section === "account" ? <AccountSection tag={tag} user={userData} /> : null}
            {section === "preference" ? <PreferenceSection tag={tag} user={userData} /> : null}
            {section === "support" ? <SupportSection tag={tag} /> : null}
            {section === "about" ? <AboutSection tag={tag} /> : null}
        </SafeAreaView>
    );
};


export default Section;