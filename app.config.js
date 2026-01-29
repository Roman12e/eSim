export default {
    expo: {
        name: "The Best eSIM",
        slug: "thebestesim",
        ios: {
            bundleIdentifier: "com.roman15e.thebestesim",
            infoPlist: {
                "ITSAppUsesNonExemptEncryption": false
            }
        },
        extra: {
            eas: {
                "projectId": "7d087733-a8d9-44ad-8322-a78d4242d9ac"
            },
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseKey: process.env.SUPABASE_ANON_KEY
        },
        plugins: [
            [
                "@stripe/stripe-react-native",
                {
                    merchantIdentifier: process.env.MERCHANT_IDENTIFIER,
                    publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLICHABLE_KEY
                }
            ]
        ],
        owner: "roman12e"
    }
};
