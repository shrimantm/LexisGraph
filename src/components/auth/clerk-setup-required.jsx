import { AlertTriangle, ExternalLink, Key } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ClerkSetupRequired() {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-8 text-center backdrop-blur-xl">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h2 className="text-xl font-bold text-white">Clerk Keys Required</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        To enable authentication, you need to add your Clerk API keys to the <code className="rounded bg-white/10 px-1 py-0.5 text-blue-300">.env.local</code> file.
      </p>
      
      <div className="mt-6 space-y-3">
        <div className="flex items-start gap-3 rounded-lg bg-black/20 p-3 text-left">
          <Key className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
          <div className="text-[11px] font-mono text-slate-400 break-all">
            NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...<br/>
            CLERK_SECRET_KEY=sk_test_...
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <a
          href="https://dashboard.clerk.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold text-sm h-8 px-2.5 transition-all"
        >
            Get Keys from Clerk Dashboard
            <ExternalLink className="ml-2 h-4 w-4" />
        </a>
        <Button 
          variant="ghost" 
          className="text-slate-500 hover:text-slate-300"
          onClick={() => window.location.href = '/'}
        >
          Back to Landing Page
        </Button>
      </div>
    </div>
  );
}
