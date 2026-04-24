import { kpis } from "@/components/dashboard/dashboard-data";
import { KpiCard } from "@/components/dashboard/kpi-card";

export function KpiGrid() {
  return (
    <section className="grid grid-cols-12 gap-4">
      {kpis.map((kpi) => (
        <div key={kpi.title} className="col-span-12 sm:col-span-6 xl:col-span-3">
          <KpiCard
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            status={kpi.status}
          />
        </div>
      ))}
    </section>
  );
}