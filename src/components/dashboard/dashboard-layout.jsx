import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import { KnowledgeGraphPreview } from "@/components/dashboard/knowledge-graph-preview";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { Topbar } from "@/components/dashboard/topbar";
import { FileManagement } from "@/components/dashboard/file-management";
import { ProcessingPipeline } from "@/components/dashboard/processing-pipeline";
import { DashboardChat } from "@/components/dashboard/dashboard-chat";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid min-h-screen md:grid-cols-[220px_1fr]">
        <SidebarNav />

        <div className="flex min-w-0 flex-col">
          <Topbar />

          <main className="flex-1 overflow-y-auto p-5 md:p-6">
            <div className="mx-auto max-w-6xl space-y-6">
              {/* KPI Stats */}
              <KpiGrid />

              {/* File upload */}
              <FileManagement />

              {/* Pipeline + Chat */}
              <div className="grid gap-4 lg:grid-cols-2">
                <ProcessingPipeline />
                <DashboardChat />
              </div>

              {/* Knowledge Graph + Alerts */}
              <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
                <KnowledgeGraphPreview />
                <AlertsPanel />
              </div>

              {/* Recent Activity */}
              <RecentActivity />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}