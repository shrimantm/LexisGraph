"use client";

import { GitBranch, Brain, ShieldCheck } from "lucide-react";

const capabilities = [
  {
    icon: GitBranch,
    title: "Knowledge Graph Construction",
    description:
      "Converts laws, regulations, and internal policies into structured knowledge graphs that reveal relationships, dependencies, and coverage.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "GraphRAG Deep Reasoning",
    description:
      "Uses Graph Retrieval-Augmented Generation to traverse legal knowledge and provide contextual, traceable reasoning over complex regulations.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: ShieldCheck,
    title: "Automated Detection",
    description:
      "Automatically detects missing clauses, policy conflicts, and outdated regulations — flagging issues before they become audit findings.",
    gradient: "from-emerald-500 to-teal-500",
  },
];

export function SolutionSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
            <ShieldCheck className="h-3 w-3" />
            The Solution
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Introducing{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              LexisGraph
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            A GraphRAG-native compliance engine designed for enterprise legal
            and policy teams.
          </p>
        </div>

        {/* Capabilities */}
        <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-3">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-[1px] transition-all duration-500 hover:border-transparent"
              >
                {/* Animated gradient border on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cap.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-20`} />

                <div className="relative rounded-[15px] bg-[#0a0f1a] p-6">
                  <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cap.gradient} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {cap.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
