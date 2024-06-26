"use client";

import { AuthFooter } from "@/components/AuthFooter";
import { RegisterForm } from "./components/RegisterForm";
import { AuthHeader } from "@/components/AuthHeader";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PageLoading } from "@/components/PageLoading";

export default function Register() {
  const { authStatus } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (authStatus === "isAuth") {
      router.push("/dashboard");
    }
  }, [authStatus, router]);

  if (authStatus === "unknownAuth") {
    return <PageLoading />;
  }

  return (
    <main className="container mx-auto mt-10 flex w-[342px] flex-col items-center gap-3 px-4">
      <AuthHeader label="Create Geld account" />
      <RegisterForm />
      <AuthFooter
        label="Log in"
        href="/login"
        text="Already have an account?"
      />
    </main>
  );
}
