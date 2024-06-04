/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "source.unsplash.com",
            "cdn.sanity.io",
            "summerschool.fashional.pro",
        ],
    },
    experimental: { esmExternals: true },
};
export default nextConfig;
