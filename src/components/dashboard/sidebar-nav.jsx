import {
  AlertTriangle,
  Bot,
  FileUp,
  FileWarning,
  Gauge,
  GitBranch,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const defaultMenuItems = [
  { id: "dashboard", label: "Dashboard", icon: Gauge, href: "/dashboard" },
  { id: "policy-upload", label: "Policy Upload", icon: FileUp, href: "/document-management" },
  { id: "knowledge-graph", label: "Knowledge Graph", icon: GitBranch, href: "/dashboard" },
  { id: "gap-analysis", label: "Gap Analysis", icon: FileWarning, href: "/gap-analysis" },
  { id: "reports", label: "Reports", icon: ShieldCheck, href: "#" },
  { id: "ai-assistant", label: "AI Assistant", icon: Bot, href: "/ai-assistant" },
  { id: "alerts", label: "Alerts", icon: AlertTriangle, href: "/alerts" },
  { id: "team", label: "Team", icon: Users, href: "#" },
  { id: "settings", label: "Settings", icon: Settings, href: "#" },
];

export function SidebarNav({
  items = defaultMenuItems,
  activeItem = "dashboard",
  user = { name: "Shrimant Marathe", role: "Compliance Manager" },
}) {
  return (
    <aside className="hidden w-[240px] border-r border-slate-800 bg-slate-900 p-3 md:flex md:flex-col">
      <div className="mb-4 px-2">
        <p className="text-[11px] font-semibold tracking-[0.24em] text-slate-400">
          LEXISGRAPH
        </p>
        <h1 className="mt-2 text-base font-semibold text-slate-100">
          SaaS Console
        </h1>
      </div>

      <ScrollArea className="h-[calc(100vh-11.5rem)] pr-1">
        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeItem;

            return (
            <Link
              key={item.id}
              href={item.href ?? "#"}
              className={[
                "group flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition",
                isActive
                  ? "border-cyan-500/40 bg-slate-800 text-cyan-300 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.15)]"
                  : "border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-800/70 hover:text-slate-100",
              ].join(" ")}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={[
                  "h-4 w-4 shrink-0 transition",
                  isActive
                    ? "text-cyan-300"
                    : "text-slate-500 group-hover:text-slate-200",
                ].join(" ")}
              />
              <span>{item.label}</span>
            </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <Card className="mt-3 border-slate-800 bg-slate-950/70 text-slate-100">
        <CardContent className="flex items-center justify-between gap-2 p-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-slate-400">{user.role}</p>
          </div>
          <Badge className="border-slate-700 bg-slate-900 text-slate-300" variant="outline">
            Pro
          </Badge>
        </CardContent>
      </Card>
    </aside>
  );
}