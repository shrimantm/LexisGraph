"use client";

import { AlertTriangle, Clock, RefreshCcw, Search } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Manual Audits Are Slow",
    description:
      "Traditional compliance reviews take weeks, consuming costly legal resources and delaying business decisions.",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/10",
  },
  {
    icon: RefreshCcw,
    title: "Regulations Change Frequently",
    description:
      "Hundreds of regulatory updates yearly make it impossible to manually track every relevant change.",
    color: "from-rose-500/20 to-red-500/20",
    iconColor: "text-rose-400",
    borderColor: "border-rose-500/10",
  },
  {
    icon: Search,
    title: "Hard to Track Policy Gaps",
    description:
      "Without structured analysis, missing clauses and conflicting policies go undetected until audit time.",
    color: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400",
    borderColor: "border-violet-500/10",
  },
];

export function ProblemSection() {
  return (
    <section className="relative py-24 lg:py-32">
      {/* Section divider gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
            <AlertTriangle className="h-3 w-3" />
            The Problem
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Compliance is{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Broken
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Enterprises face mounting compliance pressure with outdated tools
            and fragmented processes.
          </p>
        </div>

        {/* Problem cards */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.title}
                className={`group relative overflow-hidden rounded-2xl border ${problem.borderColor} bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.08]`}
              >
                {/* Card gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${problem.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                
                <div className="relative">
                  <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] ${problem.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {problem.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {problem.description}
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
