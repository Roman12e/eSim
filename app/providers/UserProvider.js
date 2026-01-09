import { createContext, useEffect, useState } from "react";
import { supabase } from "../shared/api/supabase/supabaseConfig";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const { data: auth } = await supabase.auth.getUser();
        if (!auth?.user) return;

        const { data } = await supabase
            .from("users")
            .select("*")
            .eq("id", auth.user.id)
            .single();

        setUser(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, refetchUser: fetchUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};
