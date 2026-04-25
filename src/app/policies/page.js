"use client";

import { AuthProvider } from "@/hooks/use-auth";
import { AppShell } from "@/components/layout/app-shell";
import { PoliciesPage } from "@/components/pages/policies-page";

export default function PoliciesRoute() {
  return (
    <AuthProvider>
      <AppShell searchPlaceholder="Search policies...">
        <PoliciesPage />
      </AppShell>
    </AuthProvider>
  );
}
