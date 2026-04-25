"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { safeFetch } from "@/lib/api";
import { MOCK_USER } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function SignInForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDemo, setIsDemo] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError("");

    const { data, isDemo: demoMode } = await safeFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: email.trim(), password }),
    }, {
      ...MOCK_USER,
      email: email.trim(),
      user_id: `user_${Date.now()}`,
    });

    if (data) {
      login(data);
      setIsDemo(demoMode);
      router.push("/onboarding");
    } else {
      setError("Login failed. Please try again.");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="signin-email" className="text-xs text-slate-300">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            id="signin-email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
            className="h-10 rounded-xl border-white/[0.08] bg-white/[0.03] pl-10 text-white placeholder:text-slate-500 focus-visible:border-blue-500/50 focus-visible:ring-blue-500/20"
            autoComplete="email"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signin-password" className="text-xs text-slate-300">
          Password
        </Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            id="signin-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => { setPassword(e.target.value); if (error) setError(""); }}
            className="h-10 rounded-xl border-white/[0.08] bg-white/[0.03] pl-10 pr-10 text-white placeholder:text-slate-500 focus-visible:border-blue-500/50 focus-visible:ring-blue-500/20"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <Button
        type="submit"
        disabled={!email.trim() || !password.trim() || loading}
        className="h-10 w-full gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 border-0 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/35 hover:brightness-110 disabled:opacity-40 disabled:shadow-none"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in…
          </>
        ) : (
          <>
            Sign In
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-center text-xs text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-blue-400 hover:text-blue-300 transition-colors">
          Create one
        </Link>
      </p>
    </form>
  );
}

export default function SignInPage() {
  return (
    <AuthProvider>
      <div className="relative flex min-h-screen items-center justify-center bg-[#020617] px-4 py-16">
        {/* Ambient background effects */}
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

        <div className="relative z-10 w-full max-w-[420px]">
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

          <Card className="border-white/[0.06] bg-[#0f172a]/80 shadow-2xl shadow-black/40 backdrop-blur-xl text-slate-100">
            <CardHeader className="border-b border-white/[0.06] text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription className="text-slate-400">
                Sign in to your LexisGraph account
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 py-6">
              <SignInForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthProvider>
  );
}
