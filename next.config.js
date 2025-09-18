/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,

    pageExtensions: ["page.tsx", "page.ts", "tsx", "ts"],

    eslint: {
        ignoreDuringBuilds: true,
    },

    // Optimize for development performance
    swcMinify: true,
    
    // Let Next.js handle chunking - custom webpack config was creating massive vendors.js
};

module.exports = nextConfig;