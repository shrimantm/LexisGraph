"use client";

import { AuthProvider } from "@/hooks/use-auth";
import { AppShell } from "@/components/layout/app-shell";
import { DocumentManagementPage } from "@/components/pages/document-management-page";

export default function DocumentManagementRoute() {
  return (
    <AuthProvider>
      <AppShell
        activeItem="policy-upload"
        showUploadButton={false}
        searchPlaceholder="Search documents, policies, regulations..."
      >
        <DocumentManagementPage />
      </AppShell>
    </AuthProvider>
  );
}