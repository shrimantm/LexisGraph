"use client";

import { useMemo, useState } from "react";

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

export function GapAnalysisPage() {
  const [selectedPolicy, setSelectedPolicy] = useState(policyOptions[0]);

  const issues = useMemo(
    () => issueList.filter((issue) => issue.policy === selectedPolicy),
    [selectedPolicy]
  );

  return (
    <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
      <Card className="h-fit border-slate-800 bg-slate-900/70 text-slate-100 xl:sticky xl:top-24">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
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

          <Button className="w-full">Run Analysis</Button>
        </CardContent>
      </Card>

      <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
        <CardHeader>
          <CardTitle>Gap Analysis Results</CardTitle>
          <CardDescription className="text-slate-400">
            Issues are ranked by severity and mapped to relevant regulations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {issues.map((issue, index) => (
            <div
              key={`${issue.clause}-${index}`}
              className={[
                "rounded-xl border border-slate-800 border-l-4 bg-slate-950/60 p-4",
                severityBorder[issue.severity],
              ].join(" ")}
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-100">{issue.type}</p>
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
          ))}
        </CardContent>
      </Card>
    </div>
  );
}