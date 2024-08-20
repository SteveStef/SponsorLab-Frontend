/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // hmm
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }
};

export default nextConfig;
