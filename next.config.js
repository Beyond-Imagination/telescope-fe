/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        unoptimized: true,
    },
    reactStrictMode: true,
    swcMinify: true,
    webpack: config => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })

        return config
    },
    exportPathMap: async function (defaultPathMap) {
        return { '/': { page: '/' } }
    },
}

module.exports = nextConfig
