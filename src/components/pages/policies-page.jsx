"use client";

import { useState, useEffect, useMemo } from "react";
import { safeFetch, safeUpload } from "@/lib/api";
import { cn } from "@/lib/utils";
import { MOCK_POLICIES } from "@/lib/mock-data";
import {
  Shield, Upload, Loader2, Check, Search,
  FileText, AlertCircle, ChevronRight
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

const statusClasses = {
  completed: "border-emerald-800 bg-emerald-900/30 text-emerald-300",
  processing: "border-amber-800 bg-amber-900/30 text-amber-300",
  draft: "border-blue-800 bg-blue-900/30 text-blue-300",
  archived: "border-slate-700 bg-slate-900 text-slate-500",
};

function normalizePolicy(item) {
  const statusRaw = String(item?.status || "").toLowerCase();
  const status = statusRaw.includes("process")
    ? "processing"
    : statusRaw.includes("active") || statusRaw.includes("complete")
      ? "completed"
      : statusRaw.includes("archive")
        ? "archived"
        : "draft";
  return {
    _id: item?._id || item?.id || `pol_${Date.now()}`,
    name: item?.name || item?.file_name || item?.filename || "Untitled Policy",
    version: item?.version || "1.0",
    status,
    owner: item?.owner || "Compliance Team",
    complianceScore: Number(item?.complianceScore || 0),
    lastReviewed: item?.lastReviewed || (item?.created_at
      ? new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })),
  };
}

function ScoreRing({ score }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 90 ? "#34d399" : score >= 75 ? "#fbbf24" : "#f87171";

  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      <svg className="absolute" width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={radius} fill="none" stroke="#1e293b" strokeWidth="3" />
        <circle
          cx="24" cy="24" r={radius} fill="none"
          stroke={color} strokeWidth="3" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          transform="rotate(-90 24 24)"
          className="transition-all duration-700"
        />
      </svg>
      <span className="text-xs font-bold" style={{ color }}>{score}%</span>
    </div>
  );
}

export function PoliciesPage() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [query, setQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  useEffect(() => {
    async function fetchPolicies() {
      const { data, isDemo: demoMode } = await safeFetch("/policies", {}, MOCK_POLICIES);
      setPolicies((Array.isArray(data) ? data : MOCK_POLICIES).map(normalizePolicy));
      setIsDemo(demoMode);
      setLoading(false);
    }
    fetchPolicies();
  }, []);

  const filteredPolicies = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return policies;
    return policies.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.owner.toLowerCase().includes(q)
    );
  }, [query, policies]);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append("file", file);

    const { data, isDemo: demoMode } = await safeUpload("/policies/upload", formData, {
      _id: `pol_${Date.now()}`,
      file_name: file.name,
      status: "processing",
      created_at: new Date().toISOString(),
      owner: "You",
      complianceScore: 0,
    });

    if (data) {
      setPolicies((prev) => [normalizePolicy(data), ...prev]);
      setUploadStatus(demoMode ? "Policy uploaded (demo mode)" : "Policy uploaded successfully");
    }

    setUploading(false);
    e.target.value = "";
    setTimeout(() => setUploadStatus(null), 4000);
  }

  const activeCount = policies.filter((p) => p.status === "completed").length;
  const avgScore = policies.length
    ? Math.round(policies.reduce((s, p) => s + (p.complianceScore || 0), 0) / policies.length)
    : 0;

  if (loading) {
    return (
      <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
        <CardContent className="flex items-center justify-center gap-3 py-16 text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading policies...
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Upload toast */}
      {uploadStatus && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-800/50 bg-emerald-900/20 text-emerald-300 px-4 py-3 text-sm animate-fade-in">
          <Check className="h-4 w-4 shrink-0" />
          <span>{uploadStatus}</span>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{policies.length}</p>
              <p className="text-xs text-slate-400">Total Policies</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeCount}</p>
              <p className="text-xs text-slate-400">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
          <CardContent className="flex items-center gap-3 p-4">
            <ScoreRing score={avgScore} />
            <div>
              <p className="text-sm font-semibold text-slate-200">Avg. Score</p>
              <p className="text-xs text-slate-400">Compliance</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main card */}
      <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div>
                <CardTitle>Company Policies</CardTitle>
                <CardDescription className="text-slate-400">
                  Upload, track, and manage internal compliance policies.
                </CardDescription>
              </div>
              {isDemo && (
                <Badge className="border-amber-800 bg-amber-900/30 text-amber-300 text-[10px]" variant="outline">
                  Demo Mode
                </Badge>
              )}
            </div>
            <div className="relative">
              <input
                type="file"
                id="policy-upload"
                className="hidden"
                accept=".pdf"
                onChange={handleUpload}
                disabled={uploading}
              />
              <label
                htmlFor="policy-upload"
                className={cn(
                  "inline-flex shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-medium h-9 gap-1.5 px-3 cursor-pointer transition-all hover:bg-primary/80",
                  uploading && "pointer-events-none opacity-50"
                )}
              >
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                Upload Policy
              </label>
            </div>
          </div>

          {/* Search */}
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search policies..."
              className="h-9 border-slate-700 bg-slate-950/70 pl-8 text-slate-100"
            />
          </div>
        </CardHeader>

        <CardContent>
          {filteredPolicies.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-10 text-center">
              <Shield className="mx-auto h-8 w-8 text-slate-500" />
              <p className="mt-3 text-sm font-medium text-slate-200">No policies found</p>
              <p className="mt-1 text-xs text-slate-400">Upload your first policy to begin.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPolicies.map((pol) => (
                <div
                  key={pol._id}
                  className="group flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-4">
                    <ScoreRing score={pol.complianceScore} />
                    <div>
                      <p className="text-sm font-medium text-slate-200">{pol.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        <span>v{pol.version}</span>
                        <span>•</span>
                        <span>{pol.owner}</span>
                        <span>•</span>
                        <span>Reviewed: {pol.lastReviewed}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={statusClasses[pol.status] || statusClasses.draft} variant="outline">
                      {pol.status[0]?.toUpperCase() + pol.status.slice(1)}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-slate-600 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
