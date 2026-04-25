"use client";

import { AuthProvider } from "@/hooks/use-auth";
import { AppShell } from "@/components/layout/app-shell";
import { AlertsMonitoringPage } from "@/components/pages/alerts-monitoring-page";

export default function AlertsRoute() {
  return (
    <AuthProvider>
      <AppShell searchPlaceholder="Search alerts, incidents, updates...">
        <AlertsMonitoringPage />
      </AppShell>
    </AuthProvider>
  );
}