"use client";

import { useState } from "react";
import { Building2, ArrowRight, Loader2 } from "lucide-react";
import { safeFetch } from "@/lib/api";
import { MOCK_ORG } from "@/lib/mock-data";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function CreateOrgForm({ onComplete }) {
  const [organizationName, setOrganizationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDemo, setIsDemo] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const name = organizationName.trim();
    if (!name) {
      setError("Organization name is required");
      return;
    }

    setLoading(true);
    setError("");

    const { data, isDemo: demoMode } = await safeFetch("/org/create", {
      method: "POST",
      body: JSON.stringify({ name }),
    }, {
      ...MOCK_ORG,
      _id: `org_${Date.now()}`,
      name,
    });

    setIsDemo(demoMode);

    if (data) {
      onComplete?.(data._id);
    } else {
      setError("Could not create organization. Please try again.");
    }

    setLoading(false);
  }

  const isDisabled = !organizationName.trim() || loading;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="org-name" className="text-sm font-medium text-slate-300">
          Organization Name
        </Label>
        <Input
          id="org-name"
          type="text"
          placeholder="Acme Legal"
          value={organizationName}
          onChange={(e) => {
            setOrganizationName(e.target.value);
            if (error) setError("");
          }}
          className="h-11 rounded-lg border-slate-700 bg-slate-800/70 text-white placeholder:text-slate-500 transition-colors duration-200 focus-visible:border-indigo-400 focus-visible:ring-indigo-500/20"
          aria-invalid={!!error}
        />
        <p className="text-xs text-slate-500">
          This will be your company workspace inside LexisGraph.
        </p>
      </div>

      {error ? <p className="text-xs text-red-400">{error}</p> : null}

      {isDemo && (
        <Badge className="border-amber-800 bg-amber-900/30 text-amber-300" variant="outline">
          Demo Mode
        </Badge>
      )}

      <Button
        type="submit"
        disabled={isDisabled}
        className="mt-4 h-11 w-full gap-2 rounded-lg border-0 bg-linear-to-r from-indigo-500 to-purple-600 text-sm font-medium text-white shadow-lg shadow-indigo-900/40 transition-all duration-200 hover:from-indigo-400 hover:to-purple-500 hover:shadow-xl hover:shadow-indigo-900/60 disabled:opacity-40 disabled:shadow-none"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating organization…
          </>
        ) : (
          <>
            <Building2 className="h-4 w-4" />
            Create Organization
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
