import axios from "axios";
import { Alert } from "react-native";

export const handleError = (error, retry) => {
    console.log("GLOBAL ERROR:", error);
    console.log(axios.isAxiosError(error));


    if (axios.isAxiosError(error)) {
        if (error.message === "Network Error") {
            Alert.alert(
                "Connection problem",
                "Unable to connect to the server.\n\nCheck your internet or disable VPN.",
                [{ text: "Retry", onPress: retry }]
            );
            return;
        }

        if (error.code === "ECONNABORTED") {
            Alert.alert(
                "Timeout",
                "Server is not responding.",
                [{ text: "Retry", onPress: retry }]
            );
            return;
        }

        if (error.response) {
            handleStatus(error.response.status, error.response.data, retry);
            return;
        }

        if (error.request) {
            Alert.alert(
                "No response",
                "Server is not responding.",
                [{ text: "Retry", onPress: retry }]
            );
            return;
        }
    }

    if (error?.code) {
        switch (error.code) {
            case "Canceled":
            case "canceled":
                Alert.alert("Payment cancelled", "You canceled the payment.");
                return;
            case "Failed":
                Alert.alert("Payment failed", "Your payment was not successful.");
                return;

            case "Timeout":
                Alert.alert("Timeout", "Payment timed out. Try again.");
                return;

            case "CardDeclined":
                Alert.alert("Card declined", "Your card was declined.");
                return;

            case "ExpiredCard":
                Alert.alert("Card expired", "Your card has expired.");
                return;

            case "IncorrectCVC":
                Alert.alert("Invalid CVC", "The CVC code is incorrect.");
                return;

            default:
                Alert.alert("Payment error", error.message || "Stripe error occurred.");
                return;
        }
    }

    if (error instanceof TypeError && error.message === "Network request failed") {
        Alert.alert(
            "Connection problem",
            "No internet connection.",
            [{ text: "Retry", onPress: retry }]
        );
        return;
    }

    if (typeof error === "object") {
        const message =
            error?.error ||
            error?.message ||
            error?.data?.error;

        if (message) {
            // Stripe backend
            if (message.includes("Payment not completed")) {
                Alert.alert("Payment error", "Payment was not completed.");
                return;
            }

            // BNESIM
            if (message.includes("BNESIM")) {
                Alert.alert(
                    "Activation failed",
                    "Could not activate eSIM. Payment will be refunded."
                );
                return;
            }

            // Refund case
            if (message.includes("refunded")) {
                Alert.alert(
                    "Payment refunded",
                    "Something went wrong. Your payment was refunded."
                );
                return;
            }

            Alert.alert("Error", message);
            return;
        }
    }

    if (error?.status) {
        handleStatus(error.status, null, retry);
        return;
    }

    Alert.alert(
        "Error",
        error?.message || "Something went wrong.",
        [{ text: "Retry", onPress: retry }]
    );
};


const handleStatus = (status, data, retry) => {
    switch (status) {
        case 400:
            Alert.alert("Error", data?.error || "Invalid request.");
            break;

        case 401:
            Alert.alert("Session expired", "Please log in again.");
            break;

        case 403:
            Alert.alert("Access denied", "You don't have permission.");
            break;

        case 404:
            Alert.alert("Not found", "Requested data not found.");
            break;

        case 500:
            Alert.alert(
                "Server error",
                data?.error || "Something went wrong on our side."
            );
            break;

        default:
            Alert.alert("Oops...", "Unexpected server error.");
    }
};