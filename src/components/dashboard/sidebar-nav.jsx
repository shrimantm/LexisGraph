"use client";

import {
  AlertTriangle,
  Bot,
  FileText,
  Gauge,
  LogOut,
  Search as SearchIcon,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

const menuItems = [
  { id: "dashboard",    label: "Dashboard",     icon: Gauge,          href: "/dashboard" },
  { id: "documents",    label: "Documents",     icon: FileText,       href: "/documents" },
  { id: "policies",     label: "Policies",      icon: Shield,         href: "/policies" },
  { id: "analysis",     label: "Analysis",      icon: SearchIcon,     href: "/analysis" },
  { id: "alerts",       label: "Alerts",        icon: AlertTriangle,  href: "/alerts" },
  { id: "ai-assistant", label: "AI Assistant",  icon: Bot,            href: "/ai-assistant" },
  { id: "team",         label: "Team",          icon: Users,          href: "/team" },
  { id: "profile",      label: "Profile",       icon: User,           href: "/profile" },
  { id: "settings",     label: "Settings",      icon: Settings,       href: "/settings" },
];

export function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const displayName = user?.name || user?.email || "User";
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleLogout() {
    logout();
    router.push("/sign-in");
  }

  return (
    <aside className="hidden w-[220px] border-r border-white/[0.06] bg-[#0a0c14] md:flex md:flex-col">
      {/* Logo */}
      <Link
        href="/dashboard"
        className="flex items-center gap-2.5 px-5 h-14 border-b border-white/[0.06] group shrink-0"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/20 transition-shadow group-hover:shadow-blue-500/35">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.636 5.636l2.121 2.121m8.486 8.486l2.121 2.121M5.636 18.364l2.121-2.121m8.486-8.486l2.121-2.121" />
          </svg>
        </div>
        <span className="text-[13px] font-semibold tracking-tight text-white/90">
          Lexis<span className="text-blue-400">Graph</span>
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-0.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={[
                "group flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[13px] font-medium transition-all duration-150",
                isActive
                  ? "bg-white/[0.08] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200",
              ].join(" ")}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={[
                  "h-[15px] w-[15px] shrink-0 transition-colors duration-150",
                  isActive
                    ? "text-blue-400"
                    : "text-slate-500 group-hover:text-slate-300",
                ].join(" ")}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div className="border-t border-white/[0.06] px-3 py-3">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.04]">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/25 to-violet-500/25 ring-1 ring-white/[0.08] text-[10px] font-bold text-slate-200 shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium text-slate-200">{displayName}</p>
            <p className="truncate text-[10px] text-slate-500">{user?.role || "Member"}</p>
          </div>
        </div>
        <button
          type="button"
          className="mt-1 flex w-full items-center gap-2 rounded-lg px-2.5 py-[7px] text-[12px] font-medium text-slate-500 transition-colors hover:bg-red-500/[0.08] hover:text-red-400"
          onClick={handleLogout}
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}