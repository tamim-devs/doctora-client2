/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [
    "@better-auth/kysely-adapter",
    "kysely",
    "better-auth",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;