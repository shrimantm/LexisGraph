"use client";

import { AuthProvider } from "@/hooks/use-auth";
import { AppShell } from "@/components/layout/app-shell";
import { ProfilePage } from "@/components/pages/profile-page";

export default function ProfileRoute() {
  return (
    <AuthProvider>
      <AppShell>
        <ProfilePage />
      </AppShell>
    </AuthProvider>
  );
}
