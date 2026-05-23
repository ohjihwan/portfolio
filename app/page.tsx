export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] text-[#f4f4f5] px-6 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-2xl text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400">
          <span>Crafting Digital Experiences</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500 leading-tight">
          디자인과 다이렉트 코딩의 <br className="hidden sm:block" />
          경계를 허무는 프론트엔드 개발자
        </h1>

        <p className="text-lg sm:text-xl text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
          8년 넘게 픽셀 단위로 축적해 온 탄탄한 UI/UX 감각 위에, <br className="hidden sm:block" />
          Next.js와 TypeScript의 견고한 성능 최적화를 더합니다.
        </p>

        <div className="pt-4">
          <button className="group relative inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/5">
            프로젝트 보러가기
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

      </div>
    </main>
  );
}