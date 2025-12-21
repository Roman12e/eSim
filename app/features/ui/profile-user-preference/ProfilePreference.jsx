import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

import ProfileLabel from "../../../shared/ui/ProfileLabel/ProfileLabel";


function ProfilePreference() {
    const navigation = useNavigation();

    return (
        <View style={{ gap: 15 }}>
            <ProfileLabel
                title={"Notifications"}
                img={<Ionicons name="notifications-outline" size={24} color="#2565e9" />}
                onPress={() => navigation.navigate("section/Section", {
                    title: "Notifications",
                    tag: "notify",
                    section: "preference"
                })} />
            <ProfileLabel
                title={"Language & Region"}
                img={<Ionicons name="earth-outline" size={24} color="#2565e9" />}
                onPress={() => navigation.navigate("section/Section", {
                    title: "Language & Region",
                    tag: "lang-region",
                    section: "preference"
                })} />
        </View>
    );
};


export default ProfilePreference;