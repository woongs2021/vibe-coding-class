"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const spot = spotRef.current;
    if (!section || !spot) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      gsap.to(spot, {
        "--spot-x": `${x}%`,
        "--spot-y": `${y}%`,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(spot, {
        "--spot-x": "50%",
        "--spot-y": "50%",
        duration: 1.8,
        ease: "power2.out",
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#f2f0eb" }}
    >
      {/* 마우스 추적 그린 라이트 스팟 */}
      <div
        ref={spotRef}
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          ["--spot-x" as string]: "50%",
          ["--spot-y" as string]: "50%",
          background:
            "radial-gradient(circle 320px at var(--spot-x) var(--spot-y), rgba(0,117,74,0.10) 0%, rgba(0,117,74,0.04) 45%, transparent 70%)",
        }}
      />

      <div className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-20 md:py-28">
        {/* 텍스트 콘텐츠 */}
        <div className="flex flex-col gap-6">
          <p
            style={{
              color: "#00754A",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </p>
          <h1
            id="hero-title"
            style={{
              color: "#006241",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
            }}
            className="text-5xl font-semibold md:text-7xl"
          >
            Woonghee
          </h1>
          <p
            style={{
              color: "rgba(0,0,0,0.58)",
              fontSize: "19px",
              letterSpacing: "-0.01em",
              lineHeight: 1.75,
            }}
          >
            UX 디자이너
          </p>
          <div className="flex gap-3">
            <a
              href="#contact"
              className="inline-flex items-center transition-all active:scale-95"
              style={{
                backgroundColor: "#00754A",
                color: "#ffffff",
                borderRadius: "50px",
                padding: "7px 24px",
                height: "44px",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                transition: "all 0.2s ease",
              }}
            >
              연락하기
            </a>
            <a
              href="#works"
              className="inline-flex items-center transition-all active:scale-95"
              style={{
                backgroundColor: "transparent",
                color: "#00754A",
                border: "1px solid #00754A",
                borderRadius: "50px",
                padding: "7px 24px",
                height: "44px",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                transition: "all 0.2s ease",
              }}
            >
              작업 보기
            </a>
          </div>
        </div>

        {/* 아바타 이미지 */}
        <div className="hidden shrink-0 md:block">
          <Image
            src="/hero-avatar2.png"
            alt="캐릭터 아바타"
            width={220}
            height={165}
            style={{ height: "auto", opacity: 1, transition: "opacity 0.3s ease-in" }}
          />
        </div>
      </div>
    </section>
  );
}
