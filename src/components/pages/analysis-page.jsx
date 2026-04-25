"use client";

import { useState, useEffect } from "react";
import { safeFetch } from "@/lib/api";
import { MOCK_DOCUMENTS, MOCK_PIPELINE_STEPS } from "@/lib/mock-data";
import {
  Search, FileText, Check, Loader2, Clock,
  Zap, AlertTriangle, ChevronRight, BarChart3
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const policyOptions = [
  "HR Policy 2026",
  "Vendor Risk Policy",
  "Data Privacy Policy",
];

const issueList = [
  {
    policy: "HR Policy 2026",
    type: "Missing Clause",
    clause: "Employee Data Retention",
    regulation: "GDPR Article 5",
    severity: "high",
  },
  {
    policy: "HR Policy 2026",
    type: "Conflict",
    clause: "Termination Notice Timeline",
    regulation: "EU Employment Directive 2019/1152",
    severity: "medium",
  },
  {
    policy: "Vendor Risk Policy",
    type: "Outdated",
    clause: "Third-party Risk Assessment Frequency",
    regulation: "ISO 27001:2022",
    severity: "low",
  },
  {
    policy: "Data Privacy Policy",
    type: "Conflict",
    clause: "Cross-border Transfer Controls",
    regulation: "Schrems II Guidance",
    severity: "high",
  },
  {
    policy: "Data Privacy Policy",
    type: "Missing Clause",
    clause: "Data Subject Access Request Procedure",
    regulation: "GDPR Article 15",
    severity: "medium",
  },
];

const severityClasses = {
  high: "border-rose-800 bg-rose-900/30 text-rose-300",
  medium: "border-amber-800 bg-amber-900/30 text-amber-300",
  low: "border-sky-800 bg-sky-900/30 text-sky-300",
};

const severityBorder = {
  high: "border-l-rose-500",
  medium: "border-l-amber-500",
  low: "border-l-sky-500",
};

const stepIcons = {
  complete: <Check className="h-4 w-4" />,
  processing: <Loader2 className="h-4 w-4 animate-spin" />,
  pending: <Clock className="h-4 w-4" />,
};

const stepColors = {
  complete: "bg-emerald-400 shadow-emerald-400/40 shadow-[0_0_8px]",
  processing: "bg-blue-400 shadow-blue-400/40 shadow-[0_0_8px] animate-pulse",
  pending: "bg-slate-600",
};

const stepLineColors = {
  complete: "bg-emerald-500/50",
  processing: "bg-blue-500/30",
  pending: "bg-slate-700",
};

const stepTextColors = {
  complete: "text-emerald-300",
  processing: "text-blue-300",
  pending: "text-slate-500",
};

const stepBgColors = {
  complete: "border-emerald-800/40 bg-emerald-900/10",
  processing: "border-blue-800/40 bg-blue-900/10",
  pending: "border-slate-800 bg-slate-900/30",
};

function normalizeAnalysisSteps(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return MOCK_PIPELINE_STEPS;
  if (Array.isArray(payload.steps)) return payload.steps;

  const toStatus = (value) => {
    if (value === true || value === "complete" || value === "completed") return "complete";
    if (value === "processing" || value === "running") return "processing";
    return "pending";
  };

  return [
    {
      id: "parse",
      label: "Parsed (spaCy)",
      description: "Entity and clause extraction",
      status: toStatus(payload.parsed),
    },
    {
      id: "graph",
      label: "Knowledge Graph (Neo4j)",
      description: "Graph nodes and relations generated",
      status: toStatus(payload.knowledge_graph),
    },
    {
      id: "gap",
      label: "Gap Analysis",
      description: "Compliance mismatch detection",
      status: toStatus(payload.gap_analysis),
    },
  ];
}

export function AnalysisPage() {
  const [selectedPolicy, setSelectedPolicy] = useState(policyOptions[0]);
  const [steps, setSteps] = useState([]);
  const [docId, setDocId] = useState(null);
  const [loadingPipeline, setLoadingPipeline] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

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
      const { data, isDemo: demoMode } = await safeFetch(
        `/analysis/${docId}`,
        {},
        MOCK_PIPELINE_STEPS
      );
      const normalized = normalizeAnalysisSteps(data);
      setSteps(Array.isArray(normalized) && normalized.length > 0 ? normalized : MOCK_PIPELINE_STEPS);
      setIsDemo(demoMode);
      setLoadingPipeline(false);
    }
    fetchPipeline();
  }, [docId]);

  const issues = issueList.filter((i) => i.policy === selectedPolicy);

  const highCount = issues.filter((i) => i.severity === "high").length;
  const medCount = issues.filter((i) => i.severity === "medium").length;
  const lowCount = issues.filter((i) => i.severity === "low").length;

  async function runAnalysis() {
    setAnalyzing(true);
    // Simulate analysis run
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setAnalyzing(false);
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Pipeline section */}
      <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-violet-400">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Processing Pipeline</CardTitle>
                <CardDescription className="text-slate-400">
                  Document analysis workflow — spaCy → Neo4j → Gap Detection
                </CardDescription>
              </div>
            </div>
            {isDemo && (
              <Badge className="border-amber-800 bg-amber-900/30 text-amber-300 text-[10px]" variant="outline">
                Demo Mode
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {loadingPipeline ? (
            <div className="flex items-center justify-center gap-3 py-8 text-slate-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading pipeline...
            </div>
          ) : (
            <div className="flex items-center gap-0">
              {steps.map((step, index) => {
                const colors = stepColors[step.status] || stepColors.pending;
                const textColor = stepTextColors[step.status] || stepTextColors.pending;
                const bgColor = stepBgColors[step.status] || stepBgColors.pending;
                const isLast = index === steps.length - 1;

                return (
                  <div key={step.id} className="flex flex-1 items-center">
                    <div className={`flex-1 rounded-xl border p-4 ${bgColor}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${colors}`} />
                        <span className={`text-sm font-medium ${textColor}`}>
                          {stepIcons[step.status]}
                        </span>
                      </div>
                      <p className={`text-sm font-medium ${textColor}`}>{step.label}</p>
                      <p className="mt-1 text-[11px] text-slate-500">{step.description}</p>
                      {step.duration && (
                        <p className="mt-2 text-[10px] text-slate-500">
                          {step.status === "complete" ? `Completed in ${step.duration}` : "Processing..."}
                        </p>
                      )}
                    </div>
                    {!isLast && (
                      <ChevronRight className="h-5 w-5 mx-1 shrink-0 text-slate-600" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gap Analysis */}
      <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
        {/* Filters */}
        <Card className="h-fit border-slate-800 bg-slate-900/70 text-slate-100 xl:sticky xl:top-24">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-400" />
              Gap Analysis
            </CardTitle>
            <CardDescription className="text-slate-400">
              Select a policy and run compliance gap detection.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select value={selectedPolicy} onValueChange={setSelectedPolicy}>
              <SelectTrigger className="h-9 w-full border-slate-700 bg-slate-950/70 text-slate-100">
                <SelectValue placeholder="Select Policy" />
              </SelectTrigger>
              <SelectContent>
                {policyOptions.map((policy) => (
                  <SelectItem key={policy} value={policy}>
                    {policy}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="w-full gap-2" onClick={runAnalysis} disabled={analyzing}>
              {analyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Run Analysis
                </>
              )}
            </Button>

            {/* Severity summary */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Issues Found</p>
              <div className="flex items-center gap-2">
                <Badge className={severityClasses.high} variant="outline">{highCount} High</Badge>
                <Badge className={severityClasses.medium} variant="outline">{medCount} Medium</Badge>
                <Badge className={severityClasses.low} variant="outline">{lowCount} Low</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription className="text-slate-400">
              Issues ranked by severity and mapped to relevant regulations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {issues.length === 0 ? (
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-10 text-center">
                <Search className="mx-auto h-8 w-8 text-slate-500" />
                <p className="mt-3 text-sm font-medium text-slate-200">No issues found</p>
                <p className="mt-1 text-xs text-slate-400">
                  Select a different policy or run a new analysis.
                </p>
              </div>
            ) : (
              issues.map((issue, index) => (
                <div
                  key={`${issue.clause}-${index}`}
                  className={[
                    "rounded-xl border border-slate-800 border-l-4 bg-slate-950/60 p-4",
                    severityBorder[issue.severity],
                  ].join(" ")}
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`h-4 w-4 ${
                        issue.severity === "high" ? "text-rose-400" :
                        issue.severity === "medium" ? "text-amber-400" : "text-sky-400"
                      }`} />
                      <p className="text-sm font-semibold text-slate-100">{issue.type}</p>
                    </div>
                    <Badge className={severityClasses[issue.severity]} variant="outline">
                      {issue.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-200">{issue.clause}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Related regulation: {issue.regulation}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-3 h-8 border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                  >
                    Suggest Fix
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
