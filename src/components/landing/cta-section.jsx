"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  return (
    <section className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06]">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-violet-500/5 to-purple-500/10" />
          <div className="absolute inset-0 bg-[#07090f]/80" />

          {/* Grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Glow orbs */}
          <div className="absolute -left-20 top-0 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative flex flex-col items-center px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-24">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/25">
              <Sparkles className="h-6 w-6 text-white" />
            </div>

            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Start Ensuring Compliance{" "}
              <span className="hero-gradient-text">
                Today
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
              Centralize legal intelligence and proactively detect policy risks
              before they become audit findings.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                className="hero-btn-primary h-12 gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-8 border-0 text-sm font-semibold text-white shadow-xl shadow-blue-500/25"
                onClick={() => router.push(isSignedIn ? "/dashboard" : "/sign-in")}
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hero-btn-secondary h-12 gap-2 rounded-xl border-white/10 bg-white/[0.03] px-8 text-sm font-medium text-slate-300 backdrop-blur-sm"
              >
                Talk to Sales
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
              {[
                "GDPR Ready",
                "Real-time Monitoring",
                "Enterprise-grade Security",
              ].map((label) => (
                <div key={label} className="flex items-center gap-1.5">
                  <svg
                    className="h-3.5 w-3.5 text-emerald-400/80"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
