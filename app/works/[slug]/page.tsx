import Link from "next/link";
import { notFound } from "next/navigation";
import { WORKS } from "@/lib/works-data";
import { BlurFade } from "@/components/ui/blur-fade";
import { WorkThumbnail } from "@/components/works/work-thumbnail";

export function generateStaticParams() {
  return WORKS.map((work) => ({ slug: work.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = WORKS.find((w) => w.slug === slug);

  if (!work) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-zinc-900">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-12 md:py-16">

        {/* 뒤로가기 */}
        <BlurFade delay={0.1} duration={0.45} direction="up">
          <Link
            href="/#works"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors w-fit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            모든 작업물 보기
          </Link>
        </BlurFade>

        {/* 히어로 이미지 */}
        <BlurFade delay={0.25} duration={0.55} direction="up">
          <div className="overflow-hidden rounded-2xl">
            <WorkThumbnail slug={work.slug} title={work.title} size="hero" />
          </div>
        </BlurFade>

        {/* 제목 + 개요 + 메타 */}
        <BlurFade delay={0.45} duration={0.5} direction="up">
          <div className="grid gap-10 md:grid-cols-[1fr_200px]">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight">{work.title}</h1>
              <p className="text-base leading-8 text-zinc-600">{work.overview}</p>
            </div>

            {/* 메타 사이드바 */}
            <aside className="space-y-5 md:pt-1">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">역할</p>
                <p className="text-sm font-medium text-zinc-800">{work.role}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">기간</p>
                <p className="text-sm font-medium text-zinc-800">{work.period}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">툴</p>
                <div className="flex flex-wrap gap-1.5">
                  {work.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs text-zinc-600"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              {work.links.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">링크</p>
                  <ul className="space-y-2">
                    {work.links.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-500 transition-colors"
                        >
                          {link.label}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </BlurFade>

        {/* 구분선 */}
        <BlurFade delay={0.6} duration={0.4} direction="up">
          <hr className="border-zinc-200" />
        </BlurFade>

        {/* 섹션별 본문 — 스크롤 inView 트리거 */}
        <div className="space-y-12">
          {work.sections.map((section, i) => (
            <BlurFade
              key={section.heading}
              delay={i * 0.1}
              duration={0.5}
              direction="up"
              inView
              inViewMargin="-80px"
            >
              <div className="grid gap-4 md:grid-cols-[200px_1fr]">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400 md:pt-1">
                  {section.heading}
                </h2>
                <p className="text-base leading-8 text-zinc-700">{section.body}</p>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* 하단 뒤로가기 */}
        <BlurFade delay={0.1} duration={0.45} direction="up" inView inViewMargin="-40px">
          <div className="border-t border-zinc-200 pt-8">
            <Link
              href="/#works"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              모든 작업물 보기
            </Link>
          </div>
        </BlurFade>

      </main>
    </div>
  );
}
