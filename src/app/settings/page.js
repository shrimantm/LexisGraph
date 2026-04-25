"use client";

import { AuthProvider } from "@/hooks/use-auth";
import { AppShell } from "@/components/layout/app-shell";
import { SettingsPage } from "@/components/pages/settings-page";

export default function SettingsRoute() {
  return (
    <AuthProvider>
      <AppShell>
        <SettingsPage />
      </AppShell>
    </AuthProvider>
  );
}
