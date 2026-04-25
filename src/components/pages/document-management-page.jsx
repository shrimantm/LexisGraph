"use client";

import { useMemo, useState, useEffect } from "react";
import { FileSearch, Search, UploadCloud, Loader2, Check, AlertCircle } from "lucide-react";
import { safeFetch, safeUpload } from "@/lib/api";
import { cn } from "@/lib/utils";
import { MOCK_DOCUMENTS } from "@/lib/mock-data";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusClasses = {
  completed: "border-emerald-800 bg-emerald-900/30 text-emerald-300",
  processing: "border-blue-800 bg-blue-900/30 text-blue-300",
  pending: "border-amber-800 bg-amber-900/30 text-amber-300",
};

function normalizeDocument(doc) {
  const statusRaw = String(doc?.status || "").toLowerCase();
  const status = statusRaw.includes("process") ? "processing" : statusRaw.includes("complete") ? "completed" : "pending";
  return {
    ...doc,
    _id: doc?._id || doc?.id || `doc_${Date.now()}`,
    file_name: doc?.file_name || doc?.filename || doc?.name || "Untitled",
    status,
    created_at: doc?.created_at || new Date().toISOString(),
    type: doc?.type || "Policy",
  };
}

export function DocumentManagementPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  useEffect(() => {
    async function fetchDocs() {
      const { data, isDemo: demoMode } = await safeFetch("/documents", {}, MOCK_DOCUMENTS);
      const normalized = (Array.isArray(data) ? data : MOCK_DOCUMENTS).map(normalizeDocument);
      setDocuments(normalized);
      setIsDemo(demoMode);
      setLoading(false);
    }
    fetchDocs();
  }, []);

  const filteredDocuments = useMemo(() => {
    const lowered = query.trim().toLowerCase();

    return documents.filter((doc) => {
      const name = doc.file_name || doc.name || "";
      const type = doc.type || "";
      const matchesQuery = lowered.length === 0 || name.toLowerCase().includes(lowered);
      const matchesFilter = filter === "all" || type === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter, documents]);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append("file", file);

    const { data, isDemo: demoMode } = await safeUpload("/upload", formData, {
      _id: `doc_${Date.now()}`,
      file_name: file.name,
      name: file.name,
      type: "Policy",
      status: "processing",
      created_at: new Date().toISOString(),
      lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    });

    if (data) {
      setDocuments((prev) => [normalizeDocument(data), ...prev]);
      setUploadStatus({
        success: true,
        message: demoMode ? "File uploaded (demo mode)" : "File uploaded successfully",
      });
    }

    setUploading(false);
    e.target.value = "";
    setTimeout(() => setUploadStatus(null), 4000);
  }

  if (loading) {
    return (
      <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
        <CardContent className="flex items-center justify-center gap-3 py-16 text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading documents...
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Upload toast */}
      {uploadStatus && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-800/50 bg-emerald-900/20 text-emerald-300 px-4 py-3 text-sm animate-fade-in">
          <Check className="h-4 w-4 shrink-0" />
          <span>{uploadStatus.message}</span>
        </div>
      )}

      <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div>
                <CardTitle>Document Management</CardTitle>
                <CardDescription className="text-slate-400">
                  Upload, process, and track policy and regulation artifacts.
                </CardDescription>
              </div>
              {isDemo && (
                <Badge className="border-amber-800 bg-amber-900/30 text-amber-300 text-[10px]" variant="outline">
                  Demo Mode
                </Badge>
              )}
            </div>

            <div className="relative">
              <input
                type="file"
                id="doc-page-upload"
                className="hidden"
                accept=".pdf"
                onChange={handleUpload}
                disabled={uploading}
              />
              <label
                htmlFor="doc-page-upload"
                className={cn(
                  "inline-flex shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-medium h-9 gap-1.5 px-2.5 cursor-pointer transition-all hover:bg-primary/80",
                  uploading && "pointer-events-none opacity-50"
                )}
              >
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
                Upload
              </label>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1fr_180px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search documents..."
                className="h-9 border-slate-700 bg-slate-950/70 pl-8 text-slate-100"
              />
            </div>

            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="h-9 w-full border-slate-700 bg-slate-950/70 text-slate-100">
                <SelectValue placeholder="Filter type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Policy">Policy</SelectItem>
                <SelectItem value="Regulation">Regulation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/50 p-6 text-center">
            <UploadCloud className="mx-auto h-8 w-8 text-slate-500" />
            <p className="mt-3 text-sm font-medium text-slate-200">
              Drag & drop policy/regulation files here
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Supported: PDF
            </p>
            <label
              htmlFor="doc-page-upload"
              className="inline-flex shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-100 text-sm font-medium h-8 px-2.5 cursor-pointer transition-all hover:bg-slate-800 mt-4"
            >
              Browse Files
            </label>
          </div>

          {filteredDocuments.length > 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-950/60">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800 hover:bg-transparent">
                    <TableHead className="px-4 text-slate-400">Document Name</TableHead>
                    <TableHead className="text-slate-400">Type</TableHead>
                    <TableHead className="text-slate-400">Status</TableHead>
                    <TableHead className="text-slate-400">Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc, i) => {
                    const docName = doc.file_name || doc.name || "Untitled";
                    const docStatus = doc.status || "pending";
                    const docDate = doc.created_at ? new Date(doc.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

                    return (
                      <TableRow
                        key={doc._id || `doc-${i}`}
                        className="border-slate-800 hover:bg-slate-800/50"
                      >
                        <TableCell className="px-4 font-medium text-slate-100">{docName}</TableCell>
                        <TableCell>
                          <Badge className="border-slate-700 bg-slate-900 text-slate-300" variant="outline">
                            {doc.type || "Unknown"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusClasses[docStatus] || statusClasses.pending} variant="outline">
                            {docStatus[0]?.toUpperCase() + docStatus.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-400">{docDate}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-10 text-center">
              <FileSearch className="mx-auto h-8 w-8 text-slate-500" />
              <p className="mt-3 text-sm font-medium text-slate-200">No documents found</p>
              <p className="mt-1 text-xs text-slate-400">
                Try adjusting your search query or filter.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
