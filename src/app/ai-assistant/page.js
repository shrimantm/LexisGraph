import { AppShell } from "@/components/layout/app-shell";
import { AiAssistantPage } from "@/components/pages/ai-assistant-page";

export default function AiAssistantRoute() {
  return (
    <AppShell
      activeItem="ai-assistant"
      showUploadButton={false}
      searchPlaceholder="Search conversations, regulations, policies..."
    >
      <AiAssistantPage />
    </AppShell>
  );
}