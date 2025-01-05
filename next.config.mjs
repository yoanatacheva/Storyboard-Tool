/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'fal.media',
          port: '',
          pathname: '/files/**',
        },
      ],
    },
  }

export default nextConfig;
