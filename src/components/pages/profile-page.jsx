"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  User, Mail, Building2, Shield, Save,
  Check, Loader2, Key
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ProfilePage() {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const initials = (user?.name || user?.email || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleSave() {
    setSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 800));
    updateUser({ name: name.trim() });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-5">
        <Avatar className="h-20 w-20 border-2 border-slate-700 bg-slate-800">
          <AvatarFallback className="bg-gradient-to-br from-blue-500/30 to-violet-500/30 text-2xl font-bold text-slate-100">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold text-slate-100">{user?.name || "User"}</h1>
          <p className="text-sm text-slate-400">{user?.email}</p>
          <Badge className="mt-2 border-violet-800 bg-violet-900/30 text-violet-300" variant="outline">
            <Shield className="h-3 w-3 mr-1" />
            {user?.role || "Member"}
          </Badge>
        </div>
      </div>

      {/* Save notification */}
      {saved && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-800/50 bg-emerald-900/20 text-emerald-300 px-4 py-3 text-sm animate-fade-in">
          <Check className="h-4 w-4 shrink-0" />
          Profile updated successfully
        </div>
      )}

      {/* Personal Info */}
      <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-4 w-4 text-blue-400" />
            Personal Information
          </CardTitle>
          <CardDescription className="text-slate-400">
            Update your profile details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="profile-name" className="text-xs text-slate-300">Full Name</Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 border-slate-700 bg-slate-950/70 text-slate-100"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-email" className="text-xs text-slate-300">Email Address</Label>
            <Input
              id="profile-email"
              value={email}
              readOnly
              className="h-9 border-slate-700 bg-slate-950/70 text-slate-400 cursor-not-allowed"
            />
            <p className="text-[11px] text-slate-500">Email cannot be changed.</p>
          </div>

          <Button
            onClick={handleSave}
            disabled={saving || !name.trim()}
            className="gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Organization Info */}
      <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-violet-400" />
            Organization
          </CardTitle>
          <CardDescription className="text-slate-400">
            Your workspace information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-[11px] uppercase tracking-wide text-slate-500">Org ID</p>
              <p className="mt-1 text-sm font-mono text-slate-200">{user?.org_id || "—"}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-[11px] uppercase tracking-wide text-slate-500">User ID</p>
              <p className="mt-1 text-sm font-mono text-slate-200">{user?.user_id || "—"}</p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500">Role</p>
            <p className="mt-1 text-sm text-slate-200 capitalize">{user?.role || "member"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-4 w-4 text-amber-400" />
            Security
          </CardTitle>
          <CardDescription className="text-slate-400">
            Manage your account security settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="gap-2 border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800">
            <Key className="h-4 w-4" />
            Change Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
