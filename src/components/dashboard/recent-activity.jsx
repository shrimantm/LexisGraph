import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { activityTimeline } from "@/components/dashboard/dashboard-data";

export function RecentActivity() {
  return (
    <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription className="text-slate-400">
              Timeline of ingestion, analysis, and remediation events.
            </CardDescription>
          </div>
          <Badge className="border-slate-700 bg-slate-900 text-slate-300" variant="outline">
            Last 24h
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[260px] pr-2">
          <ol className="space-y-4">
            {activityTimeline.map((item, index) => (
              <li key={`${item.title}-${item.time}`} className="relative pl-5">
                <span className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                {index < activityTimeline.length - 1 ? (
                  <span className="absolute left-[4px] top-5 h-[calc(100%-2px)] w-px bg-slate-700" />
                ) : null}
                <p className="text-sm font-medium text-slate-200">{item.title}</p>
                <p className="mt-1 text-xs text-slate-400">{item.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span>{item.actor}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                </div>
              </li>
            ))}
          </ol>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
