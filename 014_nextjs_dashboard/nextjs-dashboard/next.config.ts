import type { NextConfig } from 'next';
// 部分预览模式 incremental 允许为特定值采取PPR
const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    ppr:'incremental', 
  }
};

export default nextConfig;
