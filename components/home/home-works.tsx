import Image from "next/image";
import Link from "next/link";
import { WORKS } from "@/lib/works-data";

export function HomeWorks() {
  return (
    <section id="works" aria-labelledby="works-title" className="grid gap-6 md:grid-cols-[140px_1fr]">
      <h2
        id="works-title"
        className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500"
      >
        Works
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {WORKS.map((work) => (
          <Link
            key={work.slug}
            href={`/works/${work.slug}`}
            className="group rounded-2xl border border-zinc-200 overflow-hidden transition-colors hover:border-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
              <Image
                src={work.thumbnail}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="px-4 py-4">
              <p className="text-sm font-semibold text-zinc-900">{work.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-500 line-clamp-2">
                {work.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
