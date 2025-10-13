"use client";

import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // if not authenticated, redirect to /login
    if (!isLoading && !authenticated && pathname !== "/login") {
      router.push("/login");
    }
  }, [authenticated, isLoading, pathname, router]);

  // while loading or redirecting, don't render protected children
  if (isLoading || (!authenticated && pathname !== "/login")) {
    return null;
  }

  return <>{children}</>;
}
