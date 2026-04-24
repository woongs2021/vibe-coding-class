import { HomeAbout, HomeContact, HomeHero, HomeWorks } from "@/components/home";
import { BlurFade } from "@/components/ui/blur-fade";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fcfcfd] text-zinc-900">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-12 md:py-16">
        <BlurFade delay={0.1} duration={0.5} direction="up" inView>
          <header className="flex items-center justify-between border-b border-zinc-200 pb-5">
            <p className="text-lg font-semibold">Woonghee</p>
            <nav aria-label="Primary" className="hidden gap-6 text-sm text-zinc-600 md:flex">
              <a href="#hero" className="hover:text-zinc-900">
                Home
              </a>
              <a href="#about" className="hover:text-zinc-900">
                About
              </a>
              <a href="#works" className="hover:text-zinc-900">
                Works
              </a>
              <a href="#contact" className="hover:text-zinc-900">
                Contact
              </a>
            </nav>
          </header>
        </BlurFade>
        <BlurFade delay={0.35} duration={0.5} direction="up" inView>
          <HomeHero />
        </BlurFade>
        <BlurFade delay={0.6} duration={0.5} direction="up" inView>
          <HomeAbout />
        </BlurFade>
        <BlurFade delay={0.85} duration={0.5} direction="up" inView>
          <HomeWorks />
        </BlurFade>
        <BlurFade delay={1.1} duration={0.5} direction="up" inView>
          <HomeContact />
        </BlurFade>
      </main>
    </div>
  );
}
