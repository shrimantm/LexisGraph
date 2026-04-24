import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import { KnowledgeGraphPreview } from "@/components/dashboard/knowledge-graph-preview";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { Topbar } from "@/components/dashboard/topbar";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid min-h-screen md:grid-cols-[240px_1fr]">
        <SidebarNav />

        <div className="flex min-w-0 flex-col">
          <Topbar />

          <main className="flex-1 p-4 md:p-6">
            <KpiGrid />

            <section className="mt-4 grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-8">
                <KnowledgeGraphPreview />
              </div>
              <div className="col-span-12 lg:col-span-4">
                <AlertsPanel />
              </div>
            </section>

            <section className="mt-4 grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <RecentActivity />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}