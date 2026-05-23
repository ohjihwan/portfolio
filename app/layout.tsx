import type { Metadata } from "next";
import "./globals.scss";
import React from "react";

/**
 * 8년차 개발자의 포트폴리오 레이아웃
 * - 시맨틱 마크업 준수 (header, main, footer)
 * - Skip Navigation 적용 (A11y)
 * - Noir 테마 및 성능 최적화 기반
 */

export const metadata: Metadata = {
	title: "2027 Portfolio | UI/UX Engineer",
	description: "8년차 마크업 내공과 성능 최적화가 집약된 기술 중심 포트폴리오",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// 클라이언트 사이드에서만 실행되는 접근성 테스트 (axe-core)
	React.useEffect(() => {
		if (process.env.NODE_ENV !== "production") {
			const ReactDOM = require("react-dom");
			const axe = require("@axe-core/react");
			axe(React, ReactDOM, 1000);
		}
	}, []);

	return (
		<html lang="ko">
			<body className="min-h-screen flex flex-col">
				<a
					href="#main"
					className="sr-only focus:not-sr-only focus:fixed focus:top-5 focus:left-5 z-[100] bg-white text-black px-5 py-3 rounded-lg font-bold shadow-2xl"
				>
					본문 바로가기
				</a>
				<header role="banner" className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
					<nav className="max-w-7xl mx-auto h-20 px-8 flex justify-between items-center">
						<span className="font-bold tracking-tighter">JIHOON.DEV</span>
					</nav>
				</header>
				<main id="main" className="flex-grow focus:outline-none" tabIndex={-1} role="main">
					{children}
				</main>
				<footer role="contentinfo" className="border-t border-border py-16 px-8 text-center text-muted text-sm">
					<p>© 2027 Built with Next.js & Technical Craftsmanship</p>
				</footer>
			</body>
		</html>
	);
}