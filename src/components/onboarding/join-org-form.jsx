"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Users, CheckCircle2 } from "lucide-react";
import { safeFetch } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function JoinOrgForm({ onComplete }) {
  const [orgCode, setOrgCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const code = orgCode.trim();
    if (!code) {
      setError("Organization code is required");
      return;
    }

    setLoading(true);
    setError("");

    const { data, isDemo: demoMode } = await safeFetch("/org/join", {
      method: "POST",
      body: JSON.stringify({ org_code: code }),
    }, {
      org_id: `org_${code.toLowerCase()}`,
      status: "approved",
    });

    setIsDemo(demoMode);

    if (data) {
      if (demoMode || data.status === "approved") {
        // In demo mode or auto-approved, go straight to dashboard
        onComplete?.(data.org_id || `org_${code.toLowerCase()}`);
      } else {
        setSuccess(true);
      }
    } else {
      setError("Could not join organization. Please try again.");
    }

    setLoading(false);
  }

  if (success) {
    return (
      <div className="space-y-4 rounded-lg border border-emerald-900/40 bg-emerald-950/20 p-4 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-medium text-white">Request Sent!</h3>
          <p className="text-sm text-slate-400">
            Your request to join is pending admin approval. You will be redirected once approved.
          </p>
        </div>
        {isDemo && (
          <Badge className="border-amber-800 bg-amber-900/30 text-amber-300" variant="outline">
            Demo Mode
          </Badge>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="org-code" className="text-sm font-medium text-slate-300">
          Organization Code
        </Label>
        <Input
          id="org-code"
          type="text"
          placeholder="ENTER-CODE"
          value={orgCode}
          onChange={(e) => {
            setOrgCode(e.target.value.toUpperCase());
            if (error) setError("");
          }}
          className="h-11 rounded-lg border-slate-700 bg-slate-800/70 text-white placeholder:text-slate-500 transition-colors duration-200 focus-visible:border-indigo-400 focus-visible:ring-indigo-500/20"
          aria-invalid={!!error}
        />
        <p className="text-xs text-slate-500">
          Ask your organization administrator for the 8-character code.
        </p>
      </div>

      {error ? <p className="text-xs text-red-400">{error}</p> : null}

      <Button
        type="submit"
        disabled={!orgCode.trim() || loading}
        className="mt-4 h-11 w-full gap-2 rounded-lg border-0 bg-linear-to-r from-indigo-500 to-purple-600 text-sm font-medium text-white shadow-lg shadow-indigo-900/40 transition-all duration-200 hover:from-indigo-400 hover:to-purple-500 hover:shadow-xl hover:shadow-indigo-900/60 disabled:opacity-40 disabled:shadow-none"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending request...
          </>
        ) : (
          <>
            <Users className="h-4 w-4" />
            Join Organization
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
