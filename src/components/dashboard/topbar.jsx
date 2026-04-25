"use client";

import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/documents": "Documents",
  "/policies": "Policies",
  "/analysis": "Analysis",
  "/alerts": "Alerts",
  "/ai-assistant": "AI Assistant",
  "/team": "Team",
  "/profile": "Profile",
  "/settings": "Settings",
};

export function Topbar({
  searchPlaceholder = "Search policies, entities, controls...",
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  const pageTitle = pageTitles[pathname] || "LexisGraph";
  const initials = (user?.name || user?.email || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 h-14 border-b border-white/[0.06] bg-slate-950/80 px-4 backdrop-blur-xl md:px-6">
      <div className="flex h-full items-center justify-between gap-4">
        {/* Page title */}
        <h1 className="text-[15px] font-semibold text-white tracking-tight">
          {pageTitle}
        </h1>

        {/* Search */}
        <div className="relative hidden w-full max-w-md md:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            className="h-8 rounded-lg border-white/[0.06] bg-white/[0.03] pl-8 text-[13px] text-slate-300 placeholder:text-slate-500 focus-visible:border-blue-500/40 focus-visible:ring-blue-500/10"
          />
        </div>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </Button>

          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/25 to-violet-500/25 ring-1 ring-white/[0.08] text-[10px] font-bold text-slate-200">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
