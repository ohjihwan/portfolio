import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // 💡 중요: 내 깃허브 저장소(Repository) 이름을 베이스 경로로 지정합니다.
  // 주소가 https://ohjihwan.github.io/portfolio 라면 '/portfolio' 라고 적어줍니다.
  basePath: "/portfolio",
};

export default nextConfig;