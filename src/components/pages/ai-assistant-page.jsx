"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizontal, Loader2, Bot, Sparkles } from "lucide-react";
import { getLocalUser, safeFetch } from "@/lib/api";
import { MOCK_CHAT_RESPONSES } from "@/lib/mock-data";

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
import { Badge } from "@/components/ui/badge";

const starterMessages = [
  {
    role: "ai",
    text: "Welcome to the LexisGraph AI Assistant. I can help you analyze policy compliance, identify legal gaps, and answer regulatory questions. How can I assist you today?",
    sources: [],
  },
];

const suggestedQuestions = [
  "Is my HR policy GDPR compliant?",
  "What gaps exist in our vendor risk policy?",
  "Summarize recent compliance alerts",
  "What should I fix first in our data privacy policy?",
];

export function AiAssistantPage() {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const scrollRef = useRef(null);
  const mockIndex = useRef(0);

  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  async function handleSend(e, overrideQuery) {
    e?.preventDefault();
    const query = (overrideQuery || input).trim();
    if (!query || sending) return;

    setInput("");
    setSending(true);
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    const user = getLocalUser();

    const { data, isDemo: demoMode } = await safeFetch("/ai/chat", {
      method: "POST",
      body: JSON.stringify({
        message: query,
        user_id: user?.user_id,
        org_id: user?.org_id,
      }),
    }, {
      response: MOCK_CHAT_RESPONSES[mockIndex.current % MOCK_CHAT_RESPONSES.length],
      sources: [
        "GDPR Article 5 – Data Minimization & Storage Limitation",
        "EU Employment Transparency Directive",
        "ISO 27001 Annex A.5.34",
      ],
    });

    mockIndex.current += 1;
    setIsDemo(demoMode);

    const aiText = data?.response || data?.text || MOCK_CHAT_RESPONSES[0];
    const sources = data?.sources || [];

    setMessages((prev) => [
      ...prev,
      { role: "ai", text: aiText, sources, isDemo: demoMode },
    ]);

    setSending(false);
  }

  return (
    <Card className="flex h-[calc(100vh-8.5rem)] min-h-[560px] flex-col border-slate-800 bg-slate-900/70 text-slate-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription className="text-slate-400">
                Ask compliance questions and get GraphRAG-backed insights.
              </CardDescription>
            </div>
          </div>
          {isDemo && (
            <Badge className="border-amber-800 bg-amber-900/30 text-amber-300" variant="outline">
              Demo Mode
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-4">
        <ScrollArea className="min-h-0 flex-1 rounded-xl border border-slate-800 bg-slate-950/60 p-4" ref={scrollRef}>
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

                  {message.role === "ai" && message.sources && message.sources.length > 0 && (
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
                  )}

                  {message.isDemo && (
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-400/70">
                      <Sparkles className="h-3 w-3" />
                      Demo response
                    </div>
                  )}
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex justify-start">
                <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggested questions (show only if no user messages yet) */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={(e) => handleSend(e, q)}
                className="rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-cyan-700/50 hover:bg-cyan-900/10 hover:text-cyan-300"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSend} className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 p-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask LexisGraph about your policy compliance..."
            className="h-10 border-slate-700 bg-slate-900 text-slate-100"
            disabled={sending}
          />
          <Button className="h-10 shrink-0" aria-label="Send message" type="submit" disabled={!input.trim() || sending}>
            <SendHorizontal className="h-4 w-4" />
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
