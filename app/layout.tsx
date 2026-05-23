import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../out/globals.css";
// 💡 src가 없으므로 현재 위치 기준으로 경로를 불러옵니다.
import Header from "../components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Design-Driven Frontend Developer | Portfolio",
  description: "디자인과 개발의 경계를 허무는 8년 차 프론트엔드 개발자의 포트폴리오입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#09090b] text-[#f4f4f5]`}
      >
        {/* 상단 헤더 배치 */}
        <Header />
        {children}
      </body>
    </html>
  );
}