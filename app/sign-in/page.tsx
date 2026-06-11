import type { Metadata } from "next";
import AuthLayout from "@/app/components/auth/AuthLayout";

export const metadata: Metadata = {
  title: "Log In — Rezolvus",
  description: "Sign in to your Rezolvus account.",
};

export default function SignInPage() {
  return <AuthLayout mode="sign-in" />;
}
