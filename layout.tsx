import type { Metadata } from "next";
import "./globals.scss";

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
				<a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-black text-white p-4">
					본문 바로가기
				</a>
				<main id="main" className="flex-grow">
					{children}
				</main>
			</body>
		</html>
	);
}