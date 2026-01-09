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
        android: {
            "package": "com.roman15e.thebestesim"
        },
        extra: {
            eas: {
                projectId: "d7c88d04-0461-4315-8a0e-93df7a7103d5"
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
        ]
    }
};