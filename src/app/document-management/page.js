import { AppShell } from "@/components/layout/app-shell";
import { DocumentManagementPage } from "@/components/pages/document-management-page";

export default function DocumentManagementRoute() {
  return (
    <AppShell
      activeItem="policy-upload"
      showUploadButton={false}
      searchPlaceholder="Search documents, policies, regulations..."
    >
      <DocumentManagementPage />
    </AppShell>
  );
}