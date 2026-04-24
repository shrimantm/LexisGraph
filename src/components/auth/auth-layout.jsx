import Link from "next/link";

/**
 * Shared wrapper for sign-in / sign-up pages.
 * Provides centered card layout with the LexisGraph brand, ambient glows,
 * and a subtle grid pattern.
 */
export function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#020617] px-4 py-16">
      {/* ── Ambient background effects ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-center radial glow */}
        <div className="absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/15 via-violet-500/8 to-transparent blur-3xl" />
        {/* Bottom-right accent */}
        <div className="absolute -bottom-20 -right-20 h-[350px] w-[350px] rounded-full bg-violet-600/8 blur-3xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ── Card ── */}
      <div className="relative z-10 w-full max-w-[420px]">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/25 transition-shadow group-hover:shadow-blue-500/40">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.636 5.636l2.121 2.121m8.486 8.486l2.121 2.121M5.636 18.364l2.121-2.121m8.486-8.486l2.121-2.121" />
            </svg>
          </div>
          <span className="text-xl font-semibold tracking-tight text-white">
            Lexis<span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Graph</span>
          </span>
        </Link>

        {/* Card container */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0f172a]/80 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
