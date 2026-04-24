import { AppShell } from "@/components/layout/app-shell";
import { GapAnalysisPage } from "@/components/pages/gap-analysis-page";

export default function GapAnalysisRoute() {
  return (
    <AppShell
      activeItem="gap-analysis"
      showUploadButton={false}
      searchPlaceholder="Search clauses, controls, regulations..."
    >
      <GapAnalysisPage />
    </AppShell>
  );
}