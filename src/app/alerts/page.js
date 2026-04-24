import { AppShell } from "@/components/layout/app-shell";
import { AlertsMonitoringPage } from "@/components/pages/alerts-monitoring-page";

export default function AlertsRoute() {
  return (
    <AppShell
      activeItem="alerts"
      showUploadButton={false}
      searchPlaceholder="Search alerts, incidents, updates..."
    >
      <AlertsMonitoringPage />
    </AppShell>
  );
}