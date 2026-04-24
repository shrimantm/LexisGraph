import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { alerts } from "@/components/dashboard/dashboard-data";

const typeBadgeClasses = {
  high: "border-rose-800 bg-rose-900/30 text-rose-300",
  warning: "border-amber-800 bg-amber-900/30 text-amber-300",
  info: "border-sky-800 bg-sky-900/30 text-sky-300",
};

const typeIndicatorClasses = {
  high: "bg-rose-400/90",
  warning: "bg-amber-400/90",
  info: "bg-sky-400/90",
};

export function AlertsPanel({ items = alerts }) {
  return (
    <Card className="h-full border-slate-800 bg-slate-900/70 text-slate-100">
      <CardHeader>
        <CardTitle>Compliance Alerts</CardTitle>
        <CardDescription className="text-slate-400">
          Legal risks, regulation updates, and policy conflicts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[340px] pr-2">
          <div className="space-y-3">
            {items.map((alert) => (
              <div
                key={`${alert.title}-${alert.timestamp}`}
                className="relative overflow-hidden rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-3 pl-5"
              >
                <span
                  className={cn(
                    "absolute bottom-2 left-0 top-2 w-1 rounded-r",
                    typeIndicatorClasses[alert.type] ?? typeIndicatorClasses.info
                  )}
                  aria-hidden="true"
                />
                <div className="mb-2 flex items-center justify-between gap-2">
                  <Badge
                    className={typeBadgeClasses[alert.type] ?? typeBadgeClasses.info}
                    variant="outline"
                  >
                    {alert.type}
                  </Badge>
                  <span className="text-xs text-slate-400">{alert.timestamp}</span>
                </div>
                <p className="text-sm font-medium text-slate-200">{alert.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  {alert.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}