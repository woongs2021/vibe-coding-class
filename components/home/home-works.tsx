import Link from "next/link";
import { WORKS } from "@/lib/works-data";

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

function WorkThumbnail({ slug, title }: { slug: string; title: string }) {
  const theme = THUMBNAIL_THEMES[slug] ?? {
    bg: "#f2f0eb",
    accent: "rgba(0,0,0,0.06)",
    label: "Project",
  };

  return (
    <div
      className="relative flex aspect-video w-full items-end overflow-hidden p-5 transition-transform duration-300 group-hover:scale-[1.02]"
      style={{ backgroundColor: theme.bg }}
    >
      {/* 배경 원형 장식 */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full"
        style={{ backgroundColor: theme.accent }}
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-4 h-28 w-28 rounded-full"
        style={{ backgroundColor: theme.accent }}
      />
      {/* 레이블 + 프로젝트명 */}
      <div className="relative z-10">
        <p
          style={{
            color: "rgba(255,255,255,0.60)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "4px",
          }}
        >
          {theme.label}
        </p>
        <p
          style={{
            color: "#ffffff",
            fontSize: "15px",
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

export function HomeWorks() {
  return (
    <section id="works" aria-labelledby="works-title">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 flex items-end justify-between">
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
              Works
            </p>
            <h2
              id="works-title"
              style={{
                color: "#006241",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
              }}
              className="text-3xl font-semibold"
            >
              주요 작업들
            </h2>
          </div>
          <Link
            href="/works"
            className="hidden items-center transition-all active:scale-95 md:inline-flex"
            style={{
              backgroundColor: "transparent",
              color: "#00754A",
              border: "1px solid #00754A",
              borderRadius: "50px",
              padding: "7px 20px",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              transition: "all 0.2s ease",
            }}
          >
            전체 보기
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WORKS.map((work) => (
            <Link
              key={work.slug}
              href={`/works/${work.slug}`}
              className="group block transition-all duration-200 hover:-translate-y-0.5"
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#ffffff",
                boxShadow:
                  "0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)",
              }}
            >
              <WorkThumbnail slug={work.slug} title={work.title} />
              <div className="px-5 py-4">
                <p
                  style={{
                    color: "rgba(0,0,0,0.87)",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    fontSize: "15px",
                  }}
                >
                  {work.title}
                </p>
                <p
                  className="mt-1 line-clamp-2 text-sm leading-relaxed"
                  style={{
                    color: "rgba(0,0,0,0.58)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {work.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
