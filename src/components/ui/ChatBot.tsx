"use client";

import { PointerEvent, useCallback, useEffect, useRef, useState } from "react";
import { FiSend, FiX } from "react-icons/fi";
import { useSplash } from "@/components/providers/SplashProvider";

interface Message {
  role: "user" | "ai" | "error";
  text: string;
}

const WIDGET_SIZE = 430;
const ICON_SIZE = 62;
const EDGE_GAP = 20;
const BOTTOM_MARGIN = 24;

const getBasicPortfolioReply = (query: string) => {
  const q = query.toLowerCase().trim();

  if (/^(hi+|hey|hello|namaste)(\s|$|!|\.)/.test(q)) {
    return "Welcome to Babil Nagar's portfolio. What would you like to know about him?";
  }

  if (/^(10|10th|tenth)(\s|$)/.test(q) || q.includes("class 10") || q.includes("class x")) {
    return "Babil's Class X CBSE percentage is 81.5%.";
  }

  if (/^(12|12th|twelfth)(\s|$)/.test(q) || q.includes("class 12") || q.includes("class xii")) {
    return "Babil's Class XII CBSE percentage is 71.2%.";
  }

  if (q.includes("cgpa") || q.includes("gpa")) {
    return "Babil's current CGPA is 8.21 at VIT Bhopal University.";
  }

  if (q.includes("skill") || q.includes("tech") || q.includes("stack")) {
    return (
      "Babil's skills include Java, Python, JavaScript, TypeScript, React, Next.js, " +
      "Django, Flask, Node.js, Tailwind, Docker, Git, Jupyter, Pandas, and Scikit-learn."
    );
  }

  if (q.includes("experience") || q.includes("experienced")) {
    return (
      "Babil has experience in full-stack development, ML projects, open-source " +
      "contribution, campus leadership, and event organization."
    );
  }

  if (q.includes("what can") || q.includes("can you do") || q.includes("what do you do") || q.includes("build")) {
    return (
      "Babil can build full-stack web apps, React/Next.js frontends, Django/Flask " +
      "backends, REST APIs, ML tools, and data analysis projects."
    );
  }

  if (/\b(hire|recruit|shortlist)\b/.test(q)) {
    return (
      "Obviously, Babil Nagar has experience in full-stack and ML projects, " +
      "so you should definitely hire him."
    );
  }

  if (q.includes("anoushka")) {
    return "Kahani Hai Ji 🙃";
  }

  return null;
};

