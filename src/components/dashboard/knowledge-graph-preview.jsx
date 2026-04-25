import { GitBranch, Expand } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function KnowledgeGraphPreview() {
  return (
    <div className="card-hover rounded-2xl border border-white/[0.06] bg-[#0d0f18]">
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10">
            <GitBranch className="h-4 w-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-white">Knowledge Graph</h3>
            <p className="text-[12px] text-slate-500">GraphRAG visualization</p>
          </div>
        </div>
        <Badge className="border-cyan-800/50 bg-cyan-500/10 text-cyan-400 text-[10px]" variant="outline">
          GraphRAG
        </Badge>
      </div>

      <div className="px-5 pb-5">
        <div className="relative h-[280px] rounded-xl border border-white/[0.04] bg-slate-950/80 overflow-hidden">
          {/* Dot grid */}
          <div className="absolute inset-0 dot-grid" />

          {/* Simulated nodes */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Center node */}
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500/30 to-violet-500/30 ring-2 ring-blue-500/20 flex items-center justify-center">
                <span className="text-[10px] font-bold text-blue-300">GDPR</span>
              </div>

              {/* Connecting nodes */}
              {[
                { x: -90, y: -60, label: "Art.5", color: "from-emerald-500/30 to-teal-500/30 ring-emerald-500/20" },
                { x: 85, y: -45, label: "Art.15", color: "from-amber-500/30 to-orange-500/30 ring-amber-500/20" },
                { x: -80, y: 55, label: "HR", color: "from-violet-500/30 to-purple-500/30 ring-violet-500/20" },
                { x: 95, y: 50, label: "SOC2", color: "from-rose-500/30 to-pink-500/30 ring-rose-500/20" },
                { x: 0, y: -85, label: "ISO", color: "from-cyan-500/30 to-sky-500/30 ring-cyan-500/20" },
              ].map((node) => (
                <div key={node.label} className="absolute" style={{ left: node.x, top: node.y }}>
                  <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${node.color} ring-1 flex items-center justify-center`}>
                    <span className="text-[8px] font-bold text-slate-200">{node.label}</span>
                  </div>
                </div>
              ))}

              {/* Decorative lines */}
              <svg className="absolute -inset-24 pointer-events-none" viewBox="-120 -100 240 200">
                {[[-90,-60], [85,-45], [-80,55], [95,50], [0,-85]].map(([x,y], i) => (
                  <line key={i} x1="0" y1="0" x2={x} y2={y} stroke="rgba(148,163,184,0.1)" strokeWidth="1" />
                ))}
              </svg>
            </div>
          </div>

          {/* Expand button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 h-7 w-7 text-slate-500 hover:text-slate-300 hover:bg-white/[0.06]"
          >
            <Expand className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}