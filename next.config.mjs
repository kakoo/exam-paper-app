/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
      config.resolve.alias.canvas = false;
      config.module.rules.push({
        test: /\.(bin|node)$/,
        loader: 'file-loader',
        options: {
        publicPath: '/_next/static/runtime/',
        outputPath: 'static/runtime/',
        name: '[name].[hash].[ext]',
        },
      });
  
      return config;
    },
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
