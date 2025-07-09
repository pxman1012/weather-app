/** @type {import('next').NextConfig} */

import { redirects, rewrites } from './routes.config.js';

const nextConfig = {
    async rewrites() {
        return rewrites;
    },
    async redirects() {
        return redirects;
    },
};

export default nextConfig;
