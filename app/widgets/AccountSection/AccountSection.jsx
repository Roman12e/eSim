import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { supabase } from "../../shared/api/supabase/supabaseConfig";


const PersonalInfo = ({ user, memberSince, name }) => {
    if (!user || name === "") {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 15, color: '#707175' }}>Name</Text>
                <Text style={{ fontSize: 15 }}>{name}</Text>
            </View>
            <View style={styles.line} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 15, color: '#707175' }}>Email</Text>
                <Text style={{ fontSize: 15 }}>{user?.email}</Text>
            </View>
            <View style={styles.line} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 15, color: '#707175' }}>Member Since</Text>
                <Text style={{ fontSize: 15 }}>{memberSince?.toLocaleDateString()}</Text>
            </View>
        </View>
    );
}

const PaymentMethods = () => {
    return (
        <View style={{ marginTop: '10%', alignItems: 'center' }}>
            <View style={styles.iconContainer}>
                <Feather name="credit-card" size={50} color="#949ba3" />
            </View>
            <Text style={styles.description} numberOfLines={5}>
                We never store your card details.
                All payments are processed by our certified partner Stripe, one of the world’s largest payment platforms.
            </Text>
        </View>
    )
}

const PurchaseHistory = ({ payments }) => {
    if (!payments) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    };

    if (payments.length === 0) {
        return (
            <View style={{ marginTop: '10%', alignItems: 'center' }}>
                <View style={styles.iconContainer}>
                    <Feather name="file-text" size={50} color="#949ba3" />
                </View>
                <Text style={styles.title}>No Purchases Yet</Text>
                <Text style={styles.description}>
                    Your purchase history will appear here
                </Text>
            </View>
        );
    };

    return (
        <ScrollView style={{ backgroundColor: 'white', flex: 1, paddingTop: 10 }} edges={['left', 'right']}>
            {payments.map((item, index) => {
                const createdAt = new Date(item?.created_at).toLocaleDateString()
                return (
                    <TouchableOpacity
                        style={styles.paymentContainer}
                        key={index}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 17, fontWeight: '600' }}>{item?.countryTitle}</Text>
                            <View style={{ gap: 5 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, alignSelf: 'flex-end' }}>
                                    <Text style={{ fontSize: 17, fontWeight: '500' }}>{item?.amount / 100}</Text>
                                    <Text style={{ fontSize: 17, fontWeight: '500' }}>{item?.currency.toUpperCase()}</Text>
                                </View>
                                <Text style={{ fontSize: 16, color: '#707175', fontWeight: '400' }}>{createdAt}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    );
}


function AccountSection({ tag, user }) {
    const memberSince = new Date(user?.created_at);

    const [payments, setPayments] = useState(null);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPayments = async () => {
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("id", user?.id)
                .single();

            if (error) {
                console.error(error);
                setPayments([]);
                setLoading(false);
                return;
            }

            const rawPayments = data?.purchase_history?.payments;
            const userName = data?.name;

            setName(userName);
            setPayments(Array.isArray(rawPayments) ? rawPayments : []);
            setLoading(false);
        };

        if (user?.id) loadPayments();
    }, [user?.id]);

    return (
        <>
            {tag === "personal-info" ? <PersonalInfo user={user} name={name} memberSince={memberSince} /> : null}
            {tag === "payment-methods" ? <PaymentMethods /> : null}
            {tag === "purchase-history" ? <PurchaseHistory payments={payments} /> : null}
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
        textAlign: 'center',
        fontSize: 15
    },
    paymentContainer: {
        borderRadius: 20,
        marginTop: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5'
    }
})


export default AccountSection;