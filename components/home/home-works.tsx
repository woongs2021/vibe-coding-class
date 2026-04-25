import Image from "next/image";
import Link from "next/link";
import { WORKS } from "@/lib/works-data";

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
              <div
                className="relative aspect-video w-full overflow-hidden"
                style={{ backgroundColor: "#f2f0eb" }}
              >
                <Image
                  src={work.thumbnail}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ opacity: 1, transition: "opacity 0.3s ease-in" }}
                />
              </div>
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
