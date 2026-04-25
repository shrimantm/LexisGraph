import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { Topbar } from "@/components/dashboard/topbar";

export function AppShell({
  searchPlaceholder,
  children,
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid min-h-screen md:grid-cols-[220px_1fr]">
        <SidebarNav />

        <div className="flex min-w-0 flex-col">
          <Topbar searchPlaceholder={searchPlaceholder} />
          <main className="flex-1 overflow-y-auto p-5 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}