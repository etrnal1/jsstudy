import type { NextConfig } from 'next';
// 部分预览模式 incremental 允许为特定值采取PPR
const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    ppr:false, 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 这将使构建过程忽略类型错误
    ignoreBuildErrors: true,
  },
  
};

export default nextConfig;
