"use client";

import { SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const messages = [
  {
    role: "user",
    text: "Is my HR policy compliant?",
  },
  {
    role: "ai",
    text: "Based on analysis, there are 3 compliance gaps in your HR policy related to retention periods, employee consent handling, and escalation workflow coverage.",
    sources: [
      "GDPR Article 5 - Data Minimization & Storage Limitation",
      "EU Employment Transparency Directive",
      "ISO 27001 Annex A.5.34",
    ],
  },
  {
    role: "user",
    text: "What should I fix first?",
  },
  {
    role: "ai",
    text: "Prioritize updating your retention clause first since it is marked high-severity and directly conflicts with current regulatory retention windows.",
    sources: ["GDPR Article 17 - Right to Erasure", "Local Labor Code Section 11B"],
  },
];

export function AiAssistantPage() {
  return (
    <Card className="flex h-[calc(100vh-8.5rem)] min-h-[560px] flex-col border-slate-800 bg-slate-900/70 text-slate-100">
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
        <CardDescription className="text-slate-400">
          Ask compliance questions and get GraphRAG-backed insights.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-4">
        <ScrollArea className="min-h-0 flex-1 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={[
                  "flex w-full",
                  message.role === "user" ? "justify-end" : "justify-start",
                ].join(" ")}
              >
                <div
                  className={[
                    "max-w-[88%] rounded-xl border px-4 py-3 text-sm leading-relaxed md:max-w-[75%]",
                    message.role === "user"
                      ? "border-cyan-700/60 bg-cyan-900/20 text-cyan-100"
                      : "border-slate-800 bg-slate-900 text-slate-100",
                  ].join(" ")}
                >
                  <p>{message.text}</p>

                  {message.role === "ai" && message.sources ? (
                    <div className="mt-3 border-t border-slate-800 pt-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Sources
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-300">
                        {message.sources.map((source) => (
                          <li key={source}>{source}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 p-2">
          <Input
            placeholder="Ask LexisGraph about your policy compliance..."
            className="h-10 border-slate-700 bg-slate-900 text-slate-100"
          />
          <Button className="h-10 shrink-0" aria-label="Send message">
            <SendHorizontal className="h-4 w-4" />
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}