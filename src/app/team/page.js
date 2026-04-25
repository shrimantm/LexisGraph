"use client";

import { AuthProvider } from "@/hooks/use-auth";
import { AppShell } from "@/components/layout/app-shell";
import { TeamPage } from "@/components/pages/team-page";

export default function TeamRoute() {
  return (
    <AuthProvider>
      <AppShell searchPlaceholder="Search team members...">
        <TeamPage />
      </AppShell>
    </AuthProvider>
  );
}