function AssistantAvatar({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative grid shrink-0 place-items-center rounded-full bg-[#090914] shadow-lg ${
        compact ? "h-12 w-12" : "h-12 w-12 border border-white/20"
      }`}
      aria-hidden="true"
    >
      <span className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-yellow-300" />
      <span className="absolute left-1/2 top-1.5 h-3 w-px -translate-x-1/2 bg-yellow-300/80" />
      <span className="relative mt-1 h-7 w-8 rounded-[10px] border border-cyan-200/40 bg-gradient-to-br from-[#7c3aed] via-[#ec4899] to-[#22d3ee] p-[2px] shadow-[0_0_16px_rgba(34,211,238,0.35)]">
        <span className="flex h-full w-full items-center justify-center gap-1 rounded-[8px] bg-[#111827]">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.9)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.9)]" />
        </span>
        <span className="absolute -left-1 top-1/2 h-2.5 w-1.5 -translate-y-1/2 rounded-l-full bg-cyan-300" />
        <span className="absolute -right-1 top-1/2 h-2.5 w-1.5 -translate-y-1/2 rounded-r-full bg-fuchsia-300" />
      </span>
      <span className="absolute bottom-2 h-1 w-5 rounded-full bg-pink-300/80" />
    </div>
  );
}

export default function ChatBot() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { isSplashDone } = useSplash();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const didDrag = useRef(false);

  const getWidgetSize = useCallback(() => {
    if (typeof window === "undefined") return WIDGET_SIZE;
    return Math.min(WIDGET_SIZE, window.innerWidth - EDGE_GAP * 2, window.innerHeight - EDGE_GAP * 2);
  }, []);

  const getBottomRightPosition = useCallback((mini = false) => {
    if (typeof window === "undefined") return { x: 0, y: 0 };

    const size = mini ? ICON_SIZE : getWidgetSize();

    return {
      x: window.innerWidth - size - EDGE_GAP,
      y: window.innerHeight - size - BOTTOM_MARGIN,
    };
  }, [getWidgetSize]);

  const clampPosition = useCallback((x: number, y: number, size: number) => {
    if (typeof window === "undefined") return { x, y };

    return {
      x: Math.min(Math.max(EDGE_GAP, x), Math.max(EDGE_GAP, window.innerWidth - size - EDGE_GAP)),
      y: Math.min(Math.max(EDGE_GAP, y), Math.max(EDGE_GAP, window.innerHeight - size - EDGE_GAP)),
    };
  }, []);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      // Mobile devices
      if (window.innerWidth < 768) {
        setMinimized(true);
      } else {
        // Desktop
        setMinimized(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const size = minimized ? ICON_SIZE : getWidgetSize();
    const nextPosition = getBottomRightPosition(minimized);

    setPosition(clampPosition(nextPosition.x, nextPosition.y, size));

    const handleResize = () => {
      const nextSize = minimized ? ICON_SIZE : getWidgetSize();
      setPosition((current) => clampPosition(current.x, current.y, nextSize));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [clampPosition, getBottomRightPosition, getWidgetSize, minimized, mounted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const startDrag = (event: PointerEvent<HTMLElement>) => {
    dragOffset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
    dragStart.current = { x: event.clientX, y: event.clientY };
    didDrag.current = false;

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const dragWidget = (event: PointerEvent<HTMLElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

    const xDistance = Math.abs(event.clientX - dragStart.current.x);
    const yDistance = Math.abs(event.clientY - dragStart.current.y);
    didDrag.current = xDistance > 4 || yDistance > 4;

    setPosition(
      clampPosition(
        event.clientX - dragOffset.current.x,
        event.clientY - dragOffset.current.y,
        minimized ? ICON_SIZE : getWidgetSize(),
      ),
    );
  };

  const stopDrag = (event: PointerEvent<HTMLElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const minimizeChat = () => {
    const nextPosition = getBottomRightPosition(true);
    setPosition(clampPosition(nextPosition.x, nextPosition.y, ICON_SIZE));
    setMinimized(true);
  };

  const sendMessage = async () => {
    const msg = input.trim();
    if (!msg || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setLoading(true);

    const basicReply = getBasicPortfolioReply(msg);
    if (basicReply) {
      setMessages((prev) => [...prev, { role: "ai", text: basicReply }]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://babil-portfolio.onrender.com/chat", {
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

  if (!mounted || !isSplashDone) return null;

  if (minimized) {
    return (
      <button
        type="button"
        onClick={() => {
          if (!didDrag.current) {
            setMinimized(false);
          }
        }}
        onPointerDown={startDrag}
        onPointerMove={dragWidget}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        className="fixed z-[9999] flex touch-none select-none items-center justify-center rounded-2xl border border-white/20 bg-[#030308]/95 text-white shadow-2xl backdrop-blur-xl transition hover:scale-105"
        style={{
          left: position.x,
          top: position.y,
          width: ICON_SIZE,
          height: ICON_SIZE,
          touchAction: "none",
        }}
        aria-label="Open Babil's AI Assistant"
        title="Open Babil's AI Assistant"
      >
        <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600 via-fuchsia-500 to-cyan-400 opacity-90" />
        <span className="relative grid h-12 w-12 place-items-center rounded-full bg-black shadow-inner">
          <AssistantAvatar compact />
        </span>
      </button>
    );
  }

  const widgetSize = getWidgetSize();

  return (
    <aside
      className="fixed z-[9999] overflow-hidden rounded-2xl border border-white/10 bg-[rgba(2,2,8,0.96)] text-white shadow-2xl backdrop-blur-xl"
      style={{
        width: widgetSize,
        height: widgetSize,
        left: position.x,
        top: position.y,
      }}
      aria-label="AI chat assistant"
    >
      <header
        onPointerDown={startDrag}
        onPointerMove={dragWidget}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        className="flex h-20 touch-none select-none items-center justify-between gap-3 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-400 px-5 cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative">
            <AssistantAvatar />
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#0b0b15] bg-emerald-400" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-[15px] font-semibold leading-none text-white">Babil&apos;s AI Assistant</h2>
            <p className="mt-1 text-xs text-white/80">Online</p>
          </div>
        </div>

        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={minimizeChat}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/15 text-white transition hover:bg-white/25"
          aria-label="Minimize chat"
          title="Minimize"
        >
          <FiX size={18} />
        </button>
      </header>

      <div className="h-[calc(100%-148px)] overflow-y-auto px-4 py-4 text-sm">
        <div className="space-y-3">
          {messages.length === 0 && (
            <div className="max-w-[85%] rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-[13px] leading-relaxed text-slate-300">
              Ask about my skills, projects, or experience.
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                message.role === "user"
                  ? "ml-auto bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-lg shadow-purple-950/20"
                  : message.role === "error"
                    ? "bg-red-500/10 text-red-300"
                    : "bg-white/5 text-gray-200"
              }`}
            >
              <span className="font-semibold text-white">{message.role === "user" ? "You" : "AI"}: </span>
              {message.text}
            </div>
          ))}

          {loading && <div className="px-1 text-xs text-slate-300">Thinking...</div>}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-[#030308] p-3">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask anything..."
            className="h-11 min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 text-[13px] text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300/40"
          />

          <button
            type="button"
            onClick={sendMessage}
            disabled={loading}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-r from-purple-600 to-cyan-400 text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send message"
          >
            <FiSend size={17} />
          </button>
        </div>
      </div>
    </aside>
  );
}
