import type { NextConfig } from 'next';
import { s3Url } from '@/lib/utils';
console.log(s3Url());
const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: s3Url().hostname,
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
