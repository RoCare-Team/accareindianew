/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*.php',   // matches all old PHP URLs
        destination: '/:path*',  // redirects to new URL without .php
        permanent: true,         // 301 redirect
      },
    ];
  },
};

export default nextConfig;
