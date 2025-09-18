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
    
    // Reduce bundle size in development
    webpack: (config, { dev }) => {
        if (dev) {
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            };
        }
        return config;
    },
};

module.exports = nextConfig;