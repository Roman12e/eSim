import { StripeProvider } from "@stripe/stripe-react-native";
import Constants from "expo-constants";
import * as Linking from "expo-linking";


const values = Constants.expoConfig?.plugins?.find(
    (p) => p[0] === "@stripe/stripe-react-native"
)?.[1];

if (!values.merchantIdentifier) {
    throw new Error('Missing Expo config for "@stripe/stripe-react-native"')
}


export default function ExpoStripeProvider(props) {
    return <StripeProvider
        publishableKey={values.publishableKey}
        merchantIdentifier={values.merchantIdentifier}
        urlScheme={Linking.createURL("/")?.split(":")[0]}
        {...props}
    />
}