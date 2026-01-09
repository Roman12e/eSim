import { createContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../shared/api/supabase/supabaseConfig";


export const AuthContext = createContext()

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingInitial, setIsLoadingInitial] = useState(true);

    const signUp = async (email, password, name) => {
        setIsLoading(true);
        try {
            const response = await supabase.auth.signUp({
                email,
                password,
            });
            const { data, error } = response;

            // Ошибка валидации
            if (error) return { exists: false, user: null, error, data };

            // Пользователь уже существует
            if (data.user && data.user.identities.length === 0) {
                return { exists: true, user: null, error: null, data };
            }
            if (data.user) {
                const { error } = await supabase.from('users').insert({
                    id: data.user.id,
                    name,
                    email,
                    currency: 'eur',
                    language: "English",
                    payment_methods: JSON.stringify({}),
                    purchase_history: JSON.stringify({}),
                    sims: JSON.stringify({}),
                });

                if (error) {
                    console.log('INSERT ERROR:', error);
                }
            }

            // Новый пользователь
            return { exists: false, user: data.user, error: null, data };
        } catch (err) {
            return { exists: false, user: null, error: err, data: null };
        } finally {
            setIsLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            return { error: response.error, data: response.data };
        } catch (err) {
            return { error: err, data: null };
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () => {
        setIsLoading(true)
        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            setUser(data.user || null);
            setIsLoading(false);

            if (error) return null;
        };
        getUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
            setIsLoadingInitial(false);
        });

        return () => authListener.subscription.unsubscribe();
    }, []);

    const value = useMemo(() => ({
        user,
        isAuth: !!user,
        isLoading,
        signUp,
        signIn,
        signOut
    }), [user, isLoading])

    return <AuthContext.Provider value={value}>
        {!isLoadingInitial && children}
    </AuthContext.Provider>
}


export default AuthProvider;