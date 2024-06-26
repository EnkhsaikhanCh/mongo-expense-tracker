"use client";

import { AuthHeader } from "@/components/AuthHeader";
import { AuthFooter } from "@/components/AuthFooter";
import { LoginForm } from "./components/LoginForm";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PageLoading } from "@/components/PageLoading";

export default function Login() {
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
    <main>
      <div className="container mx-auto mt-10 flex w-[342px] flex-col items-center gap-3 px-4">
        <AuthHeader label="Welcome Back" />
        <LoginForm />
        <AuthFooter
          label="Sign up"
          href="/register"
          text="Don't have account?"
        />
      </div>
    </main>
  );
}
