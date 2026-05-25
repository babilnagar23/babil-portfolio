"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiMessageCircle, FiMinus, FiMove, FiSend } from "react-icons/fi";

interface Message {
  role: "user" | "ai" | "error";
  text: string;
}

const WIDGET_WIDTH = 320;
const WIDGET_HEIGHT = 330;
const ICON_SIZE = 56;
const EDGE_GAP = 20;
const BOTTOM_MARGIN = 24;

const getBasicPortfolioReply = (query: string) => {
  const q = query.toLowerCase().trim();

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

  if (q.includes("hire") || q.includes("recruit") || q.includes("shortlist")) {
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

export default function ChatBot() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const didDrag = useRef(false);

  const getBottomRightPosition = (minimized = false) => {
  if (typeof window === "undefined") {
    return { x: 0, y: 0 };
  }

  const width = minimized ? ICON_SIZE : getWidgetWidth();
  const height = minimized ? ICON_SIZE : WIDGET_HEIGHT;

  return {
    x: window.innerWidth - width - EDGE_GAP,
    y: window.innerHeight - height - BOTTOM_MARGIN,
  };
};

  const getWidgetWidth = () => {
    if (typeof window === "undefined") return WIDGET_WIDTH;
    return Math.min(WIDGET_WIDTH, window.innerWidth - EDGE_GAP * 2);
  };

  const clampPosition = (x: number, y: number, width = WIDGET_WIDTH, height = WIDGET_HEIGHT) => {
    if (typeof window === "undefined") return { x, y };
    const safeWidth = Math.min(width, window.innerWidth - EDGE_GAP * 2);
    const maxY = Math.max(EDGE_GAP, window.innerHeight - height - EDGE_GAP);

    return {
      x: Math.min(Math.max(EDGE_GAP, x), Math.max(EDGE_GAP, window.innerWidth - safeWidth - EDGE_GAP)),
      y: Math.min(Math.max(EDGE_GAP, y), maxY),
    };
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
   if (!mounted) return;

   const initialPosition = getBottomRightPosition(minimized);

   setPosition(
     clampPosition(
      initialPosition.x,
      initialPosition.y,
      minimized ? ICON_SIZE : getWidgetWidth(),
      minimized ? ICON_SIZE : WIDGET_HEIGHT,
     ),
   );

   const handleResize = () => {
     setPosition((current) =>
       clampPosition(
        current.x,
        current.y,
        minimized ? ICON_SIZE : getWidgetWidth(),
        minimized ? ICON_SIZE : WIDGET_HEIGHT,
       ),
     );
   };

   window.addEventListener("resize", handleResize);

   return () => window.removeEventListener("resize", handleResize);
  }, [minimized, mounted]);

  const startDrag = (event: PointerEvent<HTMLButtonElement>) => {
    dragOffset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
    dragStart.current = { x: event.clientX, y: event.clientY };
    didDrag.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const dragWidget = (event: PointerEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const xDistance = Math.abs(event.clientX - dragStart.current.x);
    const yDistance = Math.abs(event.clientY - dragStart.current.y);
    didDrag.current = xDistance > 4 || yDistance > 4;
    setPosition(
      clampPosition(
        event.clientX - dragOffset.current.x,
        event.clientY - dragOffset.current.y,
        minimized ? ICON_SIZE : getWidgetWidth(),
        minimized ? ICON_SIZE : WIDGET_HEIGHT,
      ),
    );
  };

  const stopDrag = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const dockLeft = () => {
    setPosition((current) => clampPosition(EDGE_GAP, current.y));
  };

  const dockRight = () => {
    setPosition((current) =>
      clampPosition(window.innerWidth - getWidgetWidth() - EDGE_GAP, current.y, getWidgetWidth()),
    );
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

  if (!mounted) return null;

  if (minimized) {
    return (
      <button
        type="button"
        onClick={() => {
          if (!didDrag.current) setMinimized(false);if (!didDrag.current) {
            const pos = getBottomRightPosition(false); 
            setPosition(pos);
            setMinimized(false);
          }
        }}
        onPointerDown={startDrag}
        onPointerMove={dragWidget}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        className="fixed z-[9999] w-14 h-14 touch-none select-none rounded-full bg-gradient-brand text-bright border border-white/15 shadow-glow flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-105 transition-all duration-300 ease-out"
        style={{
          left: position.x,
          top: position.y,
          touchAction: "none",
        }}
        aria-label="Open Babil's AI Assistant "
        title="Open Babil's AI Assistant "
      >
        <FiMessageCircle size={22} />
      </button>
    );
  }

  return (
    <aside
      className="fixed max-w-[calc(100vw-40px)] card-glass rounded-2xl z-[9999] shadow-glow overflow-visible"
      style={{
        width: getWidgetWidth(),
        left: position.x,
        top: position.y,
      }}
      aria-label="AI chat assistant"
    >
      <button
        type="button"
        onPointerDown={startDrag}
        onPointerMove={dragWidget}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        className="absolute -left-3 top-1/2 -translate-y-1/2 w-7 h-16 touch-none select-none rounded-full bg-card border border-white/15 text-accent flex items-center justify-center cursor-grab active:cursor-grabbing hover:text-bright hover:border-accent/40 transition-colors"
        style={{ touchAction: "none" }}
        aria-label="Drag Babil's AI Assistant "
        title="Drag anywhere"
      >
        <FiMove size={15} />
      </button>

      <div className="rounded-2xl overflow-hidden">
        <header className="px-4 py-3 bg-gradient-brand text-bright font-semibold text-sm flex items-center justify-between gap-3">
          <button
            type="button"
            onPointerDown={startDrag}
            onPointerMove={dragWidget}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
            className="flex min-w-0 flex-1 touch-none select-none items-center gap-2 bg-transparent border-none p-0 text-left text-bright font-semibold cursor-grab active:cursor-grabbing"
            style={{ touchAction: "none" }}
            aria-label="Drag Babil's AI Assistant "
            title="Drag anywhere"
          >
            <FiMove className="shrink-0" size={15} />
            <span className="truncate">Babil's AI Assistant </span>
          </button>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={dockLeft}
              className="w-8 h-8 rounded-full bg-black/15 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Dock chat left"
              title="Dock left"
            >
              <FiChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={dockRight}
              className="w-8 h-8 rounded-full bg-black/15 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Dock chat right"
              title="Dock right"
            >
              <FiChevronRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => {
                    const pos = getBottomRightPosition(true);
                      setPosition(pos);
                      setMinimized(true);
              }}
              className="w-8 h-8 rounded-full bg-black/15 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Minimize chat"
              title="Minimize"
            >
              <FiMinus size={16} />
            </button>
          </div>
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
      </div>
    </aside>
  );
}
