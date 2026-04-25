export function HomeAbout() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      style={{ backgroundColor: "#1E3932" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* 왼쪽 콘텐츠 */}
          <div className="flex flex-col gap-6">
            <p
              style={{
                color: "rgba(255,255,255,0.70)",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              About
            </p>
            <h2
              id="about-title"
              style={{
                color: "#ffffff",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
              }}
              className="text-4xl font-semibold"
            >
              AI 시대에 발발 떨고 있는 디자이너
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.70)",
                fontSize: "19px",
                letterSpacing: "-0.01em",
                lineHeight: 1.75,
              }}
            >
              사용자 경험을 중심에 두고 제품을 만들어온 13년차 UX 디자이너입니다.
              새로운 기술과 변화하는 환경 속에서도 사람을 위한 디자인을 추구합니다.
            </p>
            <dl className="grid grid-cols-2 gap-6">
              <div>
                <dt
                  style={{
                    color: "rgba(255,255,255,0.70)",
                    fontSize: "14px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                  className="mb-1"
                >
                  경력
                </dt>
                <dd
                  style={{
                    color: "#ffffff",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    fontSize: "24px",
                  }}
                >
                  13년차
                </dd>
              </div>
              <div>
                <dt
                  style={{
                    color: "rgba(255,255,255,0.70)",
                    fontSize: "14px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                  className="mb-1"
                >
                  연락처
                </dt>
                <dd
                  style={{
                    color: "#ffffff",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    fontSize: "18px",
                  }}
                >
                  010-1234-5678
                </dd>
              </div>
            </dl>
            <div className="flex gap-3 pt-2">
              <a
                href="#works"
                className="inline-flex items-center transition-all active:scale-95"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#00754A",
                  border: "1px solid #ffffff",
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
              <a
                href="#contact"
                className="inline-flex items-center transition-all active:scale-95"
                style={{
                  backgroundColor: "transparent",
                  color: "#ffffff",
                  border: "1px solid #ffffff",
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
            </div>
          </div>

          {/* 오른쪽 — 장식용 스탯 카드 */}
          <div className="flex flex-col gap-4">
            {[
              { label: "완료 프로젝트", value: "50+", desc: "다양한 산업군의 UX 프로젝트" },
              { label: "협업 기업", value: "30+", desc: "스타트업부터 엔터프라이즈까지" },
              { label: "디자인 시스템", value: "10+", desc: "제품 팀과 함께 구축한 시스템" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <p
                  style={{
                    color: "rgba(255,255,255,0.70)",
                    fontSize: "14px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  {stat.label}
                </p>
                <p
                  style={{
                    color: "#ffffff",
                    fontSize: "36px",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.58)",
                    fontSize: "14px",
                    letterSpacing: "-0.01em",
                    marginTop: "4px",
                  }}
                >
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
