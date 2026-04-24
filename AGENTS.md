# AGENTS.md (my-app)

## Module Context

`my-app`은 포트폴리오의 단일 Next.js 애플리케이션이다. App Router·서버/클라이언트 컴포넌트 경계는 Next 공식 패턴을 따르며, UI 레이어는 Tailwind + shadcn/ui를 중심으로 한다. 저장소의 **`next-monorepo`** 는 Turborepo·npm 워크스페이스용 별도 트리이며 규칙·명령은 **`next-monorepo/AGENTS.md`** 를 따른다. 이 폴더에서는 Bun 기준을 유지하고 모노레포와 패키지 매니저를 섞지 않는다.

## Tech Stack & Constraints

- Next.js(App Router), React 19, TypeScript, Tailwind v4, shadcn(ui 레지스트리·`components.json` 기준), Bun.
- **Magic UI**: 진입·강조 섹션용 모션 컴포넌트. 프로젝트에 아직 없으면 공식 가이드에 맞춰 추가하고, 불필요한 전역 래핑은 피한다.
- **GSAP**: 스크롤 트리거·커서 연동 등 고복잡도 타임라인에만 사용. 사용 페이지는 `"use client"` 및 정리(unmount 시 `kill`/`revert`)를 명시적으로 처리한다.
- 경로 별칭: `@/*` → 프로젝트 루트(`components.json`의 aliases 준수).

## Implementation Patterns

- 레이아웃·간격·타이포: **Tailwind 유틸 우선**. 반복되는 패턴만 작은 래퍼나 `cn()`으로 묶는다.
- **폼, 모달/다이얼로그, 셀렉트 등**: shadcn/ui로 구현하고, 원시 `<input>`만으로 복제하지 않는다.
- shadcn 추가: 저장소 루트에서 `bun run shadcn -- add <이름> -y` 또는 이 디렉터리에서 `bunx shadcn@latest add <이름> -y`.
- Magic UI·GSAP가 들어가는 트리는 클라이언트 컴포넌트로 분리하고, 서버 컴포넌트는 데이터·정적 마크업 위주로 유지한다.

## Testing Strategy

- 타입·빌드 검증: `bun run build`
- 정적 분석: `bun run lint`
- E2E/단위 테스트 프레임워크가 도입되면 이 섹션에 명령어와 배치 규칙을 갱신한다.

## Local Golden Rules

### Do's

- 주석·사용자 대면 설명은 **한국어**로 작성한다.
- 애니메이션 선택: 단순 전환·호버는 Tailwind(`transition-*`)로 끝낼 수 있으면 그대로 둔다. **진입 연출**은 Magic UI, **인터랙션·스크롤 기반 고급**은 GSAP로 분리해 책임을 명확히 한다.
- 비밀 값은 `process.env.NEXT_PUBLIC_*` 남용을 피하고, 노출되면 안 되는 값은 서버에서만 읽는다.

### Don'ts

- API 키·시크릿을 컴포넌트·상수·스토리북 목 데이터에 박지 않는다.
- `.env.local`을 커밋하지 않는다. 예시는 `.env.example` 등 비밀 없는 키 이름만 기재한다.
- shadcn 컴포넌트를 “미리 전부 추가”하지 않는다. **필요 시점에** CLI로 추가한다.
