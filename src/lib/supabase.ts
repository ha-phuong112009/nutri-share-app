import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

// Access environment variables directly in React Native with Expo
const supabaseUrl = 'https://cwbecrwucbjoovbnipoi.supabase.co';
const supabaseAnonKey = 'sb_publishable_FWfQdDkjsGd0P0Y5gMVnog_tS1gZOKE';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
