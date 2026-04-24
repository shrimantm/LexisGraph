import { Bell, Search, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Topbar({
  showUploadButton = true,
  searchPlaceholder = "Search policies, entities, controls...",
  uploadButtonLabel = "Upload Document",
}) {
  return (
    <header className="sticky top-0 z-20 h-16 border-b border-slate-800 bg-slate-950/95 px-3 backdrop-blur md:px-6">
      <div className="flex h-full items-center justify-between gap-3">
        <div className="relative w-full max-w-xl">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            className="h-9 border-slate-700 bg-slate-900/80 pl-8 text-slate-100 placeholder:text-slate-500 focus-visible:border-slate-500"
          />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {showUploadButton ? (
            <Button
              className="hidden h-9 border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800 sm:inline-flex"
              variant="outline"
            >
              <Upload className="h-4 w-4" />
              {uploadButtonLabel}
            </Button>
          ) : null}

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </Button>

          <Avatar size="default" className="border border-slate-700 bg-slate-800">
            <AvatarFallback className="bg-slate-800 text-slate-200">SM</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
