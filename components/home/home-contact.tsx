"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function HomeContact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="grid gap-6 md:grid-cols-[140px_1fr]"
    >
      <h2
        id="contact-title"
        className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500"
      >
        Contact
      </h2>

      <div className="space-y-6">
        <div className="space-y-1">
          <p className="text-lg font-semibold text-zinc-900">함께 일하기</p>
          <p className="text-sm text-zinc-500">
            프로젝트 문의·강의 협업, 편하게 보내주세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="contact-name"
                className="text-sm font-medium text-zinc-700"
              >
                이름
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="홍길동"
                value={form.name}
                onChange={handleChange}
                className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="contact-email"
                className="text-sm font-medium text-zinc-700"
              >
                이메일
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="hello@example.com"
                value={form.email}
                onChange={handleChange}
                className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="contact-message"
              className="text-sm font-medium text-zinc-700"
            >
              메시지
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="안녕하세요, 프로젝트 관련해서 문의드리고 싶습니다."
              value={form.message}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
            />
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex h-10 items-center rounded-full border border-zinc-900 bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "loading" ? "보내는 중..." : "보내기"}
              </button>
            </div>

            {status === "success" && (
              <p className="text-sm text-emerald-600">
                메일이 전송됐어요. 곧 답장드릴게요 🙂
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-500">
                전송에 실패했어요. 잠시 후 다시 시도해주세요.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
