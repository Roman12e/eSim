import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";


const PersonalInfo = ({ user, memberSince }) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 15, color: '#707175' }}>Name</Text>
                <Text style={{ fontSize: 15 }}>{user?.user_metadata.name}</Text>
            </View>
            <View style={styles.line} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 15, color: '#707175' }}>Email</Text>
                <Text style={{ fontSize: 15 }}>{user?.user_metadata.email}</Text>
            </View>
            <View style={styles.line} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 15, color: '#707175' }}>Member Since</Text>
                <Text style={{ fontSize: 15 }}>{memberSince?.toLocaleDateString()}</Text>
            </View>
        </View>
    )
}

const PaymentMethods = () => {
    return (
        <View style={{ marginTop: '10%', alignItems: 'center' }}>
            <View style={styles.iconContainer}>
                <Feather name="credit-card" size={50} color="#949ba3" />
            </View>
            <Text style={styles.title}>No Payment Methods</Text>
            <Text style={styles.description} numberOfLines={2}>Payment methods will be saved when you make your first purchase</Text>
        </View>
    )
}

const PurchaseHistory = () => {
    return (
        <View style={{ marginTop: '10%', alignItems: 'center' }}>
            <View style={styles.iconContainer}>
                <Feather name="file-text" size={50} color="#949ba3" />
            </View>
            <Text style={styles.title}>No Purchases Yet</Text>
            <Text style={styles.description} numberOfLines={2}>Your purchase history will appear here</Text>
        </View>
    )
}


function AccountSection({ tag, user }) {
    const memberSince = new Date(user?.confirmed_at);

    return (
        <>
            {tag === "personal-info" ? <PersonalInfo user={user} memberSince={memberSince} /> : null}
            {tag === "payment-methods" ? <PaymentMethods /> : null}
            {tag === "purchase-history" ? <PurchaseHistory /> : null}
        </>
    );
};


const styles = StyleSheet.create({
    container: {
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
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafc',
        borderRadius: 50,
        height: 100,
        width: 100,
        marginBlock: 20
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    description: {
        color: '#707175',
        width: 280,
        textAlign: 'center',
        fontSize: 15,
        marginTop: 5
    }
})


export default AccountSection;