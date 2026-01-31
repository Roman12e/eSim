export default {
    expo: {
        name: "The Best eSIM",
        slug: "thebestesim",
        ios: {
            bundleIdentifier: "com.roman15e.thebestesim",
            infoPlist: {
                "ITSAppUsesNonExemptEncryption": false,
                "NSCameraUsageDescription": "Камера используется для сканирования QR-кодов и активации eSIM.",
                "NSPhotoLibraryUsageDescription": "Доступ к галерее нужен для выбора изображений.",
                "NSFaceIDUsageDescription": "Face ID используется для подтверждения платежей."
            }
        },
        extra: {
            eas: {
                projectId: "6fb6c17d-5b48-440a-9960-487ae35270c7"
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
