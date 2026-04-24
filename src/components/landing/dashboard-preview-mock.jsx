import { BarChart3, BellRing, FileCheck2, Network } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const miniStats = [
  { label: "Policies", value: "1,284", icon: FileCheck2 },
  { label: "Graph Nodes", value: "42k", icon: Network },
  { label: "Risk Alerts", value: "14", icon: BellRing },
  { label: "Score", value: "96.4%", icon: BarChart3 },
];

export function DashboardPreviewMock() {
  return (
    <Card className="overflow-hidden border-slate-800 bg-slate-900/80 p-4 shadow-[0_20px_80px_-30px_rgba(14,165,233,0.35)]">
      <div className="mb-4 flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2">
        <div>
          <p className="text-xs text-slate-400">LexisGraph Console</p>
          <p className="text-sm font-semibold text-slate-100">Compliance Overview</p>
        </div>
        <Badge className="border-emerald-800 bg-emerald-900/30 text-emerald-300" variant="outline">
          Live
        </Badge>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {miniStats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="rounded-md border border-slate-800 bg-slate-950/70 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs text-slate-400">{item.label}</p>
                <Icon className="h-3.5 w-3.5 text-slate-500" />
              </div>
              <p className="text-base font-semibold text-slate-100">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-3 rounded-md border border-slate-800 bg-slate-950/70 p-3">
        <p className="mb-2 text-xs text-slate-400">Recent Findings</p>
        <div className="space-y-2">
          <div className="h-2 w-full rounded bg-slate-800" />
          <div className="h-2 w-5/6 rounded bg-slate-800" />
          <div className="h-2 w-2/3 rounded bg-slate-800" />
        </div>
      </div>
    </Card>
  );
}