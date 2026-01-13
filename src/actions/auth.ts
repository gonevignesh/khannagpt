"use server";

import { createClient } from "@/lib";
import { redirect } from "next/navigation";

// Email/Password Sign Up
const getBaseUrl = () => {
    if (process.env.NEXT_SITE_URL) return process.env.NEXT_SITE_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
};

export const signUpWithEmail = async (email: string, password: string) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${getBaseUrl()}/auth/callback`,
        },
    });

    if (error) {
        console.error("Sign up error:", error);
        return { error: error.message };
    }

    // Check if email confirmation is required
    if (data.user && !data.session) {
        return { success: true, message: "Check your email for confirmation link!" };
    }

    return { success: true, user: data.user };
};

// Email/Password Sign In
export const signInWithEmail = async (email: string, password: string) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error("Sign in error:", error);
        return { error: error.message };
    }

    redirect("/");
};

// Google OAuth (kept for future use)
export const signInWithGoogle = async () => {
    const supabase = await createClient();

    const auth_callback_url = `${getBaseUrl()}/auth/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: auth_callback_url,
        },
    });

    if (error) {
        console.log("error", error);
        return { error: error.message };
    }

    redirect(data.url!);
};

// Sign Out
export const signOut = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
};
