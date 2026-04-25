"use client";

import { AuthProvider } from "@/hooks/use-auth";
import { AppShell } from "@/components/layout/app-shell";
import { DocumentManagementPage } from "@/components/pages/document-management-page";

export default function DocumentsRoute() {
  return (
    <AuthProvider>
      <AppShell searchPlaceholder="Search documents, policies, regulations...">
        <DocumentManagementPage />
      </AppShell>
    </AuthProvider>
  );
}
