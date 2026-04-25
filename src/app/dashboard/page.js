"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Loader2 } from "lucide-react";

function DashboardGuard() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!isSignedIn) return null;

  return <DashboardLayout />;
}

export default function DashboardRoute() {
  return (
    <AuthProvider>
      <DashboardGuard />
    </AuthProvider>
  );
}