/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'custom',
        loaderFile: './public/images/loader.ts',
    },
}

module.exports = nextConfig
