/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.infrastructureLogging = {
      level: 'warn',
    }

    return config;
  },
};
export default nextConfig;
