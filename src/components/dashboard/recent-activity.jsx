import { Activity } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { activityTimeline } from "@/components/dashboard/dashboard-data";

export function RecentActivity() {
  return (
    <div className="card-hover rounded-2xl border border-white/[0.06] bg-[#0d0f18]">
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
            <Activity className="h-4 w-4 text-violet-400" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-white">Recent Activity</h3>
            <p className="text-[12px] text-slate-500">Last 24 hours</p>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        <ScrollArea className="h-[240px] pr-1">
          <ol className="space-y-0">
            {activityTimeline.map((item, index) => {
              const isLast = index === activityTimeline.length - 1;
              return (
                <li key={`${item.title}-${index}`} className="relative pl-6 pb-4">
                  {/* Dot */}
                  <span className="absolute left-0 top-[7px] h-2 w-2 rounded-full bg-blue-400/80 ring-2 ring-[#0d0f18]" />
                  {/* Connector line */}
                  {!isLast && (
                    <span className="absolute left-[3px] top-[15px] h-[calc(100%-8px)] w-px bg-white/[0.06]" />
                  )}

                  <p className="text-[13px] font-medium text-slate-200 leading-snug">{item.title}</p>
                  <p className="mt-0.5 text-[12px] text-slate-500">{item.description}</p>
                  <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-600">
                    <span className="font-medium text-slate-400">{item.actor}</span>
                    <span className="h-0.5 w-0.5 rounded-full bg-slate-700" />
                    <span>{item.time}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </ScrollArea>
      </div>
    </div>
  );
}
