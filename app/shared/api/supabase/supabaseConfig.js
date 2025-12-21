import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from "expo-constants";


const supabaseUrl = Constants.expoConfig.extra.supabaseUrl;
const supabaseKey = Constants.expoConfig.extra.supabaseKey;

export const supabase = createClient(
    supabaseUrl,
    supabaseKey,
    {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            storage: AsyncStorage,
        },
    }
);
