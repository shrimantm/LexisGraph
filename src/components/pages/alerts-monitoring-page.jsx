"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const monitoringAlerts = [
  {
    type: "high",
    title: "Policy conflict found",
    description: "Retention period in HR policy conflicts with GDPR Article 5 requirements.",
    timestamp: "2 min ago",
  },
  {
    type: "warning",
    title: "New GDPR update detected",
    description: "Recent guidance update requires revalidation of consent records.",
    timestamp: "11 min ago",
  },
  {
    type: "info",
    title: "Regulation updated",
    description: "SOC2 control mapping references were refreshed from latest revision.",
    timestamp: "32 min ago",
  },
  {
    type: "high",
    title: "Critical evidence missing",
    description: "Control C-191 currently has no linked evidence file for audit defense.",
    timestamp: "48 min ago",
  },
];

const typeBadgeClasses = {
  high: "border-rose-800 bg-rose-900/30 text-rose-300",
  warning: "border-amber-800 bg-amber-900/30 text-amber-300",
  info: "border-sky-800 bg-sky-900/30 text-sky-300",
};

const dotClasses = {
  high: "bg-rose-400",
  warning: "bg-amber-400",
  info: "bg-sky-400",
};

function AlertTimeline({ items }) {
  return (
    <ScrollArea className="h-[560px] pr-2">
      <ol className="space-y-4">
        {items.map((alert, index) => (
          <li key={`${alert.title}-${index}`} className="relative pl-6">
            <span
              className={[
                "absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full",
                dotClasses[alert.type],
              ].join(" ")}
            />
            {index < items.length - 1 ? (
              <span className="absolute left-[4px] top-4 h-[calc(100%+12px)] w-px bg-slate-700" />
            ) : null}

            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <Badge className={typeBadgeClasses[alert.type]} variant="outline">
                  {alert.type}
                </Badge>
                <span className="text-xs text-slate-400">{alert.timestamp}</span>
              </div>
              <p className="text-sm font-medium text-slate-100">{alert.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                {alert.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </ScrollArea>
  );
}

export function AlertsMonitoringPage() {
  const criticalAlerts = monitoringAlerts.filter((alert) => alert.type === "high");
  const updateAlerts = monitoringAlerts.filter((alert) => alert.type !== "high");

  return (
    <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
      <CardHeader>
        <CardTitle>Alerts & Monitoring</CardTitle>
        <CardDescription className="text-slate-400">
          Real-time compliance timeline across policy conflicts and regulation changes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="gap-4">
          <TabsList className="bg-slate-900">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <AlertTimeline items={monitoringAlerts} />
          </TabsContent>
          <TabsContent value="critical">
            <AlertTimeline items={criticalAlerts} />
          </TabsContent>
          <TabsContent value="updates">
            <AlertTimeline items={updateAlerts} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}