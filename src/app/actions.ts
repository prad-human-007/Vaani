"use server";

import { revalidatePath, redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase'; // Adjust path if needed


export async function signUpAction(formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies });
   console.log(formData);
  // Extract form fields
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string;
  const profession = formData.get('profession') as string;
  const languagesRaw = formData.get('languages') as string; // e.g. "English, Hindi"
  const languages = languagesRaw.split(',').map(lang => lang.trim());
  const linkedin_url = formData.get('linkedin_url') as string;
  const gender = formData.get('gender') as string;

  // Sign up user
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    console.error('Supabase signUp error:', signUpError.message);
    return { error: signUpError.message };
  }

  const userId = signUpData.user?.id;

  // Insert additional profile data into a custom table (e.g., "tester")
  if (userId && role === 'tester') {
    const { error: insertError } = await supabase.from('tester').insert([
      {
        id: userId, // FK to auth.users
        email,
        profession,
        languages,
        linkedin_url,
        gender,
      },
    ]);

    if (insertError) {
      console.error('Tester insert error:', insertError.message);
      return { error: insertError.message };
    }
  }

  return { success: true };
}


// === SIGN IN WITH OAUTH (Google) ===
export const signInwithOAuthAction = async () => {
    const supabase = createClient();
    console.log("Signing in with Google...");

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL,
        },
    });

    if (error) {
        console.error("OAuth sign-in error:", error.message);
        return { error: error.message };
    } else {
        console.log("OAuth redirect URL:", data?.url);
        if (data?.url) redirect(data.url);
    }
};

// === SIGN IN WITH EMAIL/PASSWORD ===
export const signInAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        console.error("Sign-in error:", error.message);
        return { error: error.message };
    }

    revalidatePath('/');
    return redirect("/");
};

// === FORGOT PASSWORD ===
export const forgotPasswordAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const callbackUrl = formData.get("callbackUrl")?.toString();
    const supabase = createClient();

    if (!email) {
        return { error: "Email is required" };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `https://www.voc-al.com/auth/callback?redirect_to=/protected/reset-password`,
    });

    if (error) {
        console.error("Reset email error:", error.message);
        return { error: "Could not reset password" };
    }

    if (callbackUrl) return redirect(callbackUrl);
    revalidatePath('/forgot-password');
    return { success: "Check your email to reset your password." };
};

// === RESET PASSWORD ===
export const resetPasswordAction = async (formData: FormData) => {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const supabase = createClient();

    if (!password || !confirmPassword) {
        return { error: "Password and confirm password are required" };
    }

    if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
        console.error("Password update error:", error.message);
        return { error: "Password update failed" };
    }
    revalidatePath('/protected/reset-password');
    return { success: "Password updated successfully" };

};

// === SIGN OUT ===
export const signOutAction = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Signout error", error);
        return { error: error.message };
    }
    revalidatePath('/');
    return redirect("/");
};
