import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function KnowledgeGraphPreview() {
  return (
    <Card className="h-full border-slate-800 bg-slate-900/70 text-slate-100">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle>Knowledge Graph Preview</CardTitle>
            <CardDescription className="text-slate-400">
              Placeholder for React Flow graph visualization.
            </CardDescription>
          </div>
          <Badge className="border-cyan-800 bg-cyan-900/30 text-cyan-300" variant="outline">
            GraphRAG
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative min-h-[320px] rounded-xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.15)_1px,transparent_0)] bg-[size:20px_20px]" />
          <div className="relative z-10 flex h-full min-h-[320px] items-center justify-center">
            <div className="rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-3 text-center">
              <p className="text-sm font-medium text-slate-200">React Flow canvas mounts here</p>
              <p className="mt-1 text-xs text-slate-400">
                Nodes: Policies, controls, entities, obligations
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}