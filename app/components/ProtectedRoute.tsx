"use client";

import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // if not authenticated, redirect to /login
    if (!authenticated && pathname !== "/login") {
      router.push("/login");
    }
  }, [authenticated, pathname, router]);

  // while redirecting, don't render protected children
  if (!authenticated && pathname !== "/login") {
    return null;
  }

  return <>{children}</>;
}
