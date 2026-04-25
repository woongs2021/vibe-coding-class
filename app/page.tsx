import { HomeAbout, HomeContact, HomeHero, HomeWorks } from "@/components/home";
import { BlurFade } from "@/components/ui/blur-fade";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f2f0eb" }}>
      {/* Global Nav */}
      <header
        className="sticky top-0 z-40 bg-white"
        style={{
          boxShadow:
            "0 1px 3px rgba(0,0,0,0.1), 0 2px 2px rgba(0,0,0,0.06), 0 0 2px rgba(0,0,0,0.07)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#hero"
            className="text-lg font-semibold"
            style={{ color: "#006241", letterSpacing: "-0.01em" }}
          >
            Woonghee
          </a>
          <nav
            aria-label="Primary"
            className="hidden gap-8 text-sm md:flex"
            style={{ color: "rgba(0,0,0,0.87)", letterSpacing: "-0.01em" }}
          >
            <a href="#hero" className="transition-opacity hover:opacity-60">Home</a>
            <a href="#about" className="transition-opacity hover:opacity-60">About</a>
            <a href="#works" className="transition-opacity hover:opacity-60">Works</a>
            <a href="#contact" className="transition-opacity hover:opacity-60">Contact</a>
          </nav>
          <a
            href="#contact"
            className="hidden items-center transition-all active:scale-95 md:inline-flex"
            style={{
              backgroundColor: "#00754A",
              color: "#ffffff",
              borderRadius: "50px",
              padding: "7px 20px",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              transition: "all 0.2s ease",
            }}
          >
            연락하기
          </a>
        </div>
      </header>

      <main>
        {/* Hero — Cream canvas */}
        <BlurFade delay={0.1} duration={0.5} direction="up" inView>
          <HomeHero />
        </BlurFade>

        {/* About — House Green feature band */}
        <BlurFade delay={0.35} duration={0.5} direction="up" inView>
          <HomeAbout />
        </BlurFade>

        {/* Works — White section */}
        <div style={{ backgroundColor: "#ffffff" }}>
          <BlurFade delay={0.6} duration={0.5} direction="up" inView>
            <HomeWorks />
          </BlurFade>
        </div>

        {/* Contact — Cream canvas */}
        <div style={{ backgroundColor: "#f2f0eb" }}>
          <BlurFade delay={0.85} duration={0.5} direction="up" inView>
            <HomeContact />
          </BlurFade>
        </div>
      </main>

      {/* Footer — House Green */}
      <footer style={{ backgroundColor: "#1E3932" }} className="py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <p
            style={{
              color: "#ffffff",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              fontSize: "16px",
            }}
          >
            Woonghee
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.70)",
              fontSize: "14px",
              letterSpacing: "-0.01em",
            }}
          >
            © 2025 Woonghee. UX Designer.
          </p>
        </div>
      </footer>
    </div>
  );
}
