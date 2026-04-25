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

  const inputStyle: React.CSSProperties = {
    height: "48px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid rgba(0,0,0,0.16)",
    backgroundColor: "#ffffff",
    padding: "0 14px",
    fontSize: "15px",
    color: "rgba(0,0,0,0.87)",
    letterSpacing: "-0.01em",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: "rgba(0,0,0,0.58)",
    display: "block",
    marginBottom: "6px",
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      style={{ backgroundColor: "#f2f0eb" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-16 md:grid-cols-2">
          {/* 왼쪽 — 소개 */}
          <div className="flex flex-col gap-6">
            <div>
              <p
                style={{
                  color: "#00754A",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Contact
              </p>
              <h2
                id="contact-title"
                style={{
                  color: "#006241",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                }}
                className="text-3xl font-semibold"
              >
                함께 일하기
              </h2>
            </div>
            <p
              style={{
                color: "rgba(0,0,0,0.58)",
                fontSize: "19px",
                letterSpacing: "-0.01em",
                lineHeight: 1.75,
              }}
            >
              프로젝트 문의·강의 협업, 편하게 보내주세요.
              <br />
              빠르게 답장드릴게요.
            </p>
            <div className="flex flex-col gap-3">
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  boxShadow: "0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)",
                }}
              >
                <p style={{ color: "rgba(0,0,0,0.58)", fontSize: "13px", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "4px" }}>전화</p>
                <p style={{ color: "rgba(0,0,0,0.87)", fontWeight: 600, letterSpacing: "-0.01em", fontSize: "17px" }}>010-1234-5678</p>
              </div>
            </div>
          </div>

          {/* 오른쪽 — 폼 */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" style={labelStyle}>이름</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="홍길동"
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#00754A")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.16)")}
                />
              </div>
              <div>
                <label htmlFor="contact-email" style={labelStyle}>이메일</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="hello@example.com"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#00754A")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.16)")}
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" style={labelStyle}>메시지</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="안녕하세요, 프로젝트 관련해서 문의드리고 싶습니다."
                value={form.message}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  height: "auto",
                  padding: "14px",
                  resize: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00754A")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.16)")}
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: "#00754A",
                  color: "#ffffff",
                  borderRadius: "50px",
                  padding: "7px 32px",
                  height: "44px",
                  fontSize: "16px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  border: "1px solid #00754A",
                  transition: "all 0.2s ease",
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                }}
              >
                {status === "loading" ? "보내는 중..." : "보내기"}
              </button>

              {status === "success" && (
                <p style={{ color: "#00754A", fontSize: "14px", letterSpacing: "-0.01em", fontWeight: 500 }}>
                  메일이 전송됐어요. 곧 답장드릴게요 🙂
                </p>
              )}
              {status === "error" && (
                <p style={{ color: "#c82014", fontSize: "14px", letterSpacing: "-0.01em" }}>
                  전송에 실패했어요. 잠시 후 다시 시도해주세요.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
