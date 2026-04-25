import { useEffect, useMemo, useState } from "react";
import { FileText, ShieldCheck, AlertTriangle, Clock } from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { safeFetch } from "@/lib/api";
import { MOCK_DASHBOARD_SUMMARY } from "@/lib/mock-data";

const kpiIcons = [
  { icon: FileText, color: "text-blue-400" },
  { icon: ShieldCheck, color: "text-emerald-400" },
  { icon: AlertTriangle, color: "text-rose-400" },
  { icon: Clock, color: "text-amber-400" },
];

export function KpiGrid() {
  const [summary, setSummary] = useState(MOCK_DASHBOARD_SUMMARY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      const { data } = await safeFetch("/dashboard/summary", {}, MOCK_DASHBOARD_SUMMARY);
      setSummary({ ...MOCK_DASHBOARD_SUMMARY, ...(data || {}) });
      setLoading(false);
    }
    fetchSummary();
  }, []);

  const kpis = useMemo(() => ([
    {
      title: "Total Documents",
      value: String(summary.total_documents ?? 0),
      change: null,
      status: "neutral",
    },
    {
      title: "Compliance Score (%)",
      value: `${Math.round(summary.compliance_score ?? 0)}%`,
      change: null,
      status: "positive",
    },
    {
      title: "Alerts Count",
      value: String(summary.alerts_count ?? 0),
      change: null,
      status: "negative",
    },
    {
      title: "System State",
      value: loading ? "Loading..." : "Live",
      change: loading ? null : "Connected",
      status: loading ? "neutral" : "positive",
    },
  ]), [loading, summary]);

  if (loading) {
    return (
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`kpi-skeleton-${i}`}
            className="h-[122px] animate-pulse rounded-2xl border border-white/[0.06] bg-[#0d0f18]"
          />
        ))}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi, i) => (
        <KpiCard
          key={kpi.title}
          title={kpi.title}
          value={kpi.value}
          change={kpi.change}
          status={kpi.status}
          icon={kpiIcons[i]?.icon}
          iconColor={kpiIcons[i]?.color}
        />
      ))}
    </section>
  );
}
