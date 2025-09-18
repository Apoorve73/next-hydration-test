/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: false,

    pageExtensions: ["page.tsx", "page.ts", "tsx", "ts"],

    eslint: {
        ignoreDuringBuilds: true,
    },

    // Note: swcMinify is default in Next.js 15, no need to specify
};

module.exports = nextConfig;