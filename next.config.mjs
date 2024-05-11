/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "api.qrserver.com",
      },
    ],
  },
};

export default nextConfig;
