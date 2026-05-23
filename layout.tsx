import type { Metadata } from "next";
import "./globals.scss";
import React from "react";

// axe-core 통합 (개발 모드에서만 실행)
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
	const ReactDOM = require("react-dom");
	const axe = require("@axe-core/react");
	axe(React, ReactDOM, 1000);
}

export const metadata: Metadata = {
	title: "2027 포트폴리오 | 프론트엔드 개발자 OOO",
	description: "8년차 마크업 내공과 성능 최적화가 집약된 포트폴리오입니다.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body className="min-h-screen flex flex-col">
				<a
					href="#main"
					className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-foreground text-background px-4 py-2 rounded-md font-bold"
				>
					본문 바로가기
				</a>
				<header className="border-b border-border py-6 px-8">
					<nav className="max-w-7xl mx-auto flex justify-between items-center">
						<span className="font-bold tracking-tighter">JIHOON.DEV</span>
					</nav>
				</header>
				<main id="main" className="flex-grow focus:outline-none" tabIndex={-1}>
					{children}
				</main>
				<footer className="border-t border-border py-12 px-8 text-center text-muted text-sm">
					<p>© 2027 Built with Next.js & Technical Craftsmanship</p>
				</footer>
			</body>
		</html>
	);
}