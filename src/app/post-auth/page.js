"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function PostAuthRedirect() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.replace("/sign-in");
      return;
    }

    if (user?.org_id) {
      router.replace("/dashboard");
    } else {
      router.replace("/onboarding");
    }
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#020617] px-4 py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/15 via-violet-500/8 to-transparent blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-[350px] w-[350px] rounded-full bg-violet-600/8 blur-3xl" />
      </div>

      <Card className="relative z-10 w-full max-w-md border-white/[0.08] bg-[#0f172a]/80 text-slate-100">
        <CardContent className="flex items-center justify-center gap-3 py-12 text-sm text-slate-300">
          <Loader2 className="h-5 w-5 animate-spin" />
          Finalizing your workspace access...
        </CardContent>
      </Card>
    </div>
  );
}

export default function PostAuthPage() {
  return (
    <AuthProvider>
      <PostAuthRedirect />
    </AuthProvider>
  );
}