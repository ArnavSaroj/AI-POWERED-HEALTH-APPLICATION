import { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import Quote from "./components/quote.tsx";

import "./App.css";

type Message = {
  id: number;
  who: "user" | "ai";
  text: string;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      who: "ai",
      text: "Hello — tell me a symptom and I will give a short health tip.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const nextId = useRef(1);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const append = (who: Message["who"], text: string) => {
    setMessages((m) => [...m, { id: nextId.current++, who, text }]);
  };

  async function send(e?: FormEvent) {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    append("user", trimmed);
    setInput("");
    setLoading(true);
    append("ai", "Thinking...");

    try {
      const resp = await fetch("http://localhost:3000/api/PostRes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: trimmed }),
      });

      setMessages((prev) => {
        const withoutPlaceholder = prev.slice(0, -1);
        return withoutPlaceholder;
      });

      if (!resp.ok) {
        const txt = await resp.text();
        append("ai", `Error: ${txt || resp.statusText}`);
        return;
      }
      const data = await resp.json();
      const reply = JSON.stringify(data);
      append("ai", reply);
    } catch {
      append("ai", "Network error — could not reach server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-root flex justify-center">
      <main className="chat-app w-full px-4 py-2">
        <Quote />
        <header className="chat-header">
          <h1 className="text-amber-600 font-semibold tracking-wide">
            Health Tip Assistant
          </h1>
        </header>

        <div className="chat-window" ref={listRef} aria-live="polite">
          {messages.map((m) => (
            <div
              key={m.id}
              className={"msg " + (m.who === "user" ? "user" : "ai")}
            >
              <div className="bubble">{m.text}</div>
            </div>
          ))}
        </div>

        <form className="chat-form" onSubmit={send}>
          <div className="input-wrap">
            <input
              aria-label="Type a symptom"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a symptom (e.g. headache)"
              className="chat-input text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
            />
            <button
              type="submit"
              className="send-btn inside"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
