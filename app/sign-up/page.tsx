import type { Metadata } from "next";
import AuthLayout from "@/app/components/auth/AuthLayout";

export const metadata: Metadata = {
  title: "Sign Up — Rezolvus",
  description: "Create your Rezolvus account.",
};

export default function SignUpPage() {
  return <AuthLayout mode="sign-up" />;
}
