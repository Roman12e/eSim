export default {
    name: "The Best eSIM",
    slug: "thebestesim",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./logo/Logo.png",
    scheme: "thebestesim",
    userInterfaceStyle: "automatic",
    newArchEnabled: false,

    ios: {
        bundleIdentifier: "com.roman15e.thebestesim",
        supportsTablet: false,
        infoPlist: {
            "ITSAppUsesNonExemptEncryption": false,
            "NSCameraUsageDescription": "Камера используется для сканирования QR-кодов и активации eSIM.",
            "NSPhotoLibraryUsageDescription": "Доступ к галерее нужен для выбора изображений.",
            "NSFaceIDUsageDescription": "Face ID используется для подтверждения платежей."
        },
        splash: {
            image: "./logo/Logo.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        }
    },

    android: {
        adaptiveIcon: {
            backgroundColor: "#ffffff",
            foregroundImage: "./logo/Logo.png"
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false
    },

    extra: {
        eas: {
            projectId: "7d087733-a8d9-44ad-8322-a78d4242d9ac"
        },
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_ANON_KEY
    },

    plugins: [
        [
            "expo-build-properties",
            {
                ios: {
                    buildNumber: 15,
                    infoPlist: {
                        "NSCameraUsageDescription": "Камера используется для сканирования QR-кодов и активации eSIM.",
                        "NSPhotoLibraryUsageDescription": "Доступ к галерее нужен для выбора изображений.",
                        "NSFaceIDUsageDescription": "Face ID используется для подтверждения платежей."
                    }
                },
                entitlements: {
                    "com.apple.developer.in-app-payments": ["merchant.com.esimApp"]
                }
            }
        ],
        [
            "expo-camera",
            {
                "cameraPermission": "Камера используется для сканирования QR-кодов и активации eSIM."
            }
        ],
        [
            "expo-router",
            {
                "origin": "https://thebestesim.expo.app"
            }
        ],
        [
            "expo-splash-screen",
            {
                "image": "./logo/Logo.png",
                "imageWidth": 200,
                "resizeMode": "contain",
                "backgroundColor": "#ffffff"
            }
        ],
        [
            "@stripe/stripe-react-native",
            {
                "merchantIdentifier": "merchant.com.esimApp",
                "publishableKey": "pk_test_51SmySfRvUt27CNLNGekbnMs83YpmzI1IqzYM0cRXyEooYNbv90I5IMsfP2ymLO5vrz4U4HVdQ7EhHYYi7F2ranpM002G160wfc"
            }
        ]
    ],

    experiments: {
        typedRoutes: true,
        reactCompiler: true
    },

    owner: "roman12e"
};