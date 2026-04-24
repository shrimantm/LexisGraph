"use client";

import { Upload, FileText, GitBranch, Search, FileOutput } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Policy Documents",
    description: "Drop in your policy PDFs, contracts, or regulatory documents. We support all major formats.",
  },
  {
    icon: FileText,
    title: "System Extracts Clauses",
    description: "AI parses and extracts individual clauses, terms, and obligations from your documents.",
  },
  {
    icon: GitBranch,
    title: "Builds Knowledge Graph",
    description: "Extracted data is structured into an interconnected knowledge graph of legal entities.",
  },
  {
    icon: Search,
    title: "Detects Compliance Gaps",
    description: "GraphRAG traverses the graph to identify missing coverage, conflicts, and outdated terms.",
  },
  {
    icon: FileOutput,
    title: "Generates Report",
    description: "Receive a comprehensive compliance report with prioritized findings and remediation steps.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Simple Process
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How It{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            From document upload to actionable compliance insights in five
            simple steps.
          </p>
        </div>

        {/* Steps timeline */}
        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-violet-500/40 to-emerald-500/40 md:left-1/2 md:-translate-x-px" />

          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.title}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Step number badge (mobile & desktop center) */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0c111c] text-sm font-bold text-white shadow-lg shadow-blue-500/10 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <span className="bg-gradient-to-br from-blue-400 to-violet-400 bg-clip-text text-transparent">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content card */}
                  <div
                    className={`flex-1 md:w-[calc(50%-3rem)] ${
                      isEven ? "md:pr-16" : "md:pl-16"
                    }`}
                  >
                    <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.1]">
                      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05]">
                        <Icon className="h-4 w-4 text-blue-400" />
                      </div>
                      <h3 className="text-sm font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden flex-1 md:block md:w-[calc(50%-3rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
