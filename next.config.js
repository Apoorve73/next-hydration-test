/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,

    pageExtensions: ["page.tsx", "page.ts", "tsx", "ts"],

    experimental: {
        esmExternals: "loose",
    },

    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;