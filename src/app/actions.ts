"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// === SIGN UP ===
export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const role = formData.get("role")?.toString();
  const supabase = await createClient();

  if (!email || !password || !role) {
    return encodedRedirect("error", "/sign-up", "Email, password, and role are required");
  }

  const { data: signUpData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `https://www.visaprepai.com/auth/callback`,
    },
  });

  if (error || !signUpData?.user) {
    console.error("Sign-up error:", error?.message);
    return encodedRedirect("error", "/sign-up", error?.message || "Signup failed");
  }

  const userId = signUpData.user.id;

  if (role === "company") {
    const name = formData.get("name")?.toString();
    const sector = formData.get("sector")?.toString();
    const url = formData.get("url")?.toString();

    const { error: insertError } = await supabase.from("company").upsert({
      id: userId,
      email,
      name,
      sector,
      url,
    });

    if (insertError) {
      console.error("Company insert error:", insertError.message);
      return encodedRedirect("error", "/sign-up", "Failed to save company info");
    }
  }

  if (role === "tester") {
    const profession = formData.get("profession")?.toString();
    const linkedin_url = formData.get("linkedin_url")?.toString();
    const gender = formData.get("gender")?.toString();
    const languages = formData.getAll("languages") as string[];

    const { error: insertError } = await supabase.from("tester").upsert({
      id: userId,
      email,
      profession,
      linkedin_url,
      gender,
      languages,
      verified: false,
    });

    if (insertError) {
      console.error("Tester insert error:", insertError.message);
      return encodedRedirect("error", "/sign-up", "Failed to save tester info");
    }
  }

  console.log(`New user signed up: ${email} as ${role}`);

  return encodedRedirect(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link."
  );
};

// === SIGN IN WITH OAUTH (Google) ===
export const signInwithOAuthAction = async () => {
  const supabase = await createClient();
  console.log("Signing in with Google...");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.OAUTH_REDIRECT_URL,
    },
  });

  if (error) {
    console.error("OAuth sign-in error:", error.message);
  } else {
    console.log("OAuth redirect URL:", data?.url);
    if (data?.url) redirect(data.url);
  }
};

// === SIGN IN WITH EMAIL/PASSWORD ===
export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("Sign-in error:", error.message);
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/");
};

// === FORGOT PASSWORD ===
export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const callbackUrl = formData.get("callbackUrl")?.toString();
  const supabase = await createClient();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `https://www.visaprepai.com/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error("Reset email error:", error.message);
    return encodedRedirect("error", "/forgot-password", "Could not reset password");
  }

  if (callbackUrl) return redirect(callbackUrl);

  return encodedRedirect("success", "/forgot-password", "Check your email to reset your password.");
};

// === RESET PASSWORD ===
export const resetPasswordAction = async (formData: FormData) => {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const supabase = await createClient();

  if (!password || !confirmPassword) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error("Password update error:", error.message);
    return encodedRedirect("error", "/protected/reset-password", "Password update failed");
  }

  return encodedRedirect("success", "/protected/reset-password", "Password updated successfully");
};

// === SIGN OUT ===
export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
};
