import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { Topbar } from "@/components/dashboard/topbar";

export function AppShell({
  activeItem = "dashboard",
  showUploadButton = false,
  searchPlaceholder,
  children,
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid min-h-screen md:grid-cols-[240px_1fr]">
        <SidebarNav activeItem={activeItem} />

        <div className="flex min-w-0 flex-col">
          <Topbar
            showUploadButton={showUploadButton}
            searchPlaceholder={searchPlaceholder}
          />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}