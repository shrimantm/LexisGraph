"use client";

import Image from "next/image";
import { Monitor } from "lucide-react";

export function DemoSection() {
  return (
    <section id="demo" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-violet-500/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
            <Monitor className="h-3 w-3" />
            Live Preview
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            See LexisGraph{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              in Action
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Explore how LexisGraph surfaces compliance gaps and regulation
            changes in real time.
          </p>
        </div>

        {/* Dashboard preview */}
        <div className="relative mx-auto mt-14 max-w-5xl">
          {/* Outer glow */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-purple-500/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c111c]/80 shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0a0f1a]/90 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="ml-3 flex-1 rounded-md bg-white/[0.04] px-3 py-1 text-xs text-slate-500">
                app.lexisgraph.io/compliance-overview
              </div>
            </div>
            <Image
              src="/dashboard-preview.png"
              alt="LexisGraph Dashboard showing compliance analytics, knowledge graph, and risk alerts"
              width={1200}
              height={700}
              className="w-full object-cover"
            />
          </div>

          {/* Floating info cards */}
          <div className="absolute -right-4 top-1/3 hidden rounded-xl border border-white/[0.08] bg-[#0c111c]/90 p-3 shadow-xl backdrop-blur-xl xl:block">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
              <span className="text-xs font-medium text-emerald-300">96.4% Compliant</span>
            </div>
          </div>
          <div className="absolute -left-4 bottom-1/3 hidden rounded-xl border border-white/[0.08] bg-[#0c111c]/90 p-3 shadow-xl backdrop-blur-xl xl:block">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
              <span className="text-xs font-medium text-amber-300">14 Risk Alerts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
