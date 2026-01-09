import { useEffect, useState } from "react";

import { supabase } from "../shared/api/supabase/supabaseConfig";


export const useGetUserData = () => {
    const [user, setUser] = useState(null); // данные пользователя
    const [error, setError] = useState(null);

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (!session?.user) return;

                const { data: profile, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setUser(profile)
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return { user, error };
}