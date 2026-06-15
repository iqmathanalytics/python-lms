"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, Eye, EyeOff, ChevronDown, ChevronUp, Trash2, Loader2, AlertCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface GroqChatPlaygroundProps {
  defaultSystemPrompt?: string;
}

const STORAGE_KEY = "groq-playground-api-key";
const MODELS = [
  { id: "llama3-70b-8192",    label: "LLaMA 3 70B (best)" },
  { id: "llama3-8b-8192",     label: "LLaMA 3 8B (fastest)" },
  { id: "mixtral-8x7b-32768", label: "Mixtral 8x7B (long context)" },
];

export function GroqChatPlayground({ defaultSystemPrompt = "You are a helpful assistant." }: GroqChatPlaygroundProps) {
  const [apiKey, setApiKey]           = useState("");
  const [showKey, setShowKey]         = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(defaultSystemPrompt);
  const [showSystem, setShowSystem]   = useState(false);
  const [model, setModel]             = useState(MODELS[0].id);
  const [messages, setMessages]       = useState<Message[]>([]);
  const [input, setInput]             = useState("");
  const [streaming, setStreaming]     = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);

  // Persist API key in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setApiKey(saved);
    } catch { /* ignore */ }
  }, []);

  const saveApiKey = (val: string) => {
    setApiKey(val);
    try { localStorage.setItem(STORAGE_KEY, val); } catch { /* ignore */ }
  };

  // Auto-scroll to newest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || streaming) return;
    if (!apiKey.trim()) {
      setError("Enter your Groq API key above first.");
      return;
    }
    setError(null);
    setInput("");

    const newUserMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setStreaming(true);

    // Placeholder for streaming reply
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const apiMessages = [
        { role: "system" as const, content: systemPrompt },
        ...updatedMessages.map((m) => ({ role: m.role, content: m.content })),
      ];

      const res = await fetch("/api/groq-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, messages: apiMessages, model }),
      });

      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        throw new Error(json.error ?? `HTTP ${res.status}`);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No response body");

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") break;
          try {
            const parsed = JSON.parse(data) as { content?: string; error?: string };
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.content) {
              setMessages((prev) => {
                const next = [...prev];
                const last = next[next.length - 1];
                if (last?.role === "assistant") {
                  next[next.length - 1] = { ...last, content: last.content + parsed.content };
                }
                return next;
              });
            }
          } catch (e) {
            if (e instanceof Error && e.message !== "Unexpected end of JSON input") throw e;
          }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
      // Remove the empty assistant placeholder if we errored before any content
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.content === "") {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setStreaming(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0 rounded-xl border border-gray-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 bg-violet-50 px-4 py-2.5">
        <Bot className="h-4 w-4 text-violet-600" />
        <span className="text-sm font-semibold text-violet-900">Groq Chatbot Playground</span>
        <span className="ml-auto text-xs text-violet-500">Live — your key, your usage</span>
      </div>

      {/* API key + settings */}
      <div className="border-b border-gray-100 bg-gray-50 px-4 py-3 space-y-2">
        {/* API key row */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => saveApiKey(e.target.value)}
              placeholder="Paste your Groq API key (gsk_...)"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 pr-9 text-xs font-mono text-gray-800 placeholder-gray-400 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-300"
            />
            <button
              type="button"
              onClick={() => setShowKey((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
          <a
            href="https://console.groq.com/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-700"
          >
            Get key
          </a>
        </div>

        {/* Model picker */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 shrink-0">Model:</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 focus:border-violet-300 focus:outline-none"
          >
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </div>

        {/* Collapsible system prompt */}
        <button
          type="button"
          onClick={() => setShowSystem((s) => !s)}
          className="flex w-full items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
        >
          {showSystem ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          System prompt
          {systemPrompt !== defaultSystemPrompt && (
            <span className="ml-1 rounded-full bg-violet-100 px-1.5 py-0.5 text-violet-700">custom</span>
          )}
        </button>
        {showSystem && (
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-200 bg-white p-2 text-xs text-gray-700 focus:border-violet-300 focus:outline-none resize-none"
          />
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto min-h-0 px-4 py-3 space-y-3 [scrollbar-width:thin]">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 py-6">
            <Bot className="h-8 w-8 mb-2 text-gray-300" />
            <p className="text-sm">Enter your API key and start chatting.</p>
            <p className="text-xs mt-1">Press Enter to send, Shift+Enter for newline.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="mt-1 shrink-0 rounded-full bg-violet-100 p-1">
                <Bot className="h-3.5 w-3.5 text-violet-600" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-violet-600 text-white rounded-br-sm"
                  : "bg-gray-100 text-gray-800 rounded-bl-sm"
              }`}
            >
              {msg.content}
              {msg.role === "assistant" && msg.content === "" && streaming && (
                <span className="inline-flex items-center gap-1 text-gray-400">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span className="text-xs">Thinking…</span>
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="mx-4 mb-2 flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
          <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {/* Input row */}
      <div className="border-t border-gray-200 px-3 py-2 flex items-end gap-2">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={streaming}
          placeholder="Type a message…"
          rows={1}
          className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-300 disabled:opacity-50 max-h-28 overflow-y-auto"
          style={{ minHeight: "38px" }}
        />
        <button
          type="button"
          onClick={() => void sendMessage()}
          disabled={streaming || !input.trim()}
          className="rounded-xl bg-violet-600 p-2.5 text-white transition hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {streaming
            ? <Loader2 className="h-4 w-4 animate-spin" />
            : <Send className="h-4 w-4" />
          }
        </button>
        {messages.length > 0 && !streaming && (
          <button
            type="button"
            onClick={() => setMessages([])}
            title="Clear chat"
            className="rounded-xl border border-gray-200 p-2.5 text-gray-400 hover:text-red-500 hover:border-red-200 transition"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
