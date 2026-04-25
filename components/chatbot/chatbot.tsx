"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/app/api/chat/route";

type Role = "user" | "ai";

interface Message {
  id: number;
  role: Role;
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 0,
    role: "ai",
    text: "안녕하세요 👋 궁금한 것이 있으면 편하게 물어보세요!",
  },
];

let nextId = 1;

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);   // 응답 대기 중 점 애니메이션
  const [isStreaming, setIsStreaming] = useState(false); // 스트리밍 중 입력 비활성화
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMsg: Message = { id: nextId++, role: "user", text };
    const nextMessages = [...messages, userMsg];

    setMessages(nextMessages);
    setInput("");
    setIsTyping(true);
    setIsStreaming(true);

    try {
      const history: ChatMessage[] = nextMessages
        .slice(1)
        .map((m) => ({ role: m.role, text: m.text }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const errMsg = typeof errData.error === "string" && errData.error !== "gemini_error"
          ? errData.error
          : "답변을 가져오지 못했어요. 잠시 후 다시 시도해줘.";
        throw new Error(errMsg);
      }
      if (!res.body) throw new Error("fetch failed");

      const aiId = nextId++;
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let isFirstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        if (isFirstChunk) {
          isFirstChunk = false;
          setIsTyping(false);
          setMessages((prev) => [...prev, { id: aiId, role: "ai", text: chunk }]);
        } else {
          setMessages((prev) =>
            prev.map((m) => (m.id === aiId ? { ...m, text: m.text + chunk } : m))
          );
        }
      }

      if (isFirstChunk) {
        setMessages((prev) => [
          ...prev,
          { id: aiId, role: "ai", text: "답변을 가져오지 못했어요. 잠시 후 다시 시도해줘." },
        ]);
      }
    } catch (err) {
      const errText = err instanceof Error ? err.message : "답변을 가져오지 못했어요. 잠시 후 다시 시도해줘.";
      setMessages((prev) => [
        ...prev,
        {
          id: nextId++,
          role: "ai",
          text: errText,
        },
      ]);
    } finally {
      setIsTyping(false);
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) sendMessage();
  };

  return (
    <>
      {/* 대화창 */}
      {open && (
        <div
          className="fixed bottom-20 right-4 z-50 flex w-80 flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl md:right-6 md:w-96"
          style={{ maxHeight: "min(540px, calc(100dvh - 96px))" }}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3" style={{ backgroundColor: "#1E3932" }}>
            <div className="flex items-center gap-2">
              <span className="text-base">🤖</span>
              <span className="text-sm font-semibold text-white">AI 챗봇</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="닫기"
              className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* 메시지 리스트 */}
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-sm bg-zinc-900 text-white"
                      : "rounded-bl-sm bg-zinc-100 text-zinc-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* 타이핑 인디케이터 */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-zinc-100 px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* 입력창 */}
          <div className="border-t border-zinc-100 px-3 py-3">
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-200 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="메시지를 입력하세요..."
                className="flex-1 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isStreaming}
                aria-label="보내기"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white transition-colors hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M1 12L12 1M12 1H4M12 1V9"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 플로팅 토글 버튼 */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "챗봇 닫기" : "챗봇 열기"}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform hover:scale-105 active:scale-95 md:right-6"
        style={{
          backgroundColor: "#00754A",
          boxShadow: "0 0 6px rgba(0,0,0,0.24), 0 8px 12px rgba(0,0,0,0.14)",
        }}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M2 2l14 14M16 2L2 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M2 5a2 2 0 012-2h12a2 2 0 012 2v7a2 2 0 01-2 2H6l-4 3V5z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
    </>
  );
}
