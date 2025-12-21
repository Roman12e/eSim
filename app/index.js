import { Redirect } from "expo-router";
import { useAuth } from "./hooks/useAuth";

function Index() {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    return user ? <Redirect href="/(tabs)/explore" /> : <Redirect href="/(auth)/login" />;
}


export default Index;