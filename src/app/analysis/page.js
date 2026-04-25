"use client";

import { AuthProvider } from "@/hooks/use-auth";
import { AppShell } from "@/components/layout/app-shell";
import { AnalysisPage } from "@/components/pages/analysis-page";

export default function AnalysisRoute() {
  return (
    <AuthProvider>
      <AppShell searchPlaceholder="Search clauses, controls, regulations...">
        <AnalysisPage />
      </AppShell>
    </AuthProvider>
  );
}
