import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 💡 GitHub Pages 배포를 위해 정적 HTML 내보내기 설정 추가
  output: "export",
  // 이미지 최적화 기능을 GitHub Pages용 정적 컴파일에 맞게 비활성화
  images: {
    unoptimized: true,
  },
};

export default nextConfig;