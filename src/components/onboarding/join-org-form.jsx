"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function JoinOrgForm({ onComplete }) {
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!inviteCode.trim()) {
      setError("Invite code is required");
      return;
    }

    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    onComplete?.({ inviteCode: inviteCode.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Invite Code */}
      <div className="space-y-1.5">
        <label
          htmlFor="invite-code"
          className="block text-xs font-medium text-slate-300"
        >
          Invite Code
        </label>
        <Input
          id="invite-code"
          type="text"
          placeholder="e.g. ORG-XXXX-YYYY"
          value={inviteCode}
          onChange={(e) => {
            setInviteCode(e.target.value.toUpperCase());
            if (error) setError("");
          }}
          className="h-10 rounded-xl border-white/[0.08] bg-white/[0.03] font-mono text-white tracking-wider placeholder:text-slate-500 placeholder:font-sans placeholder:tracking-normal focus-visible:border-blue-500/50 focus-visible:ring-blue-500/20"
          aria-invalid={!!error}
        />
        {error ? (
          <p className="text-xs text-red-400">{error}</p>
        ) : (
          <p className="text-[11px] text-slate-500">
            Ask your admin for the organization invite code
          </p>
        )}
      </div>

      {/* Info box */}
      <div className="rounded-xl border border-blue-500/10 bg-blue-500/[0.04] px-4 py-3">
        <p className="text-xs leading-relaxed text-blue-300/80">
          <span className="font-medium text-blue-300">How it works:</span>{" "}
          Enter the invite code shared by your organization admin. You&apos;ll be
          added as a team member with default permissions.
        </p>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={!inviteCode.trim() || loading}
        className="h-10 w-full gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 border-0 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/35 hover:brightness-110 disabled:opacity-40 disabled:shadow-none"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Joining organization…
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
