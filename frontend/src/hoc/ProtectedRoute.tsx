"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { PageLoading } from "@/components/PageLoading";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authStatus } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (authStatus === "notAuth") {
      router.push("/login");
    }
  }, [authStatus, router]);

  if (authStatus === "unknownAuth") {
    return <PageLoading />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
