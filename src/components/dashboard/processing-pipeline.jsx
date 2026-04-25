"use client";

import { useState, useEffect } from "react";
import { safeFetch } from "@/lib/api";
import { MOCK_DOCUMENTS, MOCK_PIPELINE_STEPS } from "@/lib/mock-data";
import { Zap, Check, Loader2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const stepIcons = {
  complete: Check,
  processing: Loader2,
  pending: Clock,
};

const stepDot = {
  complete: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]",
  processing: "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.4)] animate-pulse",
  pending: "bg-slate-600",
};

const stepText = {
  complete: "text-emerald-400",
  processing: "text-blue-400",
  pending: "text-slate-500",
};

const stepBg = {
  complete: "border-emerald-500/10 bg-emerald-500/[0.04]",
  processing: "border-blue-500/10 bg-blue-500/[0.04]",
  pending: "border-white/[0.04] bg-white/[0.02]",
};

const stepLine = {
  complete: "bg-emerald-500/30",
  processing: "bg-blue-500/20",
  pending: "bg-white/[0.06]",
};

export function ProcessingPipeline() {
  const [steps, setSteps] = useState([]);
  const [docId, setDocId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    async function fetchDocContext() {
      const { data } = await safeFetch("/documents", {}, MOCK_DOCUMENTS);
      const firstDoc = (Array.isArray(data) ? data : MOCK_DOCUMENTS)[0];
      setDocId(firstDoc?._id || firstDoc?.id || "latest");
    }
    fetchDocContext();
  }, []);

  useEffect(() => {
    if (!docId) return;
    async function fetchPipeline() {
      const { data, isDemo: demoMode } = await safeFetch(`/analysis/${docId}`, {}, MOCK_PIPELINE_STEPS);
      const normalized = Array.isArray(data) ? data : data?.steps;
      setSteps(Array.isArray(normalized) && normalized.length > 0 ? normalized : MOCK_PIPELINE_STEPS);
      setIsDemo(demoMode);
      setLoading(false);
    }
    fetchPipeline();
  }, [docId]);

  return (
    <div className="card-hover rounded-2xl border border-white/[0.06] bg-[#0d0f18]">
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
            <Zap className="h-4 w-4 text-violet-400" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-white">Pipeline</h3>
            <p className="text-[12px] text-slate-500">
              {isDemo ? "Demo Mode" : "Processing status"}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-8 text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-[13px]">Loading pipeline...</span>
          </div>
        ) : (
          <div className="space-y-0">
            {steps.map((step, index) => {
              const Icon = stepIcons[step.status] || Clock;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.id} className="relative pl-6">
                  {/* Dot */}
                  <span className={cn(
                    "absolute left-0 top-4 h-2.5 w-2.5 rounded-full ring-2 ring-[#0d0f18]",
                    stepDot[step.status]
                  )} />

                  {/* Connector */}
                  {!isLast && (
                    <span className={cn(
                      "absolute left-[4px] top-[22px] h-[calc(100%-6px)] w-px",
                      stepLine[step.status]
                    )} />
                  )}

                  <div className={cn(
                    "rounded-xl border p-3.5 mb-2",
                    stepBg[step.status]
                  )}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={cn("h-3.5 w-3.5", stepText[step.status],
                        step.status === "processing" && "animate-spin"
                      )} />
                      <span className={cn("text-[13px] font-medium", stepText[step.status])}>
                        {step.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{step.description}</p>
                    {step.duration && step.status === "complete" && (
                      <p className="mt-1.5 text-[10px] text-slate-600">Completed in {step.duration}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
