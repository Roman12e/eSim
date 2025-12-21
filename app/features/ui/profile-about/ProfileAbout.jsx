import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

import ProfileLabel from "../../../shared/ui/ProfileLabel/ProfileLabel";


function ProfileAbout() {
    const navigation = useNavigation();

    return (
        <View style={{ gap: 15 }}>
            <ProfileLabel
                title={"Privacy Policy"}
                img={<Feather name="shield" size={24} color="#2565e9" />}
                onPress={() => navigation.navigate("section/Section", {
                    title: "Privacy Policy",
                    tag: "privacy-policy",
                    section: "about"
                })} />
            <ProfileLabel
                title={"Terms of Service"}
                img={<Feather name="file" size={24} color="#2565e9" />}
                onPress={() => navigation.navigate("section/Section", {
                    title: "Terms of Service",
                    tag: "terms-service",
                    section: "about"
                })} />
        </View>
    );
};


export default ProfileAbout;