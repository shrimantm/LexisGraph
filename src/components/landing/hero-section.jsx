"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

/* ── SVG Graph pattern (nodes + connecting lines) ── */
function GraphPattern() {
  // Node positions for the graph overlay
  const nodes = [
    { x: 80, y: 60 },
    { x: 220, y: 120 },
    { x: 360, y: 45 },
    { x: 500, y: 150 },
    { x: 140, y: 220 },
    { x: 300, y: 260 },
    { x: 440, y: 300 },
    { x: 600, y: 80 },
    { x: 700, y: 200 },
    { x: 560, y: 260 },
    { x: 160, y: 350 },
    { x: 400, y: 380 },
    { x: 650, y: 340 },
    { x: 50, y: 400 },
    { x: 750, y: 420 },
  ];

  const edges = [
    [0, 1], [1, 2], [2, 3], [0, 4], [4, 5],
    [5, 6], [3, 7], [7, 8], [8, 9], [5, 9],
    [1, 5], [6, 9], [4, 10], [10, 11], [11, 12],
    [12, 14], [13, 10], [6, 12], [2, 7], [3, 9],
  ];

  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.07]"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="1" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Connecting lines */}
      {edges.map(([a, b], i) => (
        <line
          key={`e-${i}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="url(#nodeGlow)"
          strokeWidth="1"
          opacity="0.6"
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={`n-${i}`}>
          <circle cx={n.x} cy={n.y} r="8" fill="url(#nodeGlow)" opacity="0.3" />
          <circle cx={n.x} cy={n.y} r="2.5" fill="#818cf8" opacity="0.9">
            <animate
              attributeName="r"
              values="2.5;3.5;2.5"
              dur={`${3 + (i % 4)}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.9;0.5;0.9"
              dur={`${3 + (i % 4)}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}

/* ── Floating labels over the dashboard image ── */
function FloatingLabel({ children, className }) {
  return (
    <div
      className={`absolute z-20 rounded-lg border border-white/[0.12] bg-[#0c111c]/90 px-3 py-1.5 text-[11px] font-semibold shadow-xl backdrop-blur-md transition-transform duration-500 ${className}`}
    >
      {children}
    </div>
  );
}

export function HeroSection() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  return (
    <section className="hero-gradient-bg relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-36">
      {/* ── Background layers ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Primary radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[700px] w-[1000px] rounded-full bg-gradient-to-b from-blue-600/20 via-violet-500/10 to-transparent blur-3xl" />
        {/* Secondary orbs */}
        <div className="absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute top-40 left-0 h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-3xl" />
        {/* Animated graph pattern */}
        <GraphPattern />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left content ── */}
          <div className="max-w-2xl">
            {/* Badge pill */}
            <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/[0.08] px-4 py-1.5 text-xs font-medium text-violet-300 shadow-sm shadow-violet-500/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
              </span>
              AI-Powered Compliance Intelligence
            </div>

            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Automate Regulatory{" "}
              <span className="hero-gradient-text">
                Compliance
              </span>{" "}
              with AI
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
              Transform complex regulations into an intelligent knowledge graph.
              Detect hidden compliance risks across policies using
              GraphRAG-powered reasoning.
            </p>

            {/* CTA buttons with micro-interactions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="hero-btn-primary h-11 gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-6 border-0 text-sm font-semibold text-white shadow-xl shadow-blue-500/25"
                onClick={() => router.push(isSignedIn ? "/dashboard" : "/sign-in")}
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hero-btn-secondary h-11 gap-2 rounded-xl border-white/10 bg-white/[0.03] px-6 text-sm font-medium text-slate-300 backdrop-blur-sm"
              >
                <Play className="h-3.5 w-3.5" />
                View Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
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

          {/* ── Right: Dashboard preview with floating labels ── */}
          <div className="group/preview relative lg:pl-4">
            {/* Outer glow */}
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-blue-500/15 via-violet-500/10 to-purple-500/15 blur-2xl transition-all duration-700 group-hover/preview:blur-3xl group-hover/preview:from-blue-500/20 group-hover/preview:to-purple-500/20" />

            {/* Dashboard frame */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c111c]/80 shadow-2xl shadow-blue-950/50 transition-transform duration-500 group-hover/preview:-translate-y-1">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0a0f1a]/90 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="ml-3 flex-1 rounded-md bg-white/[0.04] px-3 py-1 text-xs text-slate-500">
                  app.lexisgraph.io/dashboard
                </div>
              </div>
              <Image
                src="/dashboard-preview.png"
                alt="LexisGraph Dashboard — Compliance overview showing knowledge graph, risk alerts, and analytics"
                width={800}
                height={500}
                className="w-full object-cover"
                priority
              />
            </div>

            {/* ── Floating labels ── */}
            <FloatingLabel className="hero-float -top-3 left-6 sm:left-10">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 shadow-sm shadow-blue-400/50" />
                <span className="text-blue-300">Knowledge Graph</span>
              </span>
            </FloatingLabel>

            <FloatingLabel className="hero-float-delayed -right-2 top-1/3 sm:right-0">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                <span className="text-emerald-300">96.4% Compliance Score</span>
              </span>
            </FloatingLabel>

            <FloatingLabel className="hero-float -bottom-3 right-8 sm:right-12">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
                <span className="text-amber-300">14 Risk Alerts</span>
              </span>
            </FloatingLabel>
          </div>
        </div>
      </div>
    </section>
  );
}
