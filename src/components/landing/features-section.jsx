"use client";

import { Network, FileSearch, BellRing, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Network,
    title: "Knowledge Graph Visualization",
    description:
      "Visualize relationships between policies, regulations, and clauses in interactive, navigable knowledge graphs.",
    gradient: "from-blue-500 to-cyan-400",
    glow: "shadow-blue-500/20",
  },
  {
    icon: FileSearch,
    title: "AI Gap Analysis",
    description:
      "Automatically identify missing clauses, conflicting terms, and coverage gaps with AI-powered reasoning.",
    gradient: "from-violet-500 to-purple-400",
    glow: "shadow-violet-500/20",
  },
  {
    icon: BellRing,
    title: "Real-time Alerts",
    description:
      "Get notified instantly when regulations change or new compliance conflicts are detected in your policies.",
    gradient: "from-amber-500 to-orange-400",
    glow: "shadow-amber-500/20",
  },
  {
    icon: BarChart3,
    title: "Compliance Reports",
    description:
      "Generate executive-ready compliance reports with traceable regulatory sources and risk assessments.",
    gradient: "from-emerald-500 to-teal-400",
    glow: "shadow-emerald-500/20",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
            Powerful Features
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Compliance
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Purpose-built tools that transform how legal teams manage regulatory requirements.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.1]"
              >
                {/* Hover glow */}
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />

                <div className="relative flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg ${feature.glow}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
