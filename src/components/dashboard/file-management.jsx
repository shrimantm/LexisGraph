"use client";

import { useState, useEffect } from "react";
import { safeFetch, safeUpload } from "@/lib/api";
import { MOCK_DOCUMENTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Upload, FileText, Loader2, Check, X,
  ChevronRight, Download, Eye, AlertCircle, FolderUp
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusConfig = {
  completed: { dot: "bg-emerald-400", text: "text-emerald-400", bg: "bg-emerald-500/10" },
  processing: { dot: "bg-blue-400 animate-pulse", text: "text-blue-400", bg: "bg-blue-500/10" },
  pending: { dot: "bg-amber-400", text: "text-amber-400", bg: "bg-amber-500/10" },
  failed: { dot: "bg-rose-400", text: "text-rose-400", bg: "bg-rose-500/10" },
};

function normalizeDocument(doc) {
  const statusRaw = String(doc?.status || "").toLowerCase();
  const status = statusRaw.includes("process") ? "processing" : statusRaw.includes("complete") ? "completed" : "pending";
  return {
    ...doc,
    _id: doc?._id || doc?.id || `doc_${Date.now()}`,
    file_name: doc?.file_name || doc?.filename || doc?.name || "Untitled",
    type: doc?.type || "Policy",
    status,
  };
}

export function FileManagement() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  useEffect(() => {
    async function fetchDocs() {
      const { data, isDemo: demoMode } = await safeFetch("/documents", {}, MOCK_DOCUMENTS);
      setDocuments((Array.isArray(data) ? data : MOCK_DOCUMENTS).map(normalizeDocument));
      setIsDemo(demoMode);
      setLoading(false);
    }
    fetchDocs();
  }, []);

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
      type: "Policy",
      status: "processing",
      created_at: new Date().toISOString(),
      pages: "—",
      size: `${(file.size / 1024).toFixed(0)} KB`,
    });

    if (data) {
      setDocuments((prev) => [normalizeDocument(data), ...prev]);
      setUploadStatus(demoMode ? "Uploaded (demo mode)" : "Uploaded successfully");
    }

    setUploading(false);
    e.target.value = "";
    setTimeout(() => setUploadStatus(null), 4000);
  }

  return (
    <div className="card-hover rounded-2xl border border-white/[0.06] bg-[#0d0f18]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
            <FolderUp className="h-4 w-4 text-blue-400" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-white">Documents</h3>
            <p className="text-[12px] text-slate-500">
              {documents.length} file{documents.length !== 1 ? "s" : ""}
              {isDemo && " · Demo Mode"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf"
            onChange={handleUpload}
            disabled={uploading}
          />
          <label
            htmlFor="file-upload"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-[12px] font-medium text-white cursor-pointer transition-all hover:bg-blue-500",
              uploading && "pointer-events-none opacity-50"
            )}
          >
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            Upload
          </label>
        </div>
      </div>

      {/* Upload toast */}
      {uploadStatus && (
        <div className="mx-5 mb-3 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-[12px] text-emerald-400">
          <Check className="h-3.5 w-3.5 shrink-0" />
          <span>{uploadStatus}</span>
        </div>
      )}

      {/* Content */}
      <div className="px-5 pb-5">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-[13px]">Loading documents...</span>
          </div>
        ) : documents.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] p-8 text-center">
            <FileText className="mx-auto h-8 w-8 text-slate-600" />
            <p className="mt-3 text-[13px] font-medium text-slate-300">No documents yet</p>
            <p className="mt-1 text-[12px] text-slate-500">Upload your first policy to begin analysis.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {documents.slice(0, 6).map((doc) => {
              const config = statusConfig[doc.status] || statusConfig.pending;
              return (
                <div
                  key={doc._id}
                  className="group flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.03]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                      <FileText className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium text-slate-200">{doc.file_name}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                        <span>{doc.type}</span>
                        <span className="h-0.5 w-0.5 rounded-full bg-slate-700" />
                        <span>{doc.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
                      <span className={cn("text-[11px] font-medium", config.text)}>
                        {doc.status?.[0]?.toUpperCase() + doc.status?.slice(1)}
                      </span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-700 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
