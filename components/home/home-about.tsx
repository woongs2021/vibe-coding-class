export function HomeAbout() {
  return (
    <section id="about" aria-labelledby="about-title" className="grid gap-6 md:grid-cols-[140px_1fr]">
      <h2 id="about-title" className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
        About
      </h2>
      <div className="space-y-5">
        <p className="max-w-2xl text-lg leading-8 text-zinc-800">AI 시대에 발발 떨고 있는 디자이너</p>
        <dl className="grid gap-2 text-zinc-600 sm:grid-cols-2">
          <div>
            <dt className="text-sm uppercase tracking-wide text-zinc-500">경력</dt>
            <dd className="text-base font-medium text-zinc-900">13년차</dd>
          </div>
          <div>
            <dt className="text-sm uppercase tracking-wide text-zinc-500">연락처</dt>
            <dd className="text-base font-medium text-zinc-900">010-1234-5678</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
