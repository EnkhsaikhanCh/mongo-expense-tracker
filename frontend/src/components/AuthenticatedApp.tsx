"use client";

import { useAuthStore } from "@/store/authStore";
import { ConditionalHeader } from "@/components/header/ConditionalHeader";
import { PageLoading } from "./PageLoading";

export default function AuthenticatedApp({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authStatus } = useAuthStore();

  if (authStatus === "unknownAuth") {
    return <PageLoading />;
  }

  return (
    <>
      <ConditionalHeader />
      {children}
    </>
  );
}
