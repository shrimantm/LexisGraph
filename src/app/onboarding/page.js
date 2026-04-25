"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Loader2, Users } from "lucide-react";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { CreateOrgForm } from "@/components/onboarding/create-org-form";
import { JoinOrgForm } from "@/components/onboarding/join-org-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function OnboardingContent() {
  const router = useRouter();
  const { user, isLoaded, isSignedIn, updateUser } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.replace("/sign-in");
      return;
    }

    // If user already has org, go to dashboard
    if (user?.org_id) {
      router.replace("/dashboard");
      return;
    }

    setChecking(false);
  }, [isLoaded, isSignedIn, user, router]);

  if (!isLoaded || checking || !isSignedIn) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 py-16">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-130 w-180 -translate-x-1/2 rounded-full bg-linear-to-b from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-90 w-90 rounded-full bg-indigo-600/10 blur-3xl" />
        </div>

        <Card className="relative z-10 w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-slate-100 shadow-2xl shadow-black/50">
          <CardContent className="flex items-center justify-center gap-3 p-0 text-sm text-slate-300">
            <Loader2 className="h-5 w-5 animate-spin" />
            Preparing your workspace...
          </CardContent>
        </Card>
      </div>
    );
  }

  function handleComplete(orgId) {
    updateUser({ org_id: orgId || `org_${Date.now()}` });
    router.push("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-130 w-180 -translate-x-1/2 rounded-full bg-linear-to-b from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-90 w-90 rounded-full bg-indigo-600/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-900/50 transition-all duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.636 5.636l2.121 2.121m8.486 8.486l2.121 2.121M5.636 18.364l2.121-2.121m8.486-8.486l2.121-2.121" />
            </svg>
          </div>
          <span className="text-[30px] font-semibold tracking-tight text-white">
            Lexis<span className="bg-linear-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">Graph</span>
          </span>
        </Link>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-linear-to-br from-indigo-500/10 to-purple-500/10 blur-2xl" />

          <Card className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-slate-100 shadow-2xl shadow-black/50 transition-all duration-300">
            <CardHeader className="space-y-2 p-0 text-center">
              <CardTitle className="text-2xl font-semibold text-white">Set up your organization</CardTitle>
              <CardDescription className="text-sm text-slate-400">
                Create your workspace to start analyzing compliance.
              </CardDescription>
            </CardHeader>

            <CardContent className="mt-6 p-0">
              <Tabs defaultValue="create" className="flex flex-col gap-4 transition-all duration-300">
                <TabsList className="grid h-11 w-full grid-cols-2 rounded-lg border border-slate-800 bg-slate-950/70 p-1">
                  <TabsTrigger
                    value="create"
                    className="h-full gap-1.5 rounded-md px-2 text-xs font-medium text-slate-400 transition-all duration-200 after:hidden data-active:bg-slate-800 data-active:text-white data-active:shadow-sm hover:text-slate-200 sm:text-sm"
                  >
                    <Building2 className="h-4 w-4" />
                    Create Organization
                  </TabsTrigger>
                  <TabsTrigger
                    value="join"
                    className="h-full gap-1.5 rounded-md px-2 text-xs font-medium text-slate-400 transition-all duration-200 after:hidden data-active:bg-slate-800 data-active:text-white data-active:shadow-sm hover:text-slate-200 sm:text-sm"
                  >
                    <Users className="h-4 w-4" />
                    Join Organization
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="create" className="mt-0">
                  <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-4 sm:p-5">
                    <CreateOrgForm onComplete={handleComplete} />
                  </div>
                </TabsContent>

                <TabsContent value="join" className="mt-0">
                  <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-4 sm:p-5">
                    <JoinOrgForm onComplete={handleComplete} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <AuthProvider>
      <OnboardingContent />
    </AuthProvider>
  );
}
