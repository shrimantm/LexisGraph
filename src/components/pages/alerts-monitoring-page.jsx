"use client";

import { useState, useEffect } from "react";
import { safeFetch } from "@/lib/api";
import { MOCK_ALERTS } from "@/lib/mock-data";
import { Loader2 } from "lucide-react";

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

const typeBadgeClasses = {
  high: "border-rose-800 bg-rose-900/30 text-rose-300",
  medium: "border-amber-800 bg-amber-900/30 text-amber-300",
  low: "border-sky-800 bg-sky-900/30 text-sky-300",
};

const dotClasses = {
  high: "bg-rose-400",
  medium: "bg-amber-400",
  low: "bg-sky-400",
};

function normalizeAlert(item) {
  const severity = String(item?.severity || item?.type || "low").toLowerCase();
  const type = severity === "warning" ? "medium" : severity === "info" ? "low" : severity;
  return {
    ...item,
    type,
    title: item?.title || item?.message || "Compliance alert",
    description: item?.description || item?.message || "No details provided.",
    timestamp: item?.timestamp || (item?.created_at ? new Date(item.created_at).toLocaleString() : "just now"),
  };
}

function AlertTimeline({ items }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-10 text-center">
        <p className="text-sm text-slate-400">No alerts in this category</p>
      </div>
    );
  }

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
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    async function fetchAlerts() {
      const { data, isDemo: demoMode } = await safeFetch("/alerts", {}, MOCK_ALERTS);
      setAlerts((Array.isArray(data) ? data : MOCK_ALERTS).map(normalizeAlert));
      setIsDemo(demoMode);
      setLoading(false);
    }
    fetchAlerts();
  }, []);

  if (loading) {
    return (
      <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
        <CardContent className="flex items-center justify-center gap-3 py-16 text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading alerts...
        </CardContent>
      </Card>
    );
  }

  const criticalAlerts = alerts.filter((alert) => alert.type === "high");
  const updateAlerts = alerts.filter((alert) => alert.type !== "high");

  return (
    <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Alerts & Monitoring</CardTitle>
            <CardDescription className="text-slate-400">
              Real-time compliance timeline across policy conflicts and regulation changes.
            </CardDescription>
          </div>
          {isDemo && (
            <Badge className="border-amber-800 bg-amber-900/30 text-amber-300" variant="outline">
              Demo Mode
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="gap-4">
          <TabsList className="bg-slate-900">
            <TabsTrigger value="all">All ({alerts.length})</TabsTrigger>
            <TabsTrigger value="critical">Critical ({criticalAlerts.length})</TabsTrigger>
            <TabsTrigger value="updates">Updates ({updateAlerts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <AlertTimeline items={alerts} />
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
