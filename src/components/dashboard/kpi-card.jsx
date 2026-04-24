import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const statusStyles = {
  positive: "border-emerald-800 bg-emerald-900/30 text-emerald-300",
  negative: "border-rose-800 bg-rose-900/30 text-rose-300",
  neutral: "border-slate-700 bg-slate-900 text-slate-300",
};

const statusIcons = {
  positive: ArrowUpRight,
  negative: ArrowDownRight,
  neutral: Minus,
};

export function KpiCard({
  title,
  value,
  change,
  status = "neutral",
  className,
}) {
  const TrendIcon = statusIcons[status] ?? Minus;

  return (
    <Card
      className={cn(
        "h-full border-slate-800 bg-slate-900/70 text-slate-100",
        className
      )}
    >
      <CardHeader>
        <CardDescription className="text-xs tracking-wide text-slate-400">
          {title}
        </CardDescription>
        <CardTitle className="text-3xl font-bold text-slate-100">{value}</CardTitle>
      </CardHeader>
      {change ? (
        <CardContent>
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium",
              statusStyles[status] ?? statusStyles.neutral
            )}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            <span>{change}</span>
          </div>
        </CardContent>
      ) : null}
    </Card>
  );
}