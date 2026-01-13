"use client";

import { signUpWithEmail, signInWithGoogle } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const SignUpPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords don't match!");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        try {
            const result = await signUpWithEmail(email, password);

            if (result.error) {
                toast.error(result.error);
            } else if (result.message) {
                toast.success(result.message);
                // Email confirmation required
            } else {
                toast.success("Account created successfully!");
                router.push("/");
            }
        } catch (error) {
            console.error("Sign up error:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setIsGoogleLoading(true);
        try {
            const result = await signInWithGoogle();
            if (result?.error) {
                toast.error(result.error);
            }
        } catch (error) {
            console.error("Google sign up error:", error);
            toast.error("Failed to sign up with Google");
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center gap-y-4 text-center w-full max-w-xs mx-auto">
                <h2 className="text-2xl font-semibold">
                    Sign Up for KhannaGPT! ✨
                </h2>
                <p className="text-sm text-muted-foreground">
                    Create your account to start learning
                </p>

                {/* Google Sign Up Button */}
                <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handleGoogleSignUp}
                    disabled={isGoogleLoading || isLoading}
                >
                    {isGoogleLoading ? (
                        <Loader2Icon className="w-4 h-4 animate-spin" />
                    ) : (
                        <>
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </>
                    )}
                </Button>

                {/* Divider */}
                <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with email
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSignUp} className="w-full space-y-3">
                    <Input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading || isGoogleLoading}
                        required
                        className="w-full"
                    />
                    <Input
                        type="password"
                        placeholder="Password (min 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading || isGoogleLoading}
                        required
                        minLength={6}
                        className="w-full"
                    />
                    <Input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLoading || isGoogleLoading}
                        required
                        className="w-full"
                    />
                    <Button
                        type="submit"
                        disabled={isLoading || isGoogleLoading || !email || !password || !confirmPassword}
                        className="w-full"
                    >
                        {isLoading ? (
                            <Loader2Icon className="w-4 h-4 animate-spin" />
                        ) : (
                            "Create Account"
                        )}
                    </Button>
                </form>

                <p className="text-sm text-muted-foreground">
                    By signing up, you agree to our{" "}
                    <Link href="#" className="text-foreground hover:underline">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-foreground hover:underline">
                        Privacy Policy
                    </Link>.
                </p>

                <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="text-foreground hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
