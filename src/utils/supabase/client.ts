import { createClient as createSupabaseClient } from '@supabase/supabase-js'; // Changed to avoid conflict
import { cookies } from "next/headers";

//  Removed the custom createClient, using the one from supabase-js directly
export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
        console.error("NEXT_PUBLIC_SUPABASE_URL is not defined");
        throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined");
    }
    if (!supabaseKey) {
        console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined");
        throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined");
    }

    return createSupabaseClient(supabaseUrl, supabaseKey, { // Use createSupabaseClient
        global: {
            headers: { 'Content-Type': 'application/json' },
        },
    });
}
