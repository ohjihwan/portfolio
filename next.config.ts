import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 💡 정적 HTML로 결과물을 뽑아내겠다는 설정
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;