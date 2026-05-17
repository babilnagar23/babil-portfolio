"use client";

import { useState } from "react";
import { FiSend } from "react-icons/fi";

interface Message {
  role: "user" | "ai" | "error";
  text: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const msg = input.trim();
    if (!msg || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "error",
          text: "Backend offline. Run: cd backend && .\\run.ps1",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside
      className="fixed bottom-5 right-5 w-80 card-glass rounded-2xl z-[9999] shadow-glow overflow-hidden"
      aria-label="AI chat assistant"
    >
      <header className="px-4 py-3 bg-gradient-brand text-bright font-semibold text-sm">
        Ask Babil AI
      </header>
      <div className="h-[220px] overflow-y-auto p-3 text-sm space-y-2">
        {messages.length === 0 && (
          <p className="text-dim text-xs">Ask about my skills, projects, or experience.</p>
        )}
        {messages.map((m, i) => (
          <p key={i} className={m.role === "error" ? "text-red-400" : "text-txt"}>
            <strong className="text-bright">{m.role === "user" ? "You" : "AI"}:</strong> {m.text}
          </p>
        ))}
        {loading && <p className="text-dim text-xs">Thinking...</p>}
      </div>
      <div className="flex border-t border-white/[0.06]">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about me..."
          className="flex-1 p-3 bg-transparent border-none text-bright focus:outline-none text-sm"
        />
        <button
          type="button"
          onClick={sendMessage}
          disabled={loading}
          className="px-4 text-accent hover:text-bright transition-colors disabled:opacity-50 bg-transparent border-none cursor-pointer"
          aria-label="Send"
        >
          <FiSend />
        </button>
      </div>
    </aside>
  );
}
