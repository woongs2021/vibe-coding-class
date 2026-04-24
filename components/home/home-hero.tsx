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
      className="relative overflow-hidden rounded-2xl border-b border-zinc-200"
      style={{
        backgroundImage: "url('/hero-gradient-mesh-light.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 마우스 추적 라이트 스팟 */}
      <div
        ref={spotRef}
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          ["--spot-x" as string]: "50%",
          ["--spot-y" as string]: "50%",
          background:
            "radial-gradient(circle 280px at var(--spot-x) var(--spot-y), rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)",
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-20 flex items-center justify-between">
        <div className="flex flex-col gap-5 px-8 py-12 md:px-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Portfolio</p>
          <h1 id="hero-title" className="text-4xl font-semibold tracking-tight md:text-6xl">
            Woonghee
          </h1>
          <p className="max-w-xl text-xl text-zinc-600">UX 디자이너</p>
          <div>
            <a
              href="tel:010-1234-5678"
              className="inline-flex h-11 items-center rounded-full border border-zinc-300 px-5 text-sm font-medium hover:border-zinc-900"
            >
              연락하기
            </a>
          </div>
        </div>
        <div className="hidden shrink-0 pr-8 md:block md:pr-12">
          <Image
            src="/hero-avatar2.png"
            alt="캐릭터 아바타"
            width={200}
            height={150}
            style={{ height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}
