"use client";

import { useState } from "react";
import {
  Settings, Bell, Moon, Shield, Globe,
  Save, Check, Loader2
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

function ToggleRow({ icon: Icon, iconColor, label, description, enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]">
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconColor}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-200">{label}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        className={[
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-200",
          enabled
            ? "border-cyan-700 bg-cyan-600"
            : "border-slate-700 bg-slate-800",
        ].join(" ")}
      >
        <span
          className={[
            "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transition-transform duration-200",
            enabled ? "translate-x-[22px]" : "translate-x-[3px]",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

export function SettingsPage() {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    darkMode: true,
    autoAnalysis: false,
    twoFactor: false,
    weeklyDigest: true,
    betaFeatures: false,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function toggle(key) {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function handleSave() {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your application preferences.</p>
      </div>

      {saved && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-800/50 bg-emerald-900/20 text-emerald-300 px-4 py-3 text-sm animate-fade-in">
          <Check className="h-4 w-4 shrink-0" />
          Settings saved successfully
        </div>
      )}

      {/* Notifications */}
      <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-blue-400" />
            Notifications
          </CardTitle>
          <CardDescription className="text-slate-400">
            Configure how you receive alerts and updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <ToggleRow
            icon={Bell}
            iconColor="bg-blue-500/10 text-blue-400"
            label="Email Alerts"
            description="Receive compliance alerts via email"
            enabled={settings.emailAlerts}
            onToggle={() => toggle("emailAlerts")}
          />
          <ToggleRow
            icon={Globe}
            iconColor="bg-violet-500/10 text-violet-400"
            label="Weekly Digest"
            description="Receive a weekly compliance summary"
            enabled={settings.weeklyDigest}
            onToggle={() => toggle("weeklyDigest")}
          />
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-4 w-4 text-amber-400" />
            Appearance
          </CardTitle>
          <CardDescription className="text-slate-400">
            Customize the look and feel.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <ToggleRow
            icon={Moon}
            iconColor="bg-amber-500/10 text-amber-400"
            label="Dark Mode"
            description="Use dark theme across the platform"
            enabled={settings.darkMode}
            onToggle={() => toggle("darkMode")}
          />
        </CardContent>
      </Card>

      {/* Analysis */}
      <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-cyan-400" />
            Analysis
          </CardTitle>
          <CardDescription className="text-slate-400">
            Control automated analysis behavior.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <ToggleRow
            icon={Settings}
            iconColor="bg-cyan-500/10 text-cyan-400"
            label="Auto-Analysis"
            description="Automatically analyze uploaded documents"
            enabled={settings.autoAnalysis}
            onToggle={() => toggle("autoAnalysis")}
          />
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-400" />
            Security
          </CardTitle>
          <CardDescription className="text-slate-400">
            Account security preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <ToggleRow
            icon={Shield}
            iconColor="bg-emerald-500/10 text-emerald-400"
            label="Two-Factor Authentication"
            description="Add an extra layer of security"
            enabled={settings.twoFactor}
            onToggle={() => toggle("twoFactor")}
          />
          <ToggleRow
            icon={Settings}
            iconColor="bg-rose-500/10 text-rose-400"
            label="Beta Features"
            description="Enable experimental features"
            enabled={settings.betaFeatures}
            onToggle={() => toggle("betaFeatures")}
          />
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
