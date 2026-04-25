"use client";

import { useState, useRef, useEffect } from "react";
import { getLocalUser, safeFetch } from "@/lib/api";
import { MOCK_CHAT_RESPONSES } from "@/lib/mock-data";
import { Bot, Send, Loader2, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your compliance assistant. Ask me about policies, regulations, or gap analysis.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleSend(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setSending(true);
    const user = getLocalUser();

    const { data } = await safeFetch("/ai/chat", {
      method: "POST",
      body: JSON.stringify({
        message: text,
        user_id: user?.user_id,
        org_id: user?.org_id,
      }),
    }, null);

    const reply = data?.response || MOCK_CHAT_RESPONSES[Math.floor(Math.random() * MOCK_CHAT_RESPONSES.length)];

    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    setSending(false);
  }

  return (
    <div className="card-hover flex flex-col rounded-2xl border border-white/[0.06] bg-[#0d0f18]">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 pt-5 pb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
          <Bot className="h-4 w-4 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-[14px] font-semibold text-white">AI Assistant</h3>
          <p className="text-[12px] text-slate-500">Compliance chat</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 space-y-3 max-h-[260px]">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex gap-2.5", msg.role === "user" && "flex-row-reverse")}>
            {/* Avatar */}
            <div className={cn(
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold",
              msg.role === "assistant"
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-blue-500/15 text-blue-400"
            )}>
              {msg.role === "assistant" ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />}
            </div>

            {/* Bubble */}
            <div className={cn(
              "max-w-[80%] rounded-xl px-3 py-2 text-[13px] leading-relaxed",
              msg.role === "assistant"
                ? "bg-white/[0.04] text-slate-300"
                : "bg-blue-600/20 text-blue-100"
            )}>
              {msg.content}
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex gap-2.5">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <Bot className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-white/[0.04] px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="px-5 pb-5 pt-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about compliance..."
            className="flex-1 bg-transparent text-[13px] text-slate-200 placeholder:text-slate-600 outline-none"
            disabled={sending}
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
              input.trim()
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-white/[0.04] text-slate-600"
            )}
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
