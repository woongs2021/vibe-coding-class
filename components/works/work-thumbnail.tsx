const THUMBNAIL_THEMES: Record<string, { bg: string; accent: string; label: string }> = {
  "onboarding-ux-redesign": {
    bg: "#1E3932",
    accent: "rgba(255,255,255,0.12)",
    label: "UX Research",
  },
  "saas-dashboard-ia": {
    bg: "#00754A",
    accent: "rgba(255,255,255,0.12)",
    label: "Information Architecture",
  },
  "design-system": {
    bg: "#006241",
    accent: "rgba(255,255,255,0.12)",
    label: "Design System",
  },
};

interface WorkThumbnailProps {
  slug: string;
  title: string;
  /** 카드 목록용(aspect-video) vs 상세 페이지 히어로용(larger) */
  size?: "card" | "hero";
}

export function WorkThumbnail({ slug, title, size = "card" }: WorkThumbnailProps) {
  const theme = THUMBNAIL_THEMES[slug] ?? {
    bg: "#f2f0eb",
    accent: "rgba(0,0,0,0.06)",
    label: "Project",
  };

  const isHero = size === "hero";

  return (
    <div
      className={`relative flex w-full items-end overflow-hidden ${
        isHero ? "aspect-video" : "aspect-video transition-transform duration-300 group-hover:scale-[1.02]"
      }`}
      style={{ backgroundColor: theme.bg }}
    >
      {/* 배경 장식 원 — 오른쪽 상단 */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          backgroundColor: theme.accent,
          width: isHero ? "320px" : "160px",
          height: isHero ? "320px" : "160px",
          right: isHero ? "-40px" : "-32px",
          top: isHero ? "-40px" : "-32px",
        }}
      />
      {/* 배경 장식 원 — 왼쪽 하단 */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          backgroundColor: theme.accent,
          width: isHero ? "200px" : "112px",
          height: isHero ? "200px" : "112px",
          left: isHero ? "-24px" : "-16px",
          bottom: isHero ? "-48px" : "-40px",
        }}
      />

      {/* 레이블 + 프로젝트명 */}
      <div
        className="relative z-10"
        style={{ padding: isHero ? "32px 40px" : "20px" }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.60)",
            fontSize: isHero ? "13px" : "11px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: isHero ? "8px" : "4px",
          }}
        >
          {theme.label}
        </p>
        <p
          style={{
            color: "#ffffff",
            fontSize: isHero ? "28px" : "15px",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
          }}
        >
          {title}
        </p>
      </div>
    </div>
  );
}
