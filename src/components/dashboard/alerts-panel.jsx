import { AlertTriangle, Info, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { alerts } from "@/components/dashboard/dashboard-data";

const typeConfig = {
  high: {
    icon: AlertCircle,
    dot: "bg-rose-400",
    text: "text-rose-400",
    bg: "bg-rose-500/8",
    label: "Critical",
  },
  warning: {
    icon: AlertTriangle,
    dot: "bg-amber-400",
    text: "text-amber-400",
    bg: "bg-amber-500/8",
    label: "Warning",
  },
  info: {
    icon: Info,
    dot: "bg-sky-400",
    text: "text-sky-400",
    bg: "bg-sky-500/8",
    label: "Info",
  },
};

export function AlertsPanel({ items = alerts }) {
  return (
    <div className="card-hover rounded-2xl border border-white/[0.06] bg-[#0d0f18]">
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10">
            <AlertTriangle className="h-4 w-4 text-rose-400" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-white">Alerts</h3>
            <p className="text-[12px] text-slate-500">Compliance issues</p>
          </div>
        </div>
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500/15 px-1.5 text-[10px] font-bold text-rose-400">
          {items.filter((a) => a.type === "high").length}
        </span>
      </div>

      <div className="px-5 pb-5">
        <ScrollArea className="h-[280px] pr-1">
          <div className="space-y-2">
            {items.map((alert, i) => {
              const config = typeConfig[alert.type] || typeConfig.info;
              return (
                <div
                  key={`${alert.title}-${i}`}
                  className="group rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex items-start gap-2.5">
                    <div className={cn("mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full", config.dot)} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={cn("text-[10px] font-semibold uppercase tracking-wider", config.text)}>
                          {config.label}
                        </span>
                        <span className="text-[10px] text-slate-600">{alert.timestamp}</span>
                      </div>
                      <p className="text-[13px] font-medium text-slate-200 leading-snug">{alert.title}</p>
                      <p className="mt-1 text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                        {alert.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}