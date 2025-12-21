import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { View } from "react-native";

import ProfileLabel from "../../../shared/ui/ProfileLabel/ProfileLabel";


function ProfileInfo() {
    const navigation = useNavigation();

    return (
        <View style={{ gap: 15 }}>
            <ProfileLabel
                title={"Personal Info"}
                img={<Feather name="user" size={24} color="#2565e9" />}
                onPress={() => navigation.navigate("section/Section", {
                    title: "Personal Info",
                    tag: "personal-info",
                    section: "account"
                })} />
            <ProfileLabel
                title={"Payment Methods"}
                img={<Feather name="credit-card" size={24} color="#2565e9" />}
                onPress={() => navigation.navigate("section/Section", {
                    title: "Payment Methods",
                    tag: "payment-methods",
                    section: "account"
                })} />
            <ProfileLabel
                title={"Purchase History"}
                img={<Feather name="file-text" size={24} color="#2565e9" />}
                onPress={() => navigation.navigate("section/Section", {
                    title: "Purchase History",
                    tag: "purchase-history",
                    section: "account"
                })} />
        </View>
    );
};


export default ProfileInfo;