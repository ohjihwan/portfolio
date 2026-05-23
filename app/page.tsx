/**
 * 메인 페이지: Technical Craftsman 컨셉
 * - 마크업 전문가로서의 정체성 강조
 * - Lighthouse 지표 및 접근성 표준 시각화
 */

export default function Home() {
	return (
		<div className="max-w-7xl mx-auto px-8 py-24 lg:py-40">
			<section className="space-y-10" aria-labelledby="hero-heading">
				<div className="flex items-center gap-3" role="list">
					<span className="tech-badge">UI/UX Engineer</span>
					<span className="tech-badge">8+ Years Experience</span>
				</div>

				<h1 id="hero-heading" className="hero-title select-none">
					<span className="block">Crafting Digital</span>
					<span className="gradient-text" aria-label="정밀함과 성능을 구축합니다">
						Precisions & Performance.
					</span>
				</h1>

				<p className="max-w-3xl text-xl lg:text-2xl text-muted leading-relaxed font-light">
					8년 4개월의 마크업 내공을 바탕으로, <br className="hidden md:block" />
					단순한 UI 구현을 넘어 <strong className="text-foreground font-medium underline decoration-border/50 underline-offset-4">웹 접근성 표준</strong>과 
					<strong className="text-foreground font-medium text-nowrap"> 고도의 성능 최적화</strong>가 집약된 모던 프론트엔드 설계를 지향합니다.
				</p>

				<div className="pt-10 flex flex-wrap gap-x-8 gap-y-4 items-center border-l border-border/50 pl-8 text-sm font-mono text-muted/80" aria-label="기술적 성능 지표">
					<span className="flex items-center gap-2">
						<i className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" /> Lighthouse 100/100
					</span>
					<span className="flex items-center gap-2">
						<i className="w-1.5 h-1.5 rounded-full bg-blue-500" aria-hidden="true" /> WCAG 2.1 AA Compliant
					</span>
					<span className="flex items-center gap-2">
						<i className="w-1.5 h-1.5 rounded-full bg-purple-500" aria-hidden="true" /> Next.js 15 App Router
					</span>
				</div>
			</section>
		</div>
	);
}