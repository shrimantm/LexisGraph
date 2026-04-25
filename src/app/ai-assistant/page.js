"use client";

import { AuthProvider } from "@/hooks/use-auth";
import { AppShell } from "@/components/layout/app-shell";
import { AiAssistantPage } from "@/components/pages/ai-assistant-page";

export default function AiAssistantRoute() {
  return (
    <AuthProvider>
      <AppShell searchPlaceholder="Search conversations, regulations, policies...">
        <AiAssistantPage />
      </AppShell>
    </AuthProvider>
  );
}