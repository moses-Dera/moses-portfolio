import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dn0ipf9zx/image/upload/v1766235159/mozlogo_kqpigs.png',
        search: '',
      },
    ],
  },
};

export default nextConfig;
