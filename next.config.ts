import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['static-00.iconduck.com'],
  },
  eslint:{
    ignoreDuringBuilds:true
  }
};

export default nextConfig;
