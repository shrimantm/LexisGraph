import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const trendClasses = {
  positive: "text-emerald-400",
  negative: "text-rose-400",
  neutral: "text-slate-400",
};

const trendBg = {
  positive: "bg-emerald-500/10",
  negative: "bg-rose-500/10",
  neutral: "bg-slate-500/10",
};

const trendIcons = {
  positive: ArrowUpRight,
  negative: ArrowDownRight,
  neutral: Minus,
};

export function KpiCard({
  title,
  value,
  change,
  status = "neutral",
  icon: Icon,
  iconColor = "text-blue-400",
  className,
}) {
  const TrendIcon = trendIcons[status] ?? Minus;

  return (
    <div
      className={cn(
        "card-hover group rounded-2xl border border-white/[0.06] bg-[#0d0f18] p-5",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-[12px] font-medium uppercase tracking-wide text-slate-500">
          {title}
        </p>
        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] transition-colors group-hover:bg-white/[0.06]">
            <Icon className={cn("h-4 w-4", iconColor)} />
          </div>
        )}
      </div>

      <p className="text-2xl font-bold tracking-tight text-white">{value}</p>

      {change && (
        <div className="mt-2.5 flex items-center gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-medium",
              trendBg[status],
              trendClasses[status]
            )}
          >
            <TrendIcon className="h-3 w-3" />
            {change}
          </span>
        </div>
      )}
    </div>
  );
}