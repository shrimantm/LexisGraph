"use client";

import { useState } from "react";
import { Building2, ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const industries = [
  "Financial Services",
  "Healthcare & Pharma",
  "Technology & Software",
  "Insurance",
  "Energy & Utilities",
  "Manufacturing",
  "Government & Public Sector",
  "Legal Services",
  "Consulting",
  "Other",
];

const companySizes = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–1,000 employees",
  "1,001–5,000 employees",
  "5,001+ employees",
];

export function CreateOrgForm({ onComplete }) {
  const [form, setForm] = useState({
    companyName: "",
    industry: "",
    companySize: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validate() {
    const errs = {};
    if (!form.companyName.trim()) errs.companyName = "Company name is required";
    if (!form.industry) errs.industry = "Please select an industry";
    if (!form.companySize) errs.companySize = "Please select company size";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    onComplete?.(form);
  }

  const isDisabled = !form.companyName || !form.industry || !form.companySize || loading;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Company Name */}
      <div className="space-y-1.5">
        <label
          htmlFor="org-name"
          className="block text-xs font-medium text-slate-300"
        >
          Company Name
        </label>
        <Input
          id="org-name"
          type="text"
          placeholder="Acme Corporation"
          value={form.companyName}
          onChange={(e) => update("companyName", e.target.value)}
          className="h-10 rounded-xl border-white/[0.08] bg-white/[0.03] text-white placeholder:text-slate-500 focus-visible:border-blue-500/50 focus-visible:ring-blue-500/20"
          aria-invalid={!!errors.companyName}
        />
        {errors.companyName ? (
          <p className="text-xs text-red-400">{errors.companyName}</p>
        ) : (
          <p className="text-[11px] text-slate-500">
            This will be your organization&apos;s display name
          </p>
        )}
      </div>

      {/* Industry */}
      <div className="space-y-1.5">
        <label
          htmlFor="org-industry"
          className="block text-xs font-medium text-slate-300"
        >
          Industry
        </label>
        <div className="relative">
          <select
            id="org-industry"
            value={form.industry}
            onChange={(e) => update("industry", e.target.value)}
            className="h-10 w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 pr-8 text-sm text-white outline-none transition-colors focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 [&>option]:bg-[#0f172a] [&>option]:text-white"
            aria-invalid={!!errors.industry}
          >
            <option value="" disabled className="text-slate-500">
              Select industry
            </option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {errors.industry && (
          <p className="text-xs text-red-400">{errors.industry}</p>
        )}
      </div>

      {/* Company Size */}
      <div className="space-y-1.5">
        <label
          htmlFor="org-size"
          className="block text-xs font-medium text-slate-300"
        >
          Company Size
        </label>
        <div className="relative">
          <select
            id="org-size"
            value={form.companySize}
            onChange={(e) => update("companySize", e.target.value)}
            className="h-10 w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 pr-8 text-sm text-white outline-none transition-colors focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 [&>option]:bg-[#0f172a] [&>option]:text-white"
            aria-invalid={!!errors.companySize}
          >
            <option value="" disabled className="text-slate-500">
              Select company size
            </option>
            {companySizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {errors.companySize && (
          <p className="text-xs text-red-400">{errors.companySize}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isDisabled}
        className="h-10 w-full gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 border-0 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/35 hover:brightness-110 disabled:opacity-40 disabled:shadow-none"
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
