"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Users, CheckCircle2 } from "lucide-react";

import { CreateOrgForm } from "@/components/onboarding/create-org-form";
import { JoinOrgForm } from "@/components/onboarding/join-org-form";

const tabs = [
  {
    key: "create",
    label: "Create Organization",
    icon: Building2,
    description: "Set up a new organization for your team",
  },
  {
    key: "join",
    label: "Join Organization",
    icon: Users,
    description: "Join an existing team with an invite code",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("create");
  const [done, setDone] = useState(false);

  // Simulate Clerk-like auth check — redirect to sign-in if no mock session
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("lexisgraph_session");
    // For demo purposes, allow access even without session
    // In production, uncomment: if (!isLoggedIn) router.replace("/sign-in");

    // If already onboarded, go straight to dashboard
    const onboarded = localStorage.getItem("lexisgraph_onboarded");
    if (onboarded === "true") {
      router.replace("/dashboard");
    }
  }, [router]);

  function handleComplete(data) {
    // Store onboarding status
    localStorage.setItem("lexisgraph_onboarded", "true");
    localStorage.setItem("lexisgraph_org", JSON.stringify(data));
    setDone(true);

    // Short success animation, then redirect
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#020617] px-4 py-16">
      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/15 via-violet-500/8 to-transparent blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-[350px] w-[350px] rounded-full bg-violet-600/8 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/25 transition-shadow group-hover:shadow-blue-500/40">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.636 5.636l2.121 2.121m8.486 8.486l2.121 2.121M5.636 18.364l2.121-2.121m8.486-8.486l2.121-2.121" />
            </svg>
          </div>
          <span className="text-xl font-semibold tracking-tight text-white">
            Lexis<span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Graph</span>
          </span>
        </Link>

        {/* ── Success state ── */}
        {done ? (
          <div className="rounded-2xl border border-white/[0.06] bg-[#0f172a]/80 p-10 text-center shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white">You&apos;re all set!</h2>
            <p className="mt-2 text-sm text-slate-400">
              Redirecting to your dashboard…
            </p>
            <div className="mx-auto mt-4 h-1 w-32 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ animation: "grow-bar 1.5s ease forwards" }} />
            </div>
          </div>
        ) : (
          /* ── Card ── */
          <div className="rounded-2xl border border-white/[0.06] bg-[#0f172a]/80 shadow-2xl shadow-black/40 backdrop-blur-xl">
            {/* Header */}
            <div className="border-b border-white/[0.06] px-8 pt-8 pb-6">
              {/* Step indicator */}
              <div className="mb-4 flex items-center justify-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                    1
                  </div>
                  <span className="text-xs font-medium text-blue-400">Sign Up</span>
                </div>
                <div className="h-px w-8 bg-blue-500/30" />
                <div className="flex items-center gap-1.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-[10px] font-bold text-white ring-2 ring-blue-500/30 ring-offset-2 ring-offset-[#0f172a]">
                    2
                  </div>
                  <span className="text-xs font-semibold text-white">Setup</span>
                </div>
                <div className="h-px w-8 bg-white/[0.06]" />
                <div className="flex items-center gap-1.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-bold text-slate-500">
                    3
                  </div>
                  <span className="text-xs text-slate-500">Dashboard</span>
                </div>
              </div>

              <h1 className="text-center text-xl font-bold tracking-tight text-white">
                Set up your organization
              </h1>
              <p className="mt-1.5 text-center text-sm text-slate-400">
                Create a new organization or join an existing one
              </p>
            </div>

            {/* Tab switcher */}
            <div className="grid grid-cols-2 gap-0 border-b border-white/[0.06]">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative flex flex-col items-center gap-1 px-4 py-4 text-center transition-all ${
                      active
                        ? "text-white"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${active ? "text-blue-400" : ""}`} />
                    <span className="text-xs font-medium">{tab.label}</span>
                    {/* Active indicator */}
                    {active && (
                      <div className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Form content */}
            <div className="px-8 py-6">
              {/* Tab description */}
              <p className="mb-5 text-center text-xs text-slate-500">
                {tabs.find((t) => t.key === activeTab)?.description}
              </p>

              {activeTab === "create" ? (
                <CreateOrgForm onComplete={handleComplete} />
              ) : (
                <JoinOrgForm onComplete={handleComplete} />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Progress bar animation style */}
      <style jsx>{`
        @keyframes grow-bar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
