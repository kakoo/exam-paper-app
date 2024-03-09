/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: 'https://coding-challenge-web.vercel.app/:path*',
        },
      ];
    },
  };

export default nextConfig;
