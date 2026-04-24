"use client";

import { useMemo, useState } from "react";
import { FileSearch, Search, UploadCloud } from "lucide-react";

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

const documents = [
  {
    name: "Employee Conduct Policy 2026",
    type: "Policy",
    status: "Processed",
    lastUpdated: "Apr 23, 2026",
  },
  {
    name: "Vendor Data Handling Standard",
    type: "Policy",
    status: "Pending",
    lastUpdated: "Apr 22, 2026",
  },
  {
    name: "GDPR Article 5 Guidance",
    type: "Regulation",
    status: "Processed",
    lastUpdated: "Apr 20, 2026",
  },
  {
    name: "SOC2 Change Notice Q2",
    type: "Regulation",
    status: "Pending",
    lastUpdated: "Apr 19, 2026",
  },
];

const statusClasses = {
  Processed: "border-emerald-800 bg-emerald-900/30 text-emerald-300",
  Pending: "border-amber-800 bg-amber-900/30 text-amber-300",
};

export function DocumentManagementPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredDocuments = useMemo(() => {
    const lowered = query.trim().toLowerCase();

    return documents.filter((doc) => {
      const matchesQuery =
        lowered.length === 0 || doc.name.toLowerCase().includes(lowered);
      const matchesFilter = filter === "all" || doc.type === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <Card className="border-slate-800 bg-slate-900/70 text-slate-100">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Document Management</CardTitle>
            <CardDescription className="text-slate-400">
              Upload, process, and track policy and regulation artifacts.
            </CardDescription>
          </div>

          <Button className="h-9">
            <UploadCloud className="h-4 w-4" />
            Upload
          </Button>
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
            Supported: PDF, DOCX, TXT
          </p>
          <Button variant="outline" className="mt-4 border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800">
            Browse Files
          </Button>
        </div>

        {filteredDocuments.length > 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-950/60">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800 hover:bg-transparent">
                  <TableHead className="px-4 text-slate-400">Document Name</TableHead>
                  <TableHead className="text-slate-400">Type</TableHead>
                  <TableHead className="text-slate-400">Status</TableHead>
                  <TableHead className="text-slate-400">Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow
                    key={`${doc.name}-${doc.lastUpdated}`}
                    className="border-slate-800 hover:bg-slate-800/50"
                  >
                    <TableCell className="px-4 font-medium text-slate-100">{doc.name}</TableCell>
                    <TableCell>
                      <Badge className="border-slate-700 bg-slate-900 text-slate-300" variant="outline">
                        {doc.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusClasses[doc.status]} variant="outline">
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-400">{doc.lastUpdated}</TableCell>
                  </TableRow>
                ))}
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
  );
}