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
    async rewrites() {
        return [
            {
                source: "/danh-sach-khoa-hoc",
                destination: "/course",
            },
            {
                source: "/khoa-hoc/:id",
                destination: "/course/:id",
            },
            {
                source: "/bai-viet",
                destination: "/blog",
            },
            {
                source: "/bai-viet/:id",
                destination: "/blog/:id",
            },
            // {
            //     source: "/profile/:slug",
            //     destination: "/profile/:slug",
            // },
        ];
    },
    experimental: { esmExternals: true },
};
export default nextConfig;
