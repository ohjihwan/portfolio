export default function Home() {
	return (
		<div className="max-w-7xl mx-auto px-8 py-24 md:py-40">
			<section className="space-y-10">
				<header className="flex items-center gap-3">
					<span className="tech-badge">UI/UX Engineer</span>
					<span className="tech-badge">8+ Years Experience</span>
				</header>

				<h1 className="hero-title select-none">
					<span className="block">Crafting Digital</span>
					<span className="gradient-text">Precisions & Performance.</span>
				</h1>

				<p className="max-w-3xl text-xl md:text-2xl text-muted leading-relaxed font-light">
					8년 4개월의 마크업 내공을 바탕으로, <br className="hidden md:block" />
					단순한 UI 구현을 넘어 <strong className="text-foreground font-medium">웹 접근성 표준</strong>과 
					<strong className="text-foreground font-medium text-nowrap"> 고도의 성능 최적화</strong>가 집약된 설계를 지향합니다.
				</p>

				<div className="pt-10 flex flex-wrap gap-x-8 gap-y-4 items-center border-l border-border/50 pl-8 text-sm font-mono text-muted/80">
					<span className="flex items-center gap-2"><i className="w-1.5 h-1.5 rounded-full bg-green-500" /> Lighthouse 100/100</span>
					<span className="flex items-center gap-2"><i className="w-1.5 h-1.5 rounded-full bg-blue-500" /> WCAG 2.1 AA Compliant</span>
					<span className="flex items-center gap-2"><i className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Next.js 15 App Router</span>
				</div>
			</section>
		</div>
	);
}