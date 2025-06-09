/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/stories' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/stories/' : '',
}

module.exports = nextConfig 