"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";

const excludePaths = ["/login", "/register", "/forgotPassword"];

export function ConditionalHeader() {
  const pathname = usePathname();
  const showHeader = !excludePaths.includes(pathname);

  return showHeader ? <Header /> : null;
}
