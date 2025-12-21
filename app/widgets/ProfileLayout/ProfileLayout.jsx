import { Text, View } from "react-native";

import ProfileAbout from "../../features/ui/profile-about/ProfileAbout";
import ProfileSupport from "../../features/ui/profile-support/ProfileSupport";
import ProfileInfo from "../../features/ui/profile-user-info/ProfileInfo";
import ProfilePreference from "../../features/ui/profile-user-preference/ProfilePreference";


function ProfileLayout() {
    return (
        <View style={{ gap: 20 }}>
            <View style={{ gap: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#878c90' }}>My Account</Text>
                <ProfileInfo />
            </View>
            <View style={{ gap: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#878c90' }}>Preference</Text>
                <ProfilePreference />
            </View>
            <View style={{ gap: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#878c90' }}>Support</Text>
                <ProfileSupport />
            </View>
            <View style={{ gap: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#878c90' }}>About Us</Text>
                <ProfileAbout />
            </View>
        </View>
    )
}


export default ProfileLayout;