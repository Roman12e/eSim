import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

import ProfileLabel from "../../../shared/ui/ProfileLabel/ProfileLabel";


function ProfileSupport() {
    const navigation = useNavigation();

    return (
        <View style={{ gap: 15 }}>
            <ProfileLabel
                title={"Help Center"}
                img={<Ionicons name="help-circle-outline" size={24} color="#2565e9" />}
                onPress={() => navigation.navigate("section/Section", {
                    title: "Help center",
                    tag: "help-center",
                    section: "support"
                })} />
            <ProfileLabel
                title={"Contact Support"}
                img={<Ionicons name="chatbubble-outline" size={24} color="#2565e9" />}
                onPress={() => navigation.navigate("section/Section", {
                    title: "Contact Support",
                    tag: "contact-support",
                    section: "support"
                })} />
        </View>
    );
};


export default ProfileSupport;